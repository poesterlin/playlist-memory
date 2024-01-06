import { getAccessToken } from "$lib/spotify";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ url, cookies }) => {
    let accessToken = cookies.get("accessToken");
    if (accessToken) {
        redirect(302, "/playlists");
    }

    const code = url.searchParams.get("code");
    if (!code) {
        return redirect(302, "/");
    }

    const verifier = cookies.get("verifier");
    if (!verifier) {
        return redirect(302, "/");
    }

    accessToken = await getAccessToken(code, verifier);

    if (!accessToken) {
        return redirect(302, "/");
    }

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    cookies.set("accessToken", accessToken, { path: "/", expires });
    redirect(302, "/playlists");
};
