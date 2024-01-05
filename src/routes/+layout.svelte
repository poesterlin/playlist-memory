<script lang="ts">
	export let data;
</script>

<header>
	<a href="/">
		<h1>Playlist Memory</h1>
	</a>
	{#if data.isLoggedIn}
		<nav>
			<a href="/logout">Logout</a>
		</nav>
	{/if}
</header>

<main>
	<slot />
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		background: #282828;
		color: white;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		background-color: #1db954;
		color: white;
	}

	main {
		padding: 1rem;
	}

	:global(a) {
		color: white;
		text-decoration: none;
	}

	nav a {
		color: white;
		text-decoration: none;
	}
</style>
