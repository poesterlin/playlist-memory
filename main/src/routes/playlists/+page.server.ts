import { fetchPlaylists } from "$lib/spotify";
import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ cookies, url }) => {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
        return { playlists: [], offset: 0, hasMore: false };
    }

    let offset = 0;

    const urlOffset = url.searchParams.get("offset");
    if (urlOffset) {
        offset = parseInt(urlOffset);

        if (isNaN(offset)) {
            return error(400, "Invalid offset");
        }
    }

    const { playlists, hasMore } = await fetchPlaylists(accessToken, offset, 20);

    return { playlists, offset, hasMore };
};

export const actions: Actions = {
    fromShare: async ({ request }) => {
        const data = await request.formData();

        if (!data.has("shareString")) {
            return;
        }

        const shareString = data.get("shareString") as string;

        if (!shareString.startsWith("https://open.spotify.com/playlist/")) {
            return;
        }

        const url = new URL(shareString);
        const playlistId = url.pathname.split("/")[2];

        redirect(302, `/playlists/${playlistId}`);
    }
};