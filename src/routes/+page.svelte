<script lang="ts">
	import PrimaryBtn from '$lib/components/pri_btn.svelte';
</script>

<div class="heading">
	<h1>Join our community</h1>
	<a href="http://wwtennis.skedda.com/" target="_blank">Book a court</a>
	<PrimaryBtn href="/register" label="Sign up" icon={{ family: 'outline', name: 'app_registration' }} />
</div>

<enhanced:img src="/static/images/2024-05-04/20240504_121509.jpg?w=1080" alt="members" role="presentation" />

<div class="mapouter">
	<div class="gmap_canvas">
		<iframe
			width="500"
			height="400"
			id="gmap_canvas"
			title="Interactive Google map of WWTC location"
			src="https://maps.google.com/maps?q=wishing%20well%20tennis%20club&t=&z=13&ie=UTF8&iwloc=&output=embed"
			frameborder="0"
			scrolling="no"
			marginheight="0"
			marginwidth="0"
		></iframe>
		<!-- <a href="https://www.embedgooglemap.net"></a> -->
	</div>
</div>

<h2 style="margin-top: 0;">Public Hours</h2>
Weekends and statutory holidays, <time datetime="PH3">1-4pm</time>, courts 1 and 2.

<article class="more" style="clear: none;">
	<!-- <h2>OPENING DAY</h2>
	<p>
		Early bird rate is $80 and must be paid by Sunday,
		<time datetime="2026-03-01" class="bold">March 1<sup>st</sup></time>. Pay your
		<a href="/membership">membership</a>
		fees early and save $10. You can pick up your shoe tags on opening day Saturday,
		<time datetime="2026-05-02" class="bold">May 2<sup>nd</sup></time>,
		<time datetime="PH2">11am to 1pm</time>. The rain date is the following day, Sunday,
		<time datetime="2026-05-03" class="bold">May 3<sup>rd</sup></time>.
	</p> -->
	<h2>Social Events</h2>
	<p>
		Mark your calendar for the Friday evening socials on
		<time datetime="2026-06-19" class="bold">June 19<sup>th</sup></time>
		and
		<time datetime="2026-08-21" class="bold">August 21<sup>st</sup></time>, <time datetime="PH2">7-9pm</time>. Join us
		for some fun tennis and drills lead by our Tennis coaches. Guests are welcome. Refreshments will be provided.
	</p>
	<h2>Monday Evening Round Robins</h2>
	<p>
		Casual Mondays <time datetime="PH2">7-9pm</time>, one court is reserved. This is open to all members. All you have
		to do is show up and organize your own partners. If members are waiting to play, please restrict your court time to
		a maximum of <time datetime="PT30M">30 minutes</time>, as a courtesy. If there's enough interest, we'll expand this
		to two courts. Thanks for your cooperation.
	</p>
</article>

<style lang="scss">
	[alt="members"] {
		height: auto;
		width: -webkit-fill-available;
		margin-bottom: 4em;
	}

	.mapouter {
		float: right;
		width: min(45%, 500px);
		aspect-ratio: 5 / 4;
		margin-left: 4em;
		margin-bottom: 3em;
		border-radius: 12px;
		border-end-start-radius: 0;
		overflow: hidden;
		user-select: none;
	}
	article.more {
		clear: right;
	}
	h2 {
		display: -webkit-box;
	}

	@media only screen and (width <= 768px) {
		.mapouter {
			float: none;
			width: 100%;
			max-width: 520px;
			aspect-ratio: 16 / 9;
			margin: 0 auto 3em;
		}
	}

	.heading {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		padding-bottom: 3em;

		h1 {
			flex-grow: 1;
			margin-top: 4px;
			text-transform: initial;
			min-width: 220px;
		}

		h1 + a {
			max-height: 24px;
			margin-top: 8px;
			margin-right: 56pt;
		}

		@media only screen and (width <= 768px) {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;

			h1 {
				margin-top: 0;
			}

			h1 + a {
				margin-right: 0;
			}

			a,
			:global(button) {
				width: 100%;
				max-width: 100%;
				box-sizing: border-box;
				margin-right: 0;
			}

			:global(.cta) {
				width: 50%;
				max-width: 50%;
				display: block;
				min-width: 0;
				margin-right: 0;
			}

			:global(.cta button) {
				width: 100%;
			}
		}
	}

	.gmap_canvas {
		overflow: hidden;
		background: none !important;
		height: 100%;
		width: 100%;
	}

	.gmap_canvas iframe {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
