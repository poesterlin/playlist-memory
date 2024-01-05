import { createPDF, type Track } from "$lib/pdf";
import { fetchPlaylist } from "$lib/spotify";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies, url }) => {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
        redirect(302, "/");
    }

    const playlistId = url.searchParams.get("playlistId");
    if (!playlistId) {
        redirect(302, "/playlists");
    }

    const playlist = await fetchPlaylist(accessToken, playlistId);
    const tracks: Track[] = [];

    for (const { track } of playlist.tracks.items) {
        const data = {
            url: track.external_urls.spotify,
            title: track.name,
        } satisfies Track;

        tracks.push(data, data, data, data);
        tracks.push(data, data, data, data);
        tracks.push(data, data, data);
    }

    const stream = await createPDF(tracks);
    return new Response(stream, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=spotify-qr.pdf",
        },
    });
};