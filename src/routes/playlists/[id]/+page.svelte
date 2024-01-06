<script>
	export let data;
</script>

<div id="controls">
	<a href="/generate?playlistId={data.playlist.id}" id="generate">
		<img src="/download.svg" alt="download icon" />
		<span>Generate Printable PDF</span>
	</a>
</div>

<div id="tracks">
	<h2>{data.playlist.name}</h2>
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
	#controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	#tracks {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 10dvh min(5%, 200px);
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
		padding: 1rem 2rem;
		box-shadow: 0 0 15px #00000055;
		cursor: pointer;
		color: #fff;
		font-size: 1.5rem;
		font-weight: bold;
		width: min(500px, 80vw);
		margin: 1rem auto;
		background-image: linear-gradient(to right, rgb(45, 163, 63), rgb(27, 81, 35) 90%);
		border-radius: 4px;
		transition: background-color 0.5s ease-in-out;
		box-sizing: border-box;
	}

	#generate:active {
		transform: scale(0.95);
	}

	span {
		flex: 1 1 100%;
		display: block;
		text-align: center;
	}
	#generate:hover {
		background-color: #1db954;
	}

	#generate img {
		width: 3rem;
		height: 3rem;
	}
</style>
