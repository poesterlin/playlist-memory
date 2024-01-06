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
		color: white;
		background: #171717;
		background-image: linear-gradient(rgba(43, 110, 53, 0.5), rgba(4, 11, 5, 0.5) 85%);
		background-attachment: fixed;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		background-color: #1db954;
		background-image: linear-gradient(to right, rgb(45, 163, 63), rgb(27, 81, 35));
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
