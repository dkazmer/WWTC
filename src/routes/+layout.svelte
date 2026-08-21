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
	import { tryCatch } from '$lib/try-catch';

	let { children } = $props();
	let noticeAllowedPages = $state(false);
	let title = $state('');
	let hasRegistered = $state(false);
	let noEmail = $state(false);
	let notices: Record<string, { type: App.Locals['Notice']; text: string; flag: boolean }> = $state({});

	onMount(noticeCheckerPlus);
	// afterNavigate(noticeCheckerPlus);

	afterNavigate(() => {
		noticeCheckerPlus();

		const url = new URL(location.href);
		hasRegistered = url.searchParams.has('registered') && document.cookie.includes('registered');
		noEmail = url.searchParams.has('noemail');
	});

	async function noticeCheckerPlus() {
		const { data, error } = await tryCatch(fetch('/notices.json'));
		if (error) return;

		notices = await data?.json();

		const { pathname } = page.url;
		noticeAllowedPages = pathname === '/' || pathname === '/membership' || pathname === '/schedule';
		title = pathname.split('/').at(-1)!.toUpperCase(); // + title setter
	}

	// `The 2024 Club Tournament will be played on <time datetime="2024-09-14" style="font-weight: 600;">September 14/15<sup>th</sup></time>. Check under "PROGRAMS" for details`
</script>

<svelte:head>
	<link rel="icon" href={favicon}>
	<title>WWTC &bull; {title || 'HOME'}</title>
</svelte:head>

<Nav />
<Header />
<main>
	<div>
		<!-- should transfer the following to `noticeTemplate` -->
		{#if hasRegistered}
			<Notice
				><b>Success!</b>&nbsp; We have received your application.
				{#if noEmail}
					But a confirmation email could not be sent.
				{:else}
					A confirmation email has been sent. (Check your junk/spam folder.)
				{/if}
			</Notice>
		{/if}

		{#if notices.maintenance?.flag}
			{@render noticeTemplate(notices.maintenance)}
		{/if}

		{#if noticeAllowedPages && notices.courtsReady?.flag}
			{@render noticeTemplate(notices.courtsReady)}
		{/if}
		{@render children()}
	</div>
</main>
<Footer />

{#snippet noticeTemplate({text, type}: typeof notices[''])}
	<Notice {type}>{@html text}</Notice>
{/snippet}

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
