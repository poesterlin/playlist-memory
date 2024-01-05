import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    if (cookies.get("accessToken")) {
        return redirect(302, "/playlists");
    }

    return {
        hasToLogin: true
    }
};

