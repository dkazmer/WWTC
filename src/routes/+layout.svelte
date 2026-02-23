<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/assets/global.scss';
	import Nav from '$lib/components/nav.svelte';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	let { children } = $props();
</script>
<svelte:head>
	<link rel="icon" href={favicon}>
	<title>WWTC</title>
</svelte:head>

<Nav />
<Header />
<main><div>{@render children()}</div></main>
<Footer />

<style>
	main {
		flex-grow: 1;
		line-height: 2.4rem;
		box-shadow: 0 2px 6px 0 black;
		z-index: 1;
		:global {
			a:link {
				color: var(--secondary-light);
				text-decoration: none;
				text-shadow: 0 0 2px #7473;
				border-bottom: transparent solid 1px;
				&:is(:hover, :focus) {
					border-bottom: #747c solid 1px;
				}
				&:visited {
					color: var(--secondary) !important;
				}
			}
			sup,
			sub {
				line-height: 0;
			}
		}
	}
</style>
