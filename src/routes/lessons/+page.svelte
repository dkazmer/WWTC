<script lang="ts">
	import { onMount } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	import BizCard, { type Card } from '$lib/components/biz_card.svelte';

	let cards: Card[] = [];
	let table: HTMLTableElement;

	onMount(async () => {
		const data = await fetch('/contacts.json');
		const json = await data.json();
		cards = json.filter(({ id }: Card) => id !== 'mark-cooper' && id !== 'peter-cameron');

		// attached card handler to dynamic html:
		table.querySelector('a')?.addEventListener('click', cardHighlight as EventListener);
	});

	const cardHighlight: MouseEventHandler<HTMLAnchorElement> = ({ currentTarget }) => {
		cards = cards.map(card => {
			card.active = card.id === currentTarget.hash.substring(1);
			return card;
		});
	};

	const rates: {
		price: number;
		service: string;
	}[] = [
		{
			price: 90,
			service: 'Private lessons with <a href="#milica-stamenic" class="to-card">Head Pro</a>'
		},
		{
			price: 60,
			service: 'Private &amp; group lessons'
		},
		{
			price: 50,
			service: 'Semi-private'
		},
		{
			price: 20,
			service: 'Adult tennis cardio clinic'
		}
	];
</script>

<h1>Tennis lessons anyone?</h1>

<section class="rates">
	<h2>Hourly lesson rates</h2>
	<table bind:this={table}>
		<tbody>
			{#each rates as { price, service }}
				<tr>
					<td>${price}</td>
					<td>{@html service}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<article>
	<p>
		Whether you’re a burgeoning pro or your game needs a lift, group lessons for beginners, intermediates and advanced
		players are offered at the club by our certified teaching professionals. To be eligible for these programs
		participants must be members of the club.
	</p>
	<p>
		<a href="#milica-stamenic" class="to-card" onclick={cardHighlight}>Milica Stamenic</a>
		is returning this year as Head Professional to Wishing Well to provide lessons to our members. She has
		<time datetime="PY11">25+ years</time>
		teaching experience, formally at the Mayfair Clubs; she earned a scholarship at the prestigious Bollettieri Sports
		Academy, was also a member on Team Canada and top Under 18 in Canada.
	</p>
	<p>
		<a href="#michael-qian" class="to-card" onclick={cardHighlight}>Michael Qian</a>
		is returning to our coaching team this year at Wishing Well. He is a Certified Pro 2 tennis professional. He will be
		teaching lessons in <i>Mandarin only</i>.
	</p>
	<p>
		<a href="#akemi-seiriki" class="to-card" onclick={cardHighlight}>Akemi Seiriki</a>
		is returning to our coaching team this year at Wishing Well. She is a Certified Pro 2 tennis professional with over
		<time datetime="PY27">27 years</time>
		experience coaching at the Mayfair Clubs.
	</p>
</article>

<div class="cards">
	{#each cards as card}
		<BizCard {...card} />
	{/each}
</div>

<style>
	article {
		padding: 1em 0;

		p {
			margin-top: 0;
		}
	}
	:global(main b),
	table td:first-child {
		font-weight: 600;
	}
	table td {
		padding: 8px 16px;
		background-color: #eee;

		&:first-child {
			min-width: 4em;
		}
	}
	section.rates {
		float: right;
		margin-left: 4em;
		margin-bottom: 3em;

		h2 {
			margin-top: 0;
			border: none;
		}
	}
	:global(main li) {
		font-size: 1.3rem;
		line-height: 2rem;
	}
</style>
