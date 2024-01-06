import { env } from "$env/dynamic/private";
import { fetchPlaylist } from "$lib/spotify";
import { redirect, type RequestHandler } from "@sveltejs/kit";

type Track = { url: string, title: string };

export const GET: RequestHandler = async ({ cookies, url }) => {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
        redirect(302, "/");
    }

    const playlistId = url.searchParams.get("playlistId");
    if (!playlistId) {
        redirect(302, "/playlists");
    }

    const flipX = url.searchParams.get("flipX") === "true";
    const flipY = url.searchParams.get("flipY") === "true";

    const playlist = await fetchPlaylist(accessToken, playlistId);
    const tracks: Track[] = [];

    for (const { track } of playlist.tracks.items) {
        const data = {
            url: track.external_urls.spotify,
            title: track.name,
        } satisfies Track;

        tracks.push(data);
    }

    const stream = await createPDF(tracks, flipX, flipY);
    return new Response(stream, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=spotify-qr.pdf",
        },
    });
};

async function createPDF(tracks: Track[], flipX: boolean, flipY: boolean) {
    const response = await fetch(env.PDF_BACKEND ?? "http://pdf-generator:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tracks, flipX, flipY }),
    })

    return response.body;
}