<script>
	export let data;
</script>

<object
	data="/generate/pdf?playlistId={data.playlistId}"
	title="pdf"
	type="application/pdf"
>
	<iframe
		src="/generate/pdf?playlistId={data.playlistId}"
		title="pdf"
		frameborder="0"
	>
		<p>This browser does not support PDF!</p>
	</iframe>
</object>

<style>
    object {
        width: 100%;
        height: 80dvh;
    }
    iframe {
        width: 100%;
        height: 100%;
    }
</style>