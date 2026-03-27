<script lang="ts">
	let value = $state('');
	const { form } = $props();
</script>

<section id="form">
	<form method="POST" class={form?.incorrect && !value.length ? 'error' : null}>
		<!-- svelte-ignore a11y_autofocus -->
		<!-- biome-ignore format: compact -->
		<!-- biome-ignore lint/a11y/noAutofocus: allow autofocus -->
		<input type="password" name="pass" id="pass" placeholder="Password" aria-label="Password" required autofocus
				minlength="6" bind:value={value}><br>
		<div>wrong password</div>
	</form>
</section>

<style>
	:global(div:has(> .wrapper)) {
		display: flex;
		max-width: unset;
	}

	input {
		font-family: inherit;
		font-weight: 500;
		font-size: 1.6rem;
		padding: 8px 16px;
		margin: 0 4px 8px 0;
		border: none;
		user-select: none;
		min-width: 219px;
	}

	section#form {
		margin: 5em auto;
		text-align: center;

		form {
			text-align: left;
			display: inline-block;

			&:has(input:valid)::after {
				content: "Press ENTER ...";
				font-size: small;
				display: block;
				color: #666;
			}

			div {
				display: none;
			}

			&.error:has(input:invalid) {
				input {
					box-shadow: 0 0 12px 2px brown;
				}

				div {
					display: block;
					font-size: small;
					color: brown;

					&::before {
						content: "";
						width: 24px;
						height: 24px;
						--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1z'/%3E%3Ccircle cx='12' cy='16' r='1' fill='%23000'/%3E%3Cpath fill='%23000' d='M11 7h2v7h-2z'/%3E%3C/svg%3E");
						background-color: currentColor;
						mask-image: var(--svg);
						mask-repeat: no-repeat;
						mask-size: 100% 100%;
						margin-right: 4px;
						display: inline-block;
						vertical-align: middle;
					}
				}
			}
		}
	}
</style>
