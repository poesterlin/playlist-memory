<script>
	import Search from '$lib/search.svelte';
</script>

<div id="login-container">
	<Search />

	<p>OR</p>

	<div class="login">
		<h1>Login</h1>
		<a href="/authorize" id="login-button" class="big-btn">Log in with Spotify</a>
		<p class="login-desc">Please login to get access to spotify content.</p>
		<p class="login-desc-small">You will automatically be redirected to this page after login.</p>
	</div>
</div>

<style>
	h1 {
		font-size: 2em;
		margin-bottom: 12px;
		margin-top: 0;
	}

	#login-container {
		height: 100%;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		justify-content: center;
		width: min(100%, 600px);
	}

	#login-container .login {
		background-color: rgba(0, 0, 0, 0.5);
		color: #ffffff;
		text-align: center;
		padding: 70px;
	}

	#login-container .login .big-btn {
		margin: 10px 0 20px 0;
	}

	#login-container .login p {
		margin: 5px 0;
		font-size: 14px;
	}

	.big-btn {
		color: #fff;
		background-color: #7c25f8;
		font-size: 14px;
		line-height: 1;
		border-radius: 500px;
		padding: 18px 48px 16px;
		transition-property: background-color;
		transition-duration: 0.3s;
		border-width: 0;
		letter-spacing: 2px;
		text-transform: uppercase;
		white-space: normal;
		cursor: pointer;
		display: block;
	}

	.big-btn:hover {
		background-color: #6207e3;
	}

	p {
		color: #ffffff;
		font-size: 20px;
		font-weight: bold;
		margin: 20px 0;
		text-align: center;
	}
</style>
