<script>
	export let data;
	const track = data.track;
</script>

<h2>{track.name}</h2>

<div id="tracks">
	<div class="track">
		{#if track.album.images && track.album.images.length > 0}
			<img src={track.album.images[0].url} alt={track.name} />
		{/if}
        {#if track.preview_url}
            <audio controls>
                <source src={track.preview_url} type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        {/if}
	</div>
</div>

<style>
    #tracks {
        display: flex;
        flex-direction: column;
    }
    img {
        width: 100px;
        height: 100px;
    }
</style>