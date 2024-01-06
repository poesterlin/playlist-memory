import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
    if (cookies.get("accessToken")) {
        return {
            isLoggedIn: true
        }
    }

    return {
        isLoggedIn: false
    }
};