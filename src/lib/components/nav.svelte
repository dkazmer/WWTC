<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let menu: HTMLAnchorElement;
	let subMenu: HTMLDivElement;
	let menuOpen = false;

	const tabs: Tab[] = [
		{
			href: '/',
			name: 'home'
		},
		{
			href: '/membership'
		},
		{
			href: '/schedule'
		},
		{
			href: '/photos'
		},
		{
			href: 'javascript://',
			name: 'programs',
			role: 'menu'
		},
		{
			href: '/executive',
			name: 'exec'
		},
		{
			href: '/newsletter'
		},
		{
			href: '/links'
		}
	];

	const subTabs: Tab[] = [
		{
			href: '/intercounty'
		},
		{
			href: '/stf',
			label: 'Scarborough Tennis Federation'
		},
		{
			href: '/juniors'
		},
		{
			href: '/lessons'
		},
		{
			href: '/tournament',
			name: 'club tournament',
			class: 'new'
		}
	];

	// biome-ignore lint/correctness/noUnusedVariables: is used
	function isPath(path: string) {
		return page.url.pathname === path;
	}

	onMount(() => {
		const submenuItems = Array.from(subMenu.querySelectorAll('a'));

		menuOpen = isSubmenuItemSelected();

		document.addEventListener('click', ({ target }) => {
			if (target === menu || target === subMenu || isSubmenuItemClicked(target!) || isSubmenuItemSelected()) return;
			menuOpen = false;
		});

		function isSubmenuItemSelected() {
			return [...submenuItems].some(el => el.ariaSelected === 'true');
		}

		function isSubmenuItemClicked(t: EventTarget) {
			return [...submenuItems].some(el => el === t);
		}
	});

	interface Tab {
		href: string;
		name?: string;
		label?: string;
		role?: 'tab' | 'menu';
		class?: 'new';
	}
</script>
<nav>
	<!-- top menu -->
	<div class="main-menu">
		<div role="menubar">
			{#each tabs as { href, name, role, class: cls }}
				{#if role === 'menu'}
					<a {role} {href} aria-expanded={menuOpen} aria-controls="sub-menu" class={cls} onclick={() => menuOpen = !menuOpen} bind:this={menu}>
						<div></div>{name}<div></div>
					</a>
				{:else}
					<a role="tab" {href} aria-selected={isPath(href)} onclick={() => menuOpen = false}>{name || href.substring(1)}</a>
				{/if}
			{/each}
		</div>
	</div>
	<!-- Programs sub menu -->
	<div id="sub-menu" aria-hidden={!menuOpen} bind:this={subMenu}>
		<div role="menubar">
			{#each subTabs as { href, name, class: cls, label }}
				<a role="tab" {href} aria-selected={isPath(href)} title={label} aria-label={label} class={cls}>{name || href.substring(1)}</a>
			{/each}
		</div>
	</div>
</nav>

<style lang="scss">
	/* @mixin new() { // mixins not working here; reason unknown */
	a.new::after {
		content: "new";
		color: white;
		display: inline-block;
		background-color: blueviolet;
		position: absolute;
		padding: 2px 3px;
		translate: 0 -2px;
		font-size: 1rem;
		rotate: 14deg;
		box-shadow: 0 1px 2px #00000066;
	}

	nav {
		position: sticky;
		top: 0;
		z-index: 10;
		font-size: 0;
		/*// box-shadow: 0 2px 4px #333;*/
		box-shadow: 0 2px 4px rgb(0 0 0 / 40%);
		user-select: none;

		& > div {
			display: flex;
			flex-direction: column;
			align-items: center;
			background: whitesmoke;

			[role="menubar"] {
				display: flex;
				justify-content: center;
				max-width: 1200px;
				width: 100%;
				padding-inline: 60px;
	            box-sizing: border-box;
			}
		}
		a {
			color: var(--primary-dark);
			text-decoration: none;
			text-transform: uppercase;
			display: inline-block;
			padding-block: 20px;
			font-size: 14px;
			outline: none;
			flex-grow: 1;
			text-align: center;
			white-space: nowrap;

			&:is([aria-selected="true"], [aria-expanded="true"]) {
				background-color: var(--primary);
				color: white;
				pointer-events: none;
			}

			&:not([aria-selected="true"], [aria-expanded="true"]):is(:focus-visible, :hover) {
				color: white;
				/* background-color: #9b6 !important; */
				background: linear-gradient(0, #683, #9b6);
				text-shadow: 0 1px 2px #360;
			}

			&.new::after {
				@include new();
			}
		}
		[role="menu"]::after {
			content: "\025bc";
			font-family: monospace;
			margin-left: 5px;
			translate: 0 -1px;
			display: inline-block;
			transition: translate 0.075s ease-out;
		}
		[role="menu"]:hover::after {
			translate: 0 4px;
		}
		&:has([aria-expanded="true"]) [aria-selected="true"] {
			background-color: #9b6;
		}
		&:has(#sub-menu [role="tab"][aria-selected="true"]) [aria-expanded="false"] {
			background-color: var(--primary);
			color: #fff;
		}
		&:has([aria-expanded="false"]) #sub-menu {
			/*// display: none;*/
			max-height: 0;
			position: absolute;
			width: 100%;
			transition-duration: 0.075s;
		}
		&:has([aria-expanded="false"]:hover) #sub-menu {
			/*// display: block;*/
			max-height: 5px;
		}
		/* FF */
		@supports (-moz-appearance: none) {
			.main-menu:not(.active) + #sub-menu {
				max-height: 0;
				position: absolute;
				width: 100%;
				transition-duration: 0.075s;
			}
		}
	}
	.main-menu {
		position: relative;
		z-index: 1;
	}
	#sub-menu {
		max-height: 59px;
		transition: max-height 0.3s ease-out;
		overflow: hidden;
		box-shadow: 0 2px 4px rgb(0 0 0 / 40%);

		background: var(--primary);
		background-color: var(--primary);

		a {
			color: white;
	        padding-inline: 30px;
			border-radius: 13px;
			box-shadow: 0 0 0px 6px var(--primary) inset;
			outline: var(--primary) solid 2px;
		}

		/* a:hover, */
		[aria-selected="true"] {
			background-color: var(--primary-dark);
		}
		a:is(:hover, :focus-visible) {
			background: none;
			background-color: #9b6;
		}
		&:has([aria-selected="true"]) {
			position: static !important;
			/* max-height: 59px !important;
			[role="tab"] {
				display: block !important;
			} */
		}
		&[aria-hidden="true"]::after {
			content: "";
			display: block;
			height: 39px;
		}
		[role="menubar"] {
			position: absolute;
			bottom: 0;
			overflow: hidden;
			display: block;
			width: auto;
			white-space: nowrap;

			.new::after {
				@include new();
			}
		}
		position: relative;
		&::after {
			content: "";
			height: 59px;
		}
	}
	[aria-controls="sub-menu"] {
		position: relative;
		div {
			display: none;
		}
		&:is([aria-expanded="true"], :hover) div {
			display: inline-block;
			position: absolute;
			bottom: 0;
			left: 0;
			font-size: 0;
			translate: -10px;
			overflow: hidden;
			&::before {
				content: "";
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 0 0 10px 0;
				box-shadow: 0 0 0 5px var(--primary);
			}
			&:nth-child(2) {
				rotate: 90deg;
				translate: 10px;
				left: unset;
				right: 0;
			}
		}
	}
</style>
