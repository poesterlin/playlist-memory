<script>
	import { enhance } from '$app/forms';

	export let data;
</script>

<h2>Playlists</h2>

<form action="?/fromShare" method="post" use:enhance>
	<input type="text" placeholder="Link to playlist, ex: https://open.spotify.com/playlist/12345678" id="shareString" name="shareString" />
	<button type="submit">Open</button>
</form>

<div id="playlists">
	{#each data.playlists as playlist}
		<a
			href="/playlists/{playlist.id}"
			style:background-image={`url(${playlist.images?.at(0)?.url ?? '/playlist.png'})`}
		>
			<h3>{playlist.name} ({playlist.tracks.total})</h3>
		</a>
	{:else}
		<p>No playlists found 🤕</p>
	{/each}
</div>

{#if data.hasMore}
	<a href="/playlists?offset={data.offset + data.playlists.length}">Select Playlist</a>
{/if}

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

	#playlists {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1rem;
	}

	#playlists a {
		display: grid;
		grid-template-rows: 1fr auto;
		border: 1px solid gray;
		border-radius: 5px;
		height: 300px;
		background-size: cover;
		background-position: center;
	}

	h3 {
		margin: 0;
		padding: 1rem;
		backdrop-filter: blur(5px);
		background: rgba(0, 0, 0, 0.5);
		grid-row: 2/3;
	}

	h2 {
		margin: 0;
	}
</style>
