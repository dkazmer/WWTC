<script lang="ts">
	import '$lib/assets/global.scss';

	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import Nav from '$lib/components/nav.svelte';
	import Notice from '$lib/components/notice.svelte';

	let { children } = $props();
	let noticeAllowedPages = $state(false);

	onMount(noticeChecker);
	afterNavigate(noticeChecker);

	function noticeChecker() {
		const { pathname } = page.url;
		noticeAllowedPages = pathname === '/' || pathname === '/membership' || pathname === ('/schedule' as string);
	}

	const notice: string = `We are currently in discussions with the City regarding our opening date. They are aiming to have the courts ready by
		the last week of April. The final court surface work will be completed once the weather is consistently warm, likely
		sometime in June. We’re excited to have the courts revitalized for the upcoming season.`;
</script>

<svelte:head>
	<link rel="icon" href={favicon}>
	<title>WWTC</title>
</svelte:head>

<Nav />
<Header />
<main>
	<div>
		{#if notice && noticeAllowedPages}
			<Notice>{notice}</Notice>
		{/if}
		{@render children()}
	</div>
</main>
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
