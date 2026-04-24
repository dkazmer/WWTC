<script lang="ts">
	import type { page } from '$app/state';

	const { href, label, type, icon }: Button = $props();

	type Path = typeof page.url.pathname;
	// type Path = typeof ext extends true ? Open<typeof page.url.pathname> : typeof page.url.pathname;
	// type Open<T extends string> = T | (string & {});

	interface Button {
		href?: Path;
		label: string;
		type?: 'button' | 'submit';
		ext?: true;
		icon?: {
			name: string;
			family: string;
		};
	}
</script>

<div class="cta">
	<button type={type || 'button'} role="link" onclick={href ? () => (location.href = href) : null}>
		{#if icon}
			<img
				src="https://material-icons.github.io/material-icons/svg/{icon.name}/{icon.family}.svg"
				alt=""
				aria-hidden="true"
			>
		{/if}
		{label}
	</button>
</div>

<style lang="scss">
	.cta button {
		cursor: pointer;
		color: var(--secondary);
		appearance: none;
		padding: 10px 20px;
		border: none;
		border-radius: 6px;
		box-shadow: 0 1px 2px var(--secondary);
		font-family: inherit;
		font-weight: 600;
		font-size: 1.6rem;
		line-height: 2rem;
		user-select: none;
		text-shadow: 0 1px white;
		background: linear-gradient(0deg, white, RGBA(102, 51, 102, 0.1));

		&:not(:disabled):is(:hover, :focus) {
			/* margin-top: -1px; */
			translate: 0 -1px;
			box-shadow: 0 2px 3px var(--secondary);
			/* background: linear-gradient(0deg, white, RGBA(102, 51, 102, 0.05)); */
		}
		&:not(:disabled):active:is(:hover, :focus) {	/* mouse down state */
			translate: 0 0;
			box-shadow: 0 1px 2px var(--secondary);
		}
		&:disabled {
			filter: grayscale(1);
			cursor: auto;
		}
		
		img {
			filter: var(--secondary-filter);
            margin-block: -7px -4px;
            vertical-align: middle;
		}
	}
</style>
