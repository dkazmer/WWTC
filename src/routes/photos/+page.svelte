<script lang="ts">
	import { gallery, gallery2, gallery3, gallery4, gallery5, gallery6, galleryLast } from './gallery';
</script>

<h1>Opening Day, May 3<sup>rd</sup>, 2025</h1>
<div class="pics">
	<enhanced:img src="/static/images/2025-05-03/thumbnail_20250503_114226.jpg?w=1080" alt="2025 May, number 1" />
	{#each gallery as src, i}
		<enhanced:img {src} alt="2025 May, set 1, item {i+2}" loading="lazy" decoding="async" />
	{/each}
	<div class="half">
		{#each gallery2 as src, i}
			<enhanced:img {src} alt="2025 May, set 2, item {i+1}" loading="lazy" decoding="async" />
		{/each}
	</div>
	{#each gallery3 as src, i}
		<enhanced:img {src} alt="2025 May, set 3, item {i+2}" loading="lazy" decoding="async" />
	{/each}
	<div class="half">
		{#each gallery4 as src, i}
			<enhanced:img {src} alt="2025 May, set 4, item {i+1}" loading="lazy" decoding="async" />
		{/each}
	</div>
	{#each gallery5 as src, i}
		<enhanced:img {src} alt="2025 May, set 5, item {i+2}" loading="lazy" decoding="async" />
	{/each}
</div>

<hr>
<h1>Opening Day, May 4<sup>th</sup>, 2024</h1>
<p>
	We had an enthusiastic group out for Opening Day activities. The weather was beautiful! Lots of tennis! Thank you to
	Susan for organizing all the food snacks and drinks. A big shout out to Michael and Milica for running the live ball
	training sessions. They were really fun! Thanks to everyone for participating.
</p>
<div class="pics">
	{#each gallery6 as src, i}
		{#if !src}
			<enhanced:img
				src="/static/images/2024-05-04/IMG-20240504-WA0010.jpg?w=504"
				alt="2025 May, set 6, item {i+1}"
				loading="lazy"
				decoding="async"
			/>
		{:else}
			<enhanced:img
				{src}
				alt="2025 May, set 6, item {i+1}"
				loading="lazy"
				decoding="async"
				style={i === 1 ? 'max-height: 672px; width: 504px; object-fit: cover; object-position: 0 80%;': null}
			/>
		{/if}
	{/each}
</div>

<h1>2012 STF A1 Team</h1>
<div class="pics quad">
	{#each galleryLast as src, i}
		<enhanced:img {src} alt="2025 May, last set, item {i+1}" loading="lazy" decoding="async" />
	{/each}
</div>

<style lang="scss">
	@mixin half() {
		img:nth-child(2n) {
			float: right;
		}
	}
	
	h1, hr {
		clear: both;
	}

	h1 {
		line-height: 1.4;
		margin-top: 1.5em;
		margin-bottom: 0.75em;
	}

	:global(.pics) {
		padding-top: 2em;
		border-top: darkgray solid 1px;

		picture {
			max-width: 100%;
			margin-bottom: 3em;
			height: auto;
			float: left;

			img {
				max-width: 100%;
				height: auto;
			}

			&:nth-child(2n) {
				float: right;
			}
		}

		/* @include half(); */

		.half {
			/* @include half(); */

			picture {
				max-width: 504px;
				float: left;

				&:nth-child(2n) {
					float: right;
				}
			}
		}
	}
</style>
