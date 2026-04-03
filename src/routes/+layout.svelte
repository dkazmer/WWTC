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
	let title = $state('');
	let hasRegistered = $state(false);

	onMount(noticeCheckerPlus);
	// afterNavigate(noticeCheckerPlus);

	afterNavigate(() => {
		noticeCheckerPlus();

		const url = new URL(location.href);
		hasRegistered = url.searchParams.has('registered');
	});

	function noticeCheckerPlus() {
		const { pathname } = page.url;
		noticeAllowedPages = pathname === '/' || pathname === '/membership' || pathname === '/schedule';
		title = pathname.split('/').at(-1)!.toUpperCase(); // + title setter
	}

	const notice: string = `We are currently in discussions with the City regarding our opening date. They are aiming to have the courts ready by
		the last week of April. The final court surface work will be completed once the weather is consistently warm, likely
		sometime in June. We’re excited to have the courts revitalized for the upcoming season.`;

	// `The 2024 Club Tournament will be played on <time datetime="2024-09-14" style="font-weight: 600;">September 14/15<sup>th</sup></time>. Check under "PROGRAMS" for details`
</script>

<svelte:head>
	<link rel="icon" href={favicon}>
	<title>WWTC &bull; {title || 'home'}</title>
</svelte:head>

<Nav />
<Header />
<main>
	<div>
		{#if hasRegistered}
			<Notice
				><b>Success!</b>&nbsp; We have received your application. A confirmation email has been sent. (Check your
				junk/spam folder.)</Notice
			>
		{/if}
		{#if notice && noticeAllowedPages}
			<Notice type="info">{notice}</Notice>
		{/if}
		{@render children()}
	</div>
</main>
<Footer />

<style lang="scss">
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
