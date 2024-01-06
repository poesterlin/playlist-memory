<script>
	export let data;
</script>

<h2>Playlists</h2>

<div id="playlists">
	{#each data.playlists as playlist}
		<a href="/playlists/{playlist.id}" style:background-image={`url(${playlist.images?.at(0)?.url ?? "/playlist.png"})`}>
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

</style>
