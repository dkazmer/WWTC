<script lang="ts">
	import { onMount } from 'svelte';
	import Notice from '$lib/components/notice.svelte';
	import PrimaryBtn from '$lib/components/pri_btn.svelte';
	import { rates, season } from '$lib/constants';

	let hasRegistered = $state(false);

	onMount(() => {
		const url = new URL(location.href);
		hasRegistered = url.searchParams.has('registered') && document.cookie.includes('registered');
	});

	const {
		adult: { earlyBird, regular, fall },
		junior
	} = rates;
</script>

<h1><time datetime={`${season}`}>{season}</time> membership fees</h1>

<table>
	<thead>
		<tr>
			<th>Period</th>
			<th>Adult</th>
			<th>Junior <span>(under 18)</span></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<b>Early Bird</b>
				(before <time datetime="2026-03-01">March 1<sup>st</sup></time>)
			</td>
			<td><strike>${earlyBird}</strike></td>
			<td rowspan="3">${junior}</td>
		</tr>
		<tr>
			<td><b>Regular</b></td>
			<td>${regular}</td>
		</tr>
		<tr>
			<td>
				<b>Late Summer</b>
				(<time datetime="2026-08-15">August 15<sup>th</sup></time>)
			</td>
			<td>${fall}</td>
		</tr>
	</tbody>
</table>

{#if !hasRegistered}
	<div>
		<Notice type="warn"
			>Please check your spam/junk folder if you do not receive a response from us
			<span>after you have registered</span>.</Notice
		>
		<PrimaryBtn href="/register" label="Sign up" icon={{ family: 'outline', name: 'app_registration' }} />
	</div>
{/if}

<h2>Online Booking of Tennis Courts & Hitting Wall</h2>
<p>
	Once you pay your membership fee, you will have access to the online booking system.
	<span style="font-weight: 600;">No refunds</span>
	once the season starts and the gate code has been given out.
</p>

<h2>COURT BOOKING</h2>
<p>
	<!--Courts and booking system will be available for <time datetime="2026-04-01">April 1<sup>st</sup></time> weather
	permitting.-->

	Whilst the booking system will be available from <time datetime="2026-04-01">April 1<sup>st</sup></time>, court
	availablity depends on the City's completion of the courts. Maximum 3 active bookings in a week.
</p>

<p>
	Members are allowed to book 1 hour per day. However, once at the club, members are allowed to stay and play longer as
	long as courts are available. You must cancel your court if you don't come, otherwise you'll be blocked from booking
	for
	<time datetime="PD7">7 days</time>.
</p>

<p>
	Juniors cannot book courts during evening hours (<time datetime="PH3">7-10pm</time>), Sat &amp; Sun Mornings (<time
		datetime="PH4"
		>8am-12pm</time
	>). Only 4 Adult Members can book 2 hours to play doubles in the evenings.
</p>

<!-- <h2>Members can bring guests</h2> -->
<p>
	<span style="font-weight: 600;">Members can bring guests!</span>
	The guest fee is $10 per person, 3 visit limit; e-transfer to: <u>wishingwelltennis@hotmail.com</u>
</p>

<p>
	Once you have joined, you will have access to the court booking system at
	<a href="http://wwtennis.skedda.com/" target="_blank">Skedda</a>
</p>

{#if !hasRegistered}
	<div class="sign-in-bottom">
		<PrimaryBtn href="/register" label="Sign up" icon={{ family: 'outline', name: 'app_registration' }} />
	</div>
{/if}

<style lang="scss">
	/* experimental */
	:global(main > div)::after {
		/* content: ""; */
		background-image: url(https://material-icons.github.io/material-icons/svg/card_membership/outline.svg);
		width: 50%;
		display: block;
		height: 12em;
		background-repeat: no-repeat;
		background-size: contain;
		z-index: -1;
		opacity: 0.1;
		margin-block: 5em;
	}

	table, table + div {
		margin: 2em auto;
		width: 820px;
	}

	:global(main > div table + div .notice) {
		margin-bottom: 2em !important;
		span {
			font-weight: 600;
			text-decoration: underline;
		}
	}

	table {
		b {
			font-weight: 600;
		}

		td {
			background-color: whitesmoke;
			padding: 8px 16px;
			vertical-align: initial;
		}
		th {
			color: white;
			background-color: var(--primary);
			padding: 8px 16px;
			font-weight: 600;

			span {
				font-weight: normal;
			}
		}
	}

	.sign-in-bottom {
		padding-block: 2em;
	}

	@media only screen and (width <= 768px) {
		table + div {
			width: auto;
		}
		table {
			min-width: unset;
		}
	}
</style>
