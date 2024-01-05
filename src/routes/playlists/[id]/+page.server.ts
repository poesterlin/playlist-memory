import { error } from "console";
import type { PageServerLoad } from "../$types";
import { fetchPlaylist } from "$lib/spotify";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, cookies }) => {
    if (!params.id) {
        error(400, "Invalid playlist id");
    }

    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
        redirect(302, "/");
    }

    const playlist = await fetchPlaylist(accessToken, params.id);
    return { playlist };
};