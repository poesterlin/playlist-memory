import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getTrackById } from "$lib/spotify";

export const load: PageServerLoad = async ({ params, cookies }) => {

    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
        redirect(302, "/");
    }


    const track = await getTrackById(accessToken, params.id)
    return { track };

};