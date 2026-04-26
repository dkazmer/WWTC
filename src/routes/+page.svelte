<script lang="ts">
	import PrimaryBtn from '$lib/components/pri_btn.svelte';
</script>

<div class="heading">
	<h1>Hello everyone!</h1>
	<a href="http://wwtennis.skedda.com/" target="_blank">Book a court</a>
	<PrimaryBtn href="/register" label="Register now" icon={{ family: 'outline', name: 'app_registration' }} />
</div>

<enhanced:img
	src="/static/images/2024-05-04/20240504_121509.jpg?w=1080"
	alt="members"
	role="presentation"
	style="width: -webkit-fill-available; margin-bottom: 4em;"
/>

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
		<style>
			.mapouter {
				position: relative;
				text-align: right;
				height: 400px;
				width: 500px;
			}
		</style>
		<!-- <a href="https://www.embedgooglemap.net"></a> -->
	</div>
</div>

<h2 style="margin-top: 0;">Public Hours</h2>
Weekends and statutory holidays, <time datetime="PH3">1-4pm</time>, courts 1 and 2.

<article class="more" style="clear: none;">
	<h2>OPENING DAY</h2>
	<p>
		Early bird rate is $80 and must be paid by Sunday,
		<time datetime="2026-03-01" class="bold">March 1<sup>st</sup></time>. Pay your
		<a href="/membership">membership</a>
		fees early and save $10. You can pick up your shoe tags on opening day Saturday,
		<time datetime="2026-05-02" class="bold">May 2<sup>nd</sup></time>,
		<time datetime="PH2">11am to 1pm</time>. The rain date is the following day, Sunday,
		<time datetime="2026-05-03" class="bold">May 3<sup>rd</sup></time>.
	</p>
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
	.mapouter {
		float: right;
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
			margin: 0 auto;
		}
	}

	.heading {
		display: flex;
		padding-bottom: 3em;

		h1 {
			flex-grow: 1;
			margin-top: 4px;
		}

		h1 + a {
			max-height: 24px;
			margin-top: 8px;
			margin-right: 56pt;
		}
	}

	.gmap_canvas {
		overflow: hidden;
		background: none !important;
		height: 400px;
		width: 500px;
	}
</style>
