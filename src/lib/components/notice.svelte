<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children, type }: { chidren: Snippet; type: 'info' | 'warning' } = $props();
</script>

<div class="notice {type}">{@render children()}</div>

<style>
	.notice {
		--_base: var(--base, khaki);
		--_accent: var(--accent, darkkhaki);

		display: flex;
		background-color: var(--_base);
		margin-bottom: 3em;
		padding: 1em;
		border-left: var(--_accent) solid 6px;

		&::selection {
			background-color: var(--_accent);
		}

		&::before {
			flex: 24px 0 0;
			content: "i";
			display: block;
			width: 24px;
			height: 24px;
			border-radius: 50%;
			text-align: center;
			margin-right: 1em;
			background-color: var(--_accent);
			font-weight: 600;
			font-size: 1.2em;
			line-height: 23px;
			color: var(--_base);
		}
	}

	.notice.info {
		--base: lightsteelblue;
		--accent: dodgerblue;
	}
</style>
