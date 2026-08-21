<script lang="ts">
	import { onMount } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	import BizCard, { type Card } from '$lib/components/biz_card.svelte';

	let cards: Card[] = [];

	onMount(async () => {
		const data = await fetch('/contacts.json');
		const json = await data.json();
		cards = json.filter(({ id }: Card) => id !== 'mark-cooper');
	});

	const cardHighlight: MouseEventHandler<HTMLAnchorElement> = ({ currentTarget }) => {
		cards = cards.map(card => {
			card.active = card.id === currentTarget.hash.substring(1);
			return card;
		});
	};
</script>

<h1>Tennis lessons anyone?</h1>

<article>
	<p>
		Whether you’re a burgeoning pro or your game needs a lift, group lessons for beginners, intermediates and advanced
		players are offered at the club by our certified teaching professionals. To be eligible for these programs
		participants must be members of the club.
	</p>
	<div>
		<h2>Instructors</h2>
		<p>
			<a href="#milica-stamenic" class="to-card" onclick={cardHighlight}>Milica Stamenic</a>
			is returning this year as Head Professional to Wishing Well to provide lessons to our members. She has
			<time datetime="PY25">25+ years</time>
			coaching experience at the Mayfair Clubs. She earned a scholarship at the prestigious Bollettieri Sports Academy,
			was also a member on Team Canada and top Under 18 in Canada.
		</p>
		<p>
			<a href="#michael-qian" class="to-card" onclick={cardHighlight}>Michael Qian</a>
			is returning to our coaching team this year at Wishing Well. He is a Certified Pro 2 tennis professional. He will
			be teaching lessons in <i>Mandarin only</i>.
		</p>
		<p>
			<a href="#akemi-seiriki" class="to-card" onclick={cardHighlight}>Akemi Seiriki</a>
			is returning to our coaching team this year at Wishing Well. She is a Certified Pro 2 tennis professional with
			over <time datetime="PY27">27 years</time> experience coaching at the Mayfair Clubs.
		</p>
	</div>
	<div>
		<h2>Junior Group Lessons</h2>
		<ul>
			<li>Junior Group Lessons will start Sunday <time datetime="2025-06-02">June 2</time></li>
			<li>Green Dot teenage tennis at <time datetime="14:00">2pm</time> Sundays</li>
			<li>Red/orange ball at <time datetime="15:00">3pm</time> Sundays</li>
		</ul>
	</div>
	<div>
		<h2>Summer camp</h2>
		<p>Please contact <a href="#peter-cameron" class="to-card" onclick={cardHighlight}>Peter Cameron</a>.</p>
		<p>
			Under the current Provincial guidelines, we are now allowed to have tennis camps. Junior tennis camps
			<!--will run from Monday <time datetime="2025-06-23">June 23</time> – Friday <time datetime="2025-08-22">August 22, 2025</time>-->
			will run weekdays, excluding holidays, at the following times (dates will be confirmed):
		</p>
		<ul>
			<li><time datetime="PH1">8-9am</time> (court 3 only; check Skeeda for availability)</li>
			<li><time datetime="PH3">9am to noon</time> (two courts)</li>
			<li><time datetime="PH3">1-4pm</time> (two courts)</li>
			<li><time datetime="PH1">4-5pm</time> (court 3 only; check Skeeda for availability)</li>
		</ul>
		<p>Please check <a href="http://wwtennis.skedda.com/" target="_blank">Skedda</a> for availability week to week.</p>
		<p>Note that&hellip;</p>
		<ul>
			<li><time datetime="PH1">Noon to 1pm</time> is open for court bookings on all 3 courts</li>
			<li>Court 3 is available for members to book all day</li>
			<li>The hitting wall is available for members to book all day</li>
			<li>
				To sign up for the junior tennis camps, please contact
				<a href="#peter-cameron" class="to-card" onclick={cardHighlight}>Peter Cameron</a>
			</li>
		</ul>
	</div>
	<div>
		<h2>Kids Clinic</h2>
		<ul>
			<li>$60 per session (<time datetime="PH1">1 hour</time> lesson for <time datetime="PW6">6 weeks</time>)</li>
			<li>Clinics will run depending on number of Participants</li>
		</ul>
	</div>
</article>

<div class="cards">
	{#each cards as card}
		<BizCard {...card} />
	{/each}
</div>

<style>
	article {
		columns: 2;
		column-gap: 4em;
		column-rule: gray dotted 1px;
		padding: 1em 0;

		p {
			margin-top: 0;
		}
		& > * {
			page-break-inside: avoid;
			break-inside: avoid;
			margin-bottom: 1.5em;
		}

		ul {
			padding-left: 1.4em;
		}

		li + li {
			margin-top: 0.35em;
		}
	}

	@media only screen and (max-width: 768px) {
		article {
			columns: 1;
			column-rule: none;
			line-height: 1.55;
		}
	}
</style>
