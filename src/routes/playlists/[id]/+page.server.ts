import { error } from "console";
import type { PageServerLoad } from "./$types";
import { fetchPlaylist } from "$lib/spotify";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, cookies }) => {
    const id = params.id;
    if (!id) {
        error(400, "Invalid playlist id");
    }

    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
        redirect(302, "/");
    }

    const playlist = await fetchPlaylist(accessToken, id);
    return { playlist };
};