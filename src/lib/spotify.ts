
import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";

export async function getAccessToken(code: string, verifier: string) {
    const params = new URLSearchParams();
    params.append("client_id", env.CLIENT_ID);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", env.REDIRECT_URI);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

export async function fetchProfile(token: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
        error(result.status as 400, await result.text());
    }

    return await result.json();
}

export interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

export interface Image {
    url: string;
    height: number;
    width: number;
}

export async function fetchPlaylists(token: string, offset: number, limit: number) {
    const result = await fetch(`https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=${limit}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
        error(result.status as 400, await result.text());
    }

    const json = await result.json();
    return { playlists: json.items as Playlist[], hasMore: json.next !== null };
}

export interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: { spotify: string; };
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: { display_name: string; };
    primary_color: string;
    public: boolean;
    snapshot_id: string;
    tracks: { href: string; total: number; items: Track[]; };
    type: string;
    uri: string;
}

export interface Track {
    added_at: string;
    added_by: { external_urls: { spotify: string; }; href: string; id: string; type: string; uri: string; };
    is_local: boolean;
    primary_color: string;
    track: {
        album: { album_type: string; artists: Artist[]; available_markets: string[]; external_urls: { spotify: string; }; href: string; id: string; images: Image[]; name: string; release_date: string; release_date_precision: string; total_tracks: number; type: string; uri: string; };
        artists: Artist[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        episode: boolean;
        explicit: boolean;
        external_ids: { isrc: string; };
        external_urls: { spotify: string; };
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: string;
        track: boolean;
        track_number: number;
        type: string;
        uri: string;
    };
    video_thumbnail: { url: string; };
}

export interface Artist {
    external_urls: { spotify: string; };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export async function fetchPlaylist(token: string, id: string) {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
        error(result.status as 400, await result.text());
    }

    const json = await result.json();
    return json as Playlist;
}


export async function getTrackById(token: string, id: string) {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
        error(result.status as 400, await result.text());
    }

    const json = await result.json();
    return json as Track["track"];
}

