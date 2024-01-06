<script lang="ts">
	export let data;

	let flipX = false;
	let flipY = false;

	let loading = true;

	$: flipX,
		flipY,
		() => {
			loading = true;
		};
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

<div class:loading>
	<iframe
		src="/generate/pdf?playlistId={data.playlistId}&flipX={flipX}&flipY={flipY}"
		title="pdf"
		frameborder="0"
		on:load={() => (loading = false)}
	>
		<p>This browser does not support PDF!</p>
	</iframe>
</div>

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

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80dvh;
		position: relative;
		background: rgba(0, 0, 0, 0.203);
	}

	.loading iframe {
		display: none;
	}

	/* loading spinner */
	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}

	.loading::after {
		content: '';
		position: absolute;
		inset: 0;
		width: 1rem;
		height: 1rem;
		margin: auto;
		border-radius: 50%;
		border: 0.2rem solid white;
		border-color: white transparent white transparent;
		animation: spinner 1s linear infinite;
	}
</style>
