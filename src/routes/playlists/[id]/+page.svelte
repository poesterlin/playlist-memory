<script>
	export let data;
</script>

<h2>{data.playlist.name}</h2>
<a href="/generate?playlistId={data.playlist.id}" id="generate">
	<img src="/download.svg" alt="download icon" />
	Generate Printable PDF
</a>

<div id="tracks">
	<h3>Tracks</h3>
	{#each data.playlist.tracks.items as item}
		{@const track = item.track}
		<a href="/tracks/{track.id}">
			<div class="track">
				{#if track.album.images && track.album.images.length > 0}
					<img class="album" src={track.album.images[0].url} alt={track.name} />
				{/if}
				<h4>{track.name}</h4>
			</div>
		</a>
	{:else}
		<p>Playlist has no tracks 🤕</p>
	{/each}
</div>

<style>
	#tracks {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 0 30%;
	}
	h2 {
		text-align: center;
	}
	h3 {
		background: #3535358e;
		padding: 1rem;
		text-align: center;
	}
	img.album {
		width: 100px;
		height: 100px;
	}
	.track {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		cursor: pointer;
	}
	.track:hover {
		background: #3535356e;
	}

	#generate {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 5%;
		padding: 0.5rem 1rem;
		background-color: #1db95492;
		cursor: pointer;
		color: #fff;
		margin-bottom: 2rem;
		font-size: 1.5rem;
		font-weight: bold;
		width: 40%;
		margin: 1rem auto;
	}

	#generate:hover {
		background-color: #1db954;
	}

	#generate img {
		width: 3rem;
		height: 3rem;
	}
</style>
