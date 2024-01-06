<script>
	export let data;

	let flipX = false;
	let flipY = true;
</script>

<form>
	<p>Printer flips double sided print?</p>
	<label>
		<input type="checkbox" bind:checked={flipX} />
		Page is flipped the long way
	</label>
	<label>
		<input type="checkbox" bind:checked={flipY} />
		Page is flipped the short way
	</label>
</form>

<iframe
	src="/generate/pdf?playlistId={data.playlistId}&flipX={flipX}&flipY={flipY}"
	title="pdf"
	frameborder="0"
>
	<p>This browser does not support PDF!</p>
</iframe>

<style>
	iframe {
		width: 100%;
		height: 80dvh;
	}
</style>
