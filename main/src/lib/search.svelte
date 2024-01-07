<script>
	import { enhance } from '$app/forms';
</script>

<form action="/playlists?/fromShare" method="post" use:enhance>
	<input
		type="text"
		placeholder="Link to playlist, ex: https://open.spotify.com/playlist/12345678"
		id="shareString"
		name="shareString"
	/>
	<button type="submit">Open</button>
</form>

<style>
	form {
		display: flex;
		padding: 1rem 0;
		gap: 5px;
		overflow: clip;
		max-width: min(100%, 600px);
		margin: 0 auto 1rem;
	}

	input {
		flex: 1;
		padding: 0.5rem;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		border: 0;
	}

	input:focus {
		outline: 1px solid #1db954;
	}

	button {
		padding: 1rem 2rem;
		background: #1db954;
		border: none;
		color: white;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		font-weight: bold;
		letter-spacing: 1px;
	}
</style>
