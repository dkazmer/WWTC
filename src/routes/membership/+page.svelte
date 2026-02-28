<script lang="ts">
	import PrimaryBtn from '$lib/components/pri_btn.svelte';
</script>

<h1><time datetime="2026">2026</time> membership fees</h1>

<table>
	<thead>
		<tr>
			<th></th>
			<th>
				Early Bird
				<span
					>(before <time datetime="2026-03-01">March 1<sup>st</sup></time>)</span
				>
			</th>
			<th>Regular&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
			<th>
				Late Summer
				<span
					>(<time datetime="2026-08-15">August 15<sup>th</sup></time>)</span
				>
			</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><span>Adult</span></td>
			<td>$80</td>
			<td>$90</td>
			<td>$50</td>
		</tr>
		<tr>
			<td><span>Junior</span> (under 18)</td>
			<td colspan="3">$35</td>
		</tr>
	</tbody>
</table>

<div><PrimaryBtn href="/register" label="Register now" /></div>

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
	The guest fee is $10.00 per person, 3 visit limit; e-transfer to: <u>wishingwelltennis@hotmail.com</u>
</p>

<p>
	Once you have joined, you will have access to the court booking system at
	<a href="http://wwtennis.skedda.com/" target="_blank">Skedda</a>
</p>

<style lang="scss">
	table + div {
		margin: 40px auto;
		width: 820px;
	}

	table {
		margin: 40px auto;
		min-width: 820px;
		td {
			background-color: whitesmoke;
			padding: 8px 16px;
			span {
				font-weight: 600;
			}
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

	@media only screen and (max-width: 768px) {
		table + div {
			width: auto;
		}
		table {
			min-width: unset;
		}
	}
</style>
