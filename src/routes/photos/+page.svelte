<h1>Opening Day, May 3<sup>rd</sup>, 2025</h1>

<div class="pics">
	<img src="./images/2025-05-03/thumbnail_20250503_114226.jpg" alt="2025 May, number 1">
	{#each ['4159', '3717', '3704'] as src, i}
		<img
			src="./images/2025-05-03/thumbnail_20250503_11{src}.jpg"
			alt="2025 May, set 1, item {i+2}"
			loading="lazy"
			decoding="async"
		>
	{/each}
	<div class="half">
		{#each ['1958', '2016', '1743', '1659'] as src, i}
			<img
				src="./images/2025-05-03/thumbnail_20250503_12{src}.jpg"
				alt="2025 May, set 2, item {i+1}"
				loading="lazy"
				decoding="async"
			>
		{/each}
	</div>
	{#each ['2034', '2049', '2135', '2148', '4236'] as src, i}
		<img
			src="./images/2025-05-03/thumbnail_20250503_12{src}.jpg"
			alt="2025 May, set 3, item {i+1}"
			loading="lazy"
			decoding="async"
		>
	{/each}
	<div class="half">
		{#each ['940', '923', '900', '805'] as src, i}
			<img
				src="./images/2025-05-03/thumbnail_20250503_121{src}.jpg"
				alt="2025 May, set 4, item {i+1}"
				loading="lazy"
				decoding="async"
			>
		{/each}
	</div>
	{#each ['14454', '14102', '21721', '14136', '13353'] as src, i}
		<img
			src="./images/2025-05-03/thumbnail_20250503_1{src}.jpg"
			alt="2025 May, set 5, item {i+1}"
			loading="lazy"
			decoding="async"
		>
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
	{#each ['13418', '21208', '21216', '21240', '', '21326', '21448', '21509'] as src, i}
		{#if !src}
			<img
				src="./images/2024-05-04/IMG-20240504-WA0010.jpg"
				alt="2025 May, set 6, item {i+1}"
				loading="lazy"
				style="max-width: 504px;"
				decoding="async"
			>
		{:else}
			<img
				src="./images/2024-05-04/20240504_1{src}.jpg"
				alt="2025 May, set 6, item {i+1}"
				loading="lazy"
				decoding="async"
				style={i === 3 ? 'max-height: 672px; width: 504px; object-fit: cover; object-position: 0 80%;': null}
			>
		{/if}
	{/each}
</div>

<h1>2012 STF A1 Team</h1>
<div class="pics quad">
	{#each ['IMG_4727', 'IMG_4731', 'IMG_4722', 'IMG_4732'] as src, i}
		<img src="./images/2012_stf/{src}.jpg" alt="2012 STF A1 Team, {i+1}">
	{/each}
</div>

<style lang="scss">
	@mixin half() {
		img:nth-child(2n) {
			float: right;
		}
	}

	:global(.pics) {
		padding-top: 2em;
		border-top: darkgray solid 1px;

		img {
			max-width: 100%;
			margin-bottom: 3em;

			&:nth-child(2n) {
				float: right;
			}
		}

		/* @include half(); */

		.half {
			/* @include half(); */

			img {
				max-width: 504px;

				&:nth-child(2n) {
					float: right;
				}
			}
		}
	}
</style>
