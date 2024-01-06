import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";
import crypto from "node:crypto";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    if (cookies.get("accessToken")) {
        return redirect(302, "/playlists");
    }

    const verifier = generateCodeVerifier(128);

    // Set the cookie to expire in 60 seconds
    const expires = new Date(Date.now() + 120 * 1000);
    cookies.set("verifier", verifier, { path: "/", expires });

    const url = await redirectToAuthCodeFlow(verifier);
    return redirect(302, url);
};

async function redirectToAuthCodeFlow(verifier: string) {
    const challenge = await generateCodeChallenge(verifier);

    const params = new URLSearchParams();
    params.append("client_id", env.CLIENT_ID);
    params.append("response_type", "code");
    params.append("redirect_uri", env.REDIRECT_URI);
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const dig = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(dig)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

