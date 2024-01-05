<script>
	export let data;
</script>

<h2>{data.playlist.name}</h2>

<a href="/generate?playlistId={data.playlist.id}">Generate Memory PDF</a>

<div id="tracks">
	{#each data.playlist.tracks.items as item}
		{@const track = item.track}
		<a href="/tracks/{track.id}">
			<div class="track">
				{#if track.album.images && track.album.images.length > 0}
					<img src={track.album.images[0].url} alt={track.name} />
				{/if}
				<h3>{track.name}</h3>
			</div>
		</a>
	{/each}
</div>

<style>
	#tracks {
		display: grid;
		grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}
	img {
		width: 100px;
		height: 100px;
	}
	.track {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
</style>
