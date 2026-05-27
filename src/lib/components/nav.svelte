<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let menu: HTMLAnchorElement;
	let subMenu: HTMLDivElement;
	let mobileToggle: HTMLButtonElement;
	let mainMenu: HTMLDivElement;
	let menuOpen = false;
	let mobileMenuOpen = false;

	const tabs: Tab[] = [
		{
			href: '/',
			name: 'home',
			label: 'home',
			icon: {
				// name: 'home',
				name: 'sports_tennis',
				family: 'outline'
			}
		},
		{
			href: '/membership'
			// icon: {
			// 	name: 'card_membership',
			// 	family: 'outline'
			// }
		},
		{
			href: '/schedule'
			// icon: {
			// 	name: 'schedule',
			// 	family: 'outline'
			// }
		},
		{
			href: '/photos'
			// icon: {
			// 	name: 'photo',
			// 	family: 'outline'
			// }
		},
		{
			// @ts-expect-error (ts2322): string doesn't match type
			href: 'javascript://',
			name: 'programs',
			role: 'menu'
			// icon: {
			// 	name: 'list_alt',
			// 	family: 'outline'
			// }
		},
		{
			href: '/executive',
			name: 'exec'
			// icon: {
			// 	name: 'badge',
			// 	family: 'outline'
			// }
		},
		{
			href: '/newsletter'
			// icon: {
			// 	name: 'picture_as_pdf',
			// 	family: 'outline'
			// }
		},
		{
			href: '/links'
			// icon: {
			// 	name: 'insert_link',
			// 	family: 'outline'
			// }
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
			className: 'new'
		}
	];

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

		const collapseMenus = ({ target }: MouseEvent) => {
			if (target instanceof Node && mobileMenuOpen && !mainMenu.contains(target) && !mobileToggle.contains(target)) {
				menuOpen = false;
				mobileMenuOpen = false;
				return;
			}

			if (
				target === menu ||
				target === subMenu ||
				(target instanceof Node && mobileToggle.contains(target)) ||
				isSubmenuItemClicked(target!) ||
				isSubmenuItemSelected()
			)
				return;
			menuOpen = false;
			mobileMenuOpen = false;
		};

		document.addEventListener('click', collapseMenus);

		function isSubmenuItemSelected() {
			return [...submenuItems].some(el => el.ariaCurrent === 'page');
		}

		function isSubmenuItemClicked(t: EventTarget) {
			return [...submenuItems].some(el => el === t);
		}

		return () => {
			document.removeEventListener('click', collapseMenus);
		};
	});

	interface Tab {
		href: typeof page.url.pathname;
		name?: string;
		label?: string;
		role?: 'tab' | 'menu';
		className?: 'new';
		icon?: {
			name: string;
			family: string;
		};
	}
</script>
<nav>
	<!-- top menu -->
	<button
		class="hamburger"
		type="button"
		aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
		aria-expanded={mobileMenuOpen}
		aria-controls="main-menu"
		onclick={() => mobileMenuOpen = !mobileMenuOpen}
		bind:this={mobileToggle}
	>
		<span></span>
		<span></span>
		<span></span>
	</button>
	<div id="main-menu" class="main-menu" class:open={mobileMenuOpen} bind:this={mainMenu}>
		<div role="menubar">
			<ul>
				{#each tabs as { href, name, role, className, icon, label }}
					<li>
						{#if role === 'menu'}
							<a
								{role}
								{href}
								aria-current={menuOpen ? 'true' : null}
								aria-expanded={menuOpen}
								aria-controls="sub-menu"
								class={className}
								onclick={() => menuOpen = !menuOpen}
								bind:this={menu}
							>
								{#if icon}
									<img
										src="https://material-icons.github.io/material-icons/svg/{icon.name}/{icon.family}.svg"
										alt=""
										aria-hidden="true"
									>
								{/if}
								<div></div>
								{name}
								<div></div>
							</a>
							<!-- Programs sub menu for mobile -->
							<div id="mobile-sub-menu" class="programs-sub-menu mobile-sub-menu" aria-hidden={!menuOpen}>
								<div role="menubar">
									<ul>
										{#each subTabs as { href, name, className, label }}
											<li>
												<a
													{href}
													aria-current={isPath(href) ? 'page' : null}
													tabindex={menuOpen ? 0 : -1}
													title={label}
													aria-label={label}
													class={className}
													onclick={() => {
														menuOpen = false;
														mobileMenuOpen = false;
													}}
													>{name || href.substring(1)}</a
												>
											</li>
										{/each}
									</ul>
								</div>
							</div>
						{:else}
							<a
								{href}
								aria-label={label || name || null}
								title={label || name || null}
								aria-current={isPath(href) ? 'page' : null}
								onclick={() => {
									menuOpen = false;
									mobileMenuOpen = false;
								}}
							>
								{#if icon}
									<img
										src="https://material-icons.github.io/material-icons/svg/{icon.name}/{icon.family}.svg"
										alt=""
										aria-hidden="true"
									>
								{/if}
								{name || href.substring(1)}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<!-- Programs sub menu for desktop -->
	<div id="sub-menu" class="programs-sub-menu" aria-hidden={!menuOpen} bind:this={subMenu}>
		<div role="menubar">
			<ul>
				{#each subTabs as { href, name, className, label }}
					<li>
						<a
							{href}
							aria-current={isPath(href) ? 'page' : null}
							tabindex={menuOpen ? 0 : -1}
							title={label}
							aria-label={label}
							class={className}
							>{name || href.substring(1)}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>

<style lang="scss">
	.main-menu > div > ul,
	.main-menu > div > ul li {
		display: contents;
	}

	#sub-menu ul,
	#sub-menu li {
		display: contents;
	}

	.mobile-sub-menu ul,
	.mobile-sub-menu li {
		display: block;
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
				filter: var(--primary-dark-filter);
				opacity: .54;
				pointer-events: none;
			}

			&:is([aria-current="page"], [aria-expanded="true"]) {
				background-color: var(--primary);
				color: white;
				pointer-events: none;
				
				img {
					filter: invert(1) drop-shadow(0px 2px 4px var(--primary-dark));
					opacity: 1;
				}
			}

			&:not([aria-current], [aria-expanded="true"]):is(:focus-visible, :hover) {
				color: white;
				/* background-color: #9b6 !important; */
				background: linear-gradient(0, #683, #9b6);
				text-shadow: 0 1px 2px #360;
				
				img {
					filter: invert(1) drop-shadow(0px 2px 4px var(--primary-dark));
					opacity: 1;
				}
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
			
			img {
				filter: invert(1);
			}
		}
		&:has(#sub-menu [aria-current="page"]) [aria-expanded="false"] {
			background-color: var(--primary);
			color: #fff;
		}
		&:has([aria-controls="sub-menu"][aria-expanded="false"]) #sub-menu {
			/*// display: none;*/
			max-height: 0;
			position: absolute;
			width: 100%;
			transition-duration: 0.075s;
		}
		&:has([aria-controls="sub-menu"][aria-expanded="false"]:hover) #sub-menu {
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
	.hamburger {
		display: none;
	}
	.mobile-sub-menu {
		display: none;
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
		nav {
			padding-inline: 0;
		}
		.hamburger {
			display: inline-flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 10px;
			right: 16px;
			width: 44px;
			height: 44px;
			border: 2px solid var(--primary);
			border-radius: 12px;
			background: white;
			cursor: pointer;
			z-index: 20;
		}
		.hamburger span {
			display: block;
			width: 22px;
			height: 2px;
			background: var(--primary-dark);
			border-radius: 1px;
			margin: 3px 0;
		}
		.main-menu {
			width: 70%;
			max-width: 360px;
			background: whitesmoke;
			display: none;
			position: absolute;
			top: 100%;
			right: 0;
			left: auto;
			z-index: 15;
			box-shadow: 0 2px 12px rgb(0 0 0 / 25%);
		}
		.main-menu.open {
			display: block;
		}
		.main-menu > div {
			flex-direction: column;
			align-items: stretch;
			padding: 0 16px 12px;
		}
		.main-menu.open > div {
			display: flex;
		}
		nav a {
			padding: 10px 12px;
			font-size: 1.2rem;
			white-space: normal;
			flex: 1 1 auto;
			text-align: left;
			letter-spacing: 0.04em;
			border-radius: 12px;
			margin: 2px 0;
		}
		#sub-menu {
			display: none;
		}
		.mobile-sub-menu {
			display: block;
			position: static;
			width: auto;
			margin: 0;
			margin-right: auto;
			margin-left: -9rem;
			padding-left: 1rem;
			background: transparent;
			box-shadow: none;
			max-height: none;
			visibility: hidden;
			height: 0;
			overflow: hidden;
		}
		.mobile-sub-menu[aria-hidden="false"] {
			visibility: visible;
			height: auto;
		}
		.mobile-sub-menu > div[role="menubar"] {
			position: static;
			overflow: visible;
			display: flex;
			flex-direction: column;
			width: 50%;
			white-space: normal;
			align-items: flex-start;
		}
		.mobile-sub-menu > div[role="menubar"] ul {
			display: block;
		}
		.mobile-sub-menu a {
			padding-inline: 18px;
			border-radius: 10px;
			color: green;
		}
		.mobile-sub-menu a[aria-current="page"] {
			background: rgba(255,255,255,0.1);
			color: black;
		}
		.mobile-sub-menu[aria-hidden="true"]::after {
			display: none;
		}
		[role="menu"]::after {
			content: none;
		}
		[aria-controls="sub-menu"] div {
			display: none !important;
		}
	}
</style>
