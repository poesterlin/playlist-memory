
<div id="content">
	<div id="login-container">
		<div class="login">
			<h1>Login</h1>
			<a href="/authorize" id="login-button" class="big-btn">Log in with Spotify</a>
			<p class="login-desc">Please login to get access to spotify content.</p>
			<p class="login-desc-small">You will automatically be redirected to this page after login.</p>
		</div>
	</div>
</div>

<style>
	:global(body) {
		background-color: rgb(46, 103, 54);
		background-image: linear-gradient(rgb(43, 110, 53), rgb(4, 11, 5) 85%);
		background-attachment: fixed;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	h1 {
		font-size: 2em;
		margin-bottom: 12px;
		margin-top: 0;
	}

	#content {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-direction: column;
		flex-direction: column;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		overflow: hidden;
	}

	#login-container {
		display: -ms-flexbox;
		display: flex;
		height: 100%;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-align: center;
		align-items: center;
		margin: 0 auto;
		-ms-flex-pack: center;
		justify-content: center;
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
		min-width: 160px;
		text-transform: uppercase;
		white-space: normal;
		cursor: pointer;
        display: block;
	}

	.big-btn:hover {
		background-color: #6207e3;
	}

</style>
