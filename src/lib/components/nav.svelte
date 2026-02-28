<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let menu: HTMLAnchorElement;
	let subMenu: HTMLDivElement;
	let menuOpen = false;

	const tabs: Tab[] = [
		{
			href: '/',
			name: 'home',
			icon: {
				name: 'home',
				family: 'outline'
			}
		},
		{
			href: '/membership',
			icon: {
				name: 'card_membership',
				family: 'outline'
			}
		},
		{
			href: '/schedule',
			icon: {
				name: 'schedule',
				family: 'outline'
			}
		},
		{
			href: '/photos',
			icon: {
				name: 'photo',
				family: 'outline'
			}
		},
		{
			href: 'javascript://',
			name: 'programs',
			role: 'menu',
			icon: {
				name: 'list_alt',
				family: 'outline'
			}
		},
		{
			href: '/executive',
			name: 'exec',
			icon: {
				name: 'badge',
				family: 'outline'
			}
		},
		{
			href: '/newsletter',
			icon: {
				name: 'picture_as_pdf',
				family: 'outline'
			}
		},
		{
			href: '/links',
			icon: {
				name: 'insert_link',
				family: 'outline'
			}
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

	/* function isSubPath() {
		switch (page.url.pathname) {
			case '/intercounty':
			case '/stf':
			case '/juniors':
			case '/lessons':
			case '/tournament':
				return 0;
		}

		return -1;
	} */

	onMount(() => {
		const submenuItems = Array.from(subMenu.querySelectorAll('a'));

		menuOpen = isSubmenuItemSelected();

		document.addEventListener('click', ({ target }) => {
			if (target === menu || target === subMenu || isSubmenuItemClicked(target!) || isSubmenuItemSelected()) return;
			menuOpen = false;
		});

		function isSubmenuItemSelected() {
			return [...submenuItems].some(el => el.ariaCurrent === 'page');
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
		icon?: {
			name: string;
			family: string;
		}
	}
</script>
<nav>
	<!-- top menu -->
	<div class="main-menu">
		<div role="menubar">
			<ul>
				{#each tabs as { href, name, role, class: cls, icon }}
					<li>
						{#if role === 'menu'}
							<a {role} {href} aria-current={menuOpen ? 'true' : null} aria-expanded={menuOpen} aria-controls="sub-menu" class={cls} onclick={() => menuOpen = !menuOpen} bind:this={menu}>
								{#if icon}
									<img src="https://material-icons.github.io/material-icons/svg/{icon.name}/{icon.family}.svg" alt="" role="presentation">
								{/if}
								<div></div>{name}<div></div>
							</a>
						{:else}
							<a {href} aria-current={isPath(href) ? 'page' : null} onclick={() => menuOpen = false}>
								{#if icon}
									<img src="https://material-icons.github.io/material-icons/svg/{icon.name}/{icon.family}.svg" alt="" role="presentation">
								{/if}
								{name || href.substring(1)}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<!-- Programs sub menu -->
	<div id="sub-menu" aria-hidden={!menuOpen} bind:this={subMenu}>
		<div role="menubar">
			<ul>
			{#each subTabs as { href, name, class: cls, label }}
				<li><a {href} aria-current={isPath(href) ? 'page' : null} tabindex={menuOpen ? 0 : -1} title={label} aria-label={label} class={cls}>{name || href.substring(1)}</a></li>
			{/each}
			</ul>
		</div>
	</div>
</nav>

<style lang="scss">
	ul, ul li {
		display: contents;
	}
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
			/* outline-color: transparent; */
			outline: none;
			flex-grow: 1;
			text-align: center;
			white-space: nowrap;
			letter-spacing: 1pt;
			
			img {
				vertical-align: middle;
				margin-block: -7px -4px;
			}

			&:is([aria-current="page"], [aria-expanded="true"]) {
				background-color: var(--primary);
				color: white;
				pointer-events: none;
			}

			&:not([aria-current], [aria-expanded="true"]):is(:focus-visible, :hover) {
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
		&:has([aria-expanded="true"]) [aria-current="page"] {
			background-color: #9b6;
		}
		&:has(#sub-menu [aria-current="page"]) [aria-expanded="false"] {
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
		[aria-current] {
			background-color: var(--primary-dark);
		}
		a:is(:hover, :focus-visible) {
			background: none;
			background-color: #9b6;
		}
		&:has([aria-current]) {
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
	
	@media screen and (width < 1000px) {
		nav a img {
			display: none;
		}
	}
</style>
