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

<!-- <style>
	:global {
		p {
			a {
				&[href] {
					background-color: orangered;
				}
			}
		}
	}
</style> -->