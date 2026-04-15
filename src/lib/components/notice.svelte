<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children, type }: { children: Snippet; type?: 'info' | 'warn' | 'danger' } = $props();
</script>

<div class={`${type} notice`}>{@render children()}</div>

<style>
	div {
		--_accent: var(--accent, darkgreen);
		--_svg: var(
			--icon,
			url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M19.52 2.49C17.18.15 12.9.62 9.97 3.55c-1.6 1.6-2.52 3.87-2.54 5.46c-.02 1.58.26 3.89-1.35 5.5l-4.24 4.24l1.42 1.42l4.24-4.24c1.61-1.61 3.92-1.33 5.5-1.35s3.86-.94 5.46-2.54c2.92-2.93 3.4-7.21 1.06-9.55m-9.2 9.19c-1.53-1.53-1.05-4.61 1.06-6.72s5.18-2.59 6.72-1.06c1.53 1.53 1.05 4.61-1.06 6.72s-5.18 2.59-6.72 1.06M18 17c.53 0 1.04.21 1.41.59c.78.78.78 2.05 0 2.83c-.37.37-.88.58-1.41.58s-1.04-.21-1.41-.59c-.78-.78-.78-2.05 0-2.83c.37-.37.88-.58 1.41-.58m0-2a3.998 3.998 0 0 0-2.83 6.83c.78.78 1.81 1.17 2.83 1.17a3.998 3.998 0 0 0 2.83-6.83A4 4 0 0 0 18 15'/%3E%3C/svg%3E")
		);

		display: flex;
		background-color: oklch(from currentColor l c h / 0.2);
		margin-bottom: 3em;
		padding: 1em;
		border-left: var(--_accent) solid 6px;
		color: var(--_accent);

		&::selection {
			background-color: var(--_accent);
			color: whitesmoke;
		}

		&::before {
			content: "";
			margin-right: 1em;
			flex-shrink: 0;
			display: inline-block;
			width: 24px;
			height: 24px;
			--svg: var(--_svg);
			background-color: currentColor;
			-webkit-mask-image: var(--svg);
			mask-image: var(--svg);
			-webkit-mask-repeat: no-repeat;
			mask-repeat: no-repeat;
			-webkit-mask-size: 100% 100%;
			mask-size: 100% 100%;
		}

		&.info {
			/*--accent: steelblue;
			--accent: midnightblue;*/
			--accent: darkslateblue;
			--icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8'/%3E%3C/svg%3E");
		}

		&.danger {
			--accent: brown;
			--icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1zm-4.17-7.14L12 10.59L9.17 7.76L7.76 9.17L10.59 12l-2.83 2.83l1.41 1.41L12 13.41l2.83 2.83l1.41-1.41L13.41 12l2.83-2.83z'/%3E%3C/svg%3E");
		}

		&.warn {
			--accent: darkgoldenrod;
			--icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z'/%3E%3C/svg%3E");
		}
	}
</style>
