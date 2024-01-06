import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, url }) => {
    if (cookies.get("accessToken")) {
        redirect(302, "/playlists");
    }

    const code = url.searchParams.get("code");
    if (code) {
        redirect(302, "/callback?code=" + code);
    }

    return {
        hasToLogin: true
    }
};

