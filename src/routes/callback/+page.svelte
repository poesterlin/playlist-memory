<script>
	export let data;
</script>

<h2>Hello {data.profile.display_name}</h2>

<a href="/playlists">Select Playlist</a>

<style>
	h2 {
		margin: 1rem;
	}

	a {
        display: inline-block;
		margin: 2rem 1rem;
		background: #1db954;
        padding: 1rem;
	}
</style>
