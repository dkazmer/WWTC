<script lang="ts">
	import { onMount } from 'svelte';

	let header: HTMLElement;

	onMount(() => {
		setScrollPosition();
		document.addEventListener('scroll', setScrollPosition);
		return () => document.removeEventListener('scroll', setScrollPosition);
	});

	function setScrollPosition() {
		if (!header) return;

		const { matches } = matchMedia('(min-width: 1005px)');
		header.style.backgroundPositionY = matches ? `calc(80% + 60px + ${scrollY / 2}px)` : '0';
	}
</script>

<header bind:this={header}>
	<div><span>Wishing Well</span> Tennis Club</div>
</header>

<style lang="scss">
	header {
		color: white;
		background-color: darkgray;
		background-image: url("$lib/assets/banner1.jpg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position-x: center;
		background-position-y: calc(80% + 60px);
		text-align: center;
		min-height: 177px;
		scale: -1 1;
		
		div {
			scale: -1 1;
			text-align: left;
			font-size: 5rem;
			font-weight: 200;
			padding-block: 0 !important;
			user-select: none;
			mix-blend-mode: overlay;
			translate: 0 70px;
			
			span {
				font-weight: 700;
			}
		}

		@media screen and (width < 1005px) {
			background-size: cover;
			background-position: center;
			min-height: 160px;
			div {
				font-size: 3.6rem;
				translate: 0 40px;
			}
		}
	}
</style>
