import { error } from "console";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ url }) => {
    const playlistId = url.searchParams.get("playlistId");
    if (!playlistId) {
        return error(400, "Invalid playlist id");
    }

    return { playlistId };

};