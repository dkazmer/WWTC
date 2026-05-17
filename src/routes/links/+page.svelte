<script lang="ts">
	import external from '$lib/assets/external_link.svg';
	const links: { [K in 'href' | 'name']: string }[] = [
		{ href: 'http://tennisontario.com/', name: 'Ontario Tennis Association' },
		{ href: 'http://intercountytennis.com/', name: 'Toronto Intercounty Tennis' },
		{ href: 'http://tenniscanada.com/', name: 'Canadian Tennis Association' },
		{ href: 'http://juniortennis.com/', name: 'Junior Tennis' },
		{ href: 'http://scarboroughtennis.com/', name: 'Scarborough Tennis Federation' }
	];
</script>

<div class="links">
	{#each links as { href, name }}
		<a target="_blank" {href}> <span>{name}</span> {href.slice(7, -1)} </a>
	{/each}
</div>

<style lang="scss">
	.links {
		display: grid;
		grid-template-columns: 1fr 1fr;
		
		a::after {
			display: none;
		}

		a:link {
			display: block;
			font-weight: normal;
			/* margin-bottom: 2em; */
			text-shadow: none !important;
			color: #333;
			border-bottom: none !important;
			border-radius: 8px;
			padding-block: 1em;
			margin-right: 20%;
			padding-left: 0;
			transition: padding-left 250ms ease-out;
			outline-color: transparent;
			overflow-wrap: anywhere;
			
			&:is(:hover, :focus-visible) {
				background-color: #7473;
				padding-left: 2em;
				span {
					color: #747c;

					&::after {
						content: url("$lib/assets/external_link.svg");
						position: absolute;
						translate: 4px 2px;
					}
				}
			}

			span {
				display: inherit;
				font-weight: 600;
				color: unset;
			}
		}
		
		a:visited {
			color: #333;

			span {
				color: #474;
			}

			&:is(:hover, :focus-visible) {
				span {
					color: #747c;
				}
			}
		}
	}

	@media only screen and (max-width: 768px) {
		.links {
			grid-template-columns: 1fr;
		}

		.links a:link {
			margin-right: 0;
			padding: 0.85em 0;
		}

		.links a:link:is(:hover, :focus-visible) {
			padding-left: 0.75em;
		}

		.links span {
			display: none;
		}
	}
</style>
