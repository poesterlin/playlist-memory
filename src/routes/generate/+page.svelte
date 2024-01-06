<script>
	export let data;

	let flipX = false;
	let flipY = false;
</script>

<h2>Printer flips double sided print?</h2>
<form>
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
	form {
		margin: 10px;
		display: flex;
		flex-direction: column;
	}

	iframe {
		width: 100%;
		height: 80dvh;
	}
</style>
