import { fetchPlaylists } from "$lib/spotify";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ cookies, url }) => {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
        return redirect(302, "/");
    }

    let offset = 0;

    const urlOffset = url.searchParams.get("offset");
    if (urlOffset) {
        offset = parseInt(urlOffset);

        if (isNaN(offset)) {
            return error(400, "Invalid offset");
        }
    }

    const {playlists, hasMore} = await fetchPlaylists(accessToken, offset, 20);

    return { playlists, offset, hasMore };
};