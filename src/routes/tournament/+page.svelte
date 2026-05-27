<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';

	const images = import.meta.glob<true, string, Picture>(
		'/static/images/2025-09-14/IMG-20250907-WA00{00,01,02,03,04,10}.{jpg,png}',
		{
			query: { enhanced: true, w: 529 },
			eager: true,
			import: 'default'
		}
	);

	const gallery = Object.values(images);
</script>

<enhanced:img src="$lib/assets/banner_tournament.png?w=1080" alt="banner" />

<div>
	Hello Wishing Well Tennis Club Members,
	<p>We had an exciting and action-packed weekend at our club tournaments!</p>
	<p>
		A big thank-you to all the participants for their hard-fought matches, many of which were incredibly close. We also
		extend our gratitude to <span class="name">Mahak</span> for organizing the tournament, and to
		<span class="name">Iian and Louisa Figueira</span>
		for providing such delicious snacks. A special thank you as well to our club president,
		<span class="name">Marina Mihailovich</span>, for attending the matches and cheering on our players.
	</p>
	<p>And now, for our champions:</p>
	<table>
		<thead>
			<tr>
				<th></th>
				<th>Ladies’ Singles</th>
				<th>Open Singles</th>
				<th>Open Doubles</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>🏆 Winners</td>
				<td><span class="name">Mary Joe</span></td>
				<td><span class="name">Mahak Khurmi</span></td>
				<td><span class="name">Peter Wu & Shane Atkinson</span></td>
			</tr>
			<tr>
				<td>🥈 Runners-up</td>
				<td>Iris Wei</td>
				<td>Shay Raiczyk</td>
				<td>Kevin Yang & Yishai Ou</td>
			</tr>
		</tbody>
	</table>
	<!-- 
Ladies’ Singles
🏆 Winner: <span class="name">Mary Joe</span>
🥈 Runner-up: Iris Wei

Open Singles
🏆 Winner: <span class="name">Mahak Khurmi</span>
🥈 Runner-up: Shay Raiczyk

Open Doubles
🏆 Winners: <span class="name">Peter Wu & Shane Atkinson</span>
🥈 Runners-up: Kevin Yang & Yishai Ou

 -->
	<p>Congratulations to all the winners and participants for making this tournament such a success.</p>
</div>

<div class="images">
	{#each gallery as src, i}
		<enhanced:img {src} alt="2025 tournament {i+1}" loading="lazy" decoding="async" />
	{/each}
</div>

<style lang="scss">
	.name {
		font-weight: 600;
	}

	[alt="banner"] {
		max-width: 100%;
		margin-block: 3em;
		height: auto;
	}

	table {
		margin-block: 2em;
		min-width: 100%;
		max-width: 100%;
		table-layout: fixed;

		@media (width <= 768px) {
			font-size: 1.3rem;
		}

		td {
			background-color: whitesmoke;
			padding: 8px 16px;

			span {
				font-weight: 600;
			}
		}
		th {
			color: white;
			background-color: #683;
			padding: 8px 16px;
			font-weight: 600;
		}

		th,
		td {
			overflow-wrap: anywhere;

			@media (width <= 768px) {
				padding: 8px;
			}
		}
	}

	div.images {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 40px;

		picture {
			max-width: 49%;
			margin-top: 20px;

			img {
				width: 100%;
				height: auto;
			}
		}
	}
</style>
