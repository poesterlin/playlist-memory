import { authorize, fetchPlaylist } from "$lib/spotify";
import { error } from "console";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const id = params.id;
    if (!id) {
        error(400, "Invalid playlist id");
    }

    const accessToken = await authorize();

    const playlist = await fetchPlaylist(accessToken, id);
    return { playlist };
};