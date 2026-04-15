<script lang="ts">
	import execs2018 from '$lib/assets/2018execs.gif';

	const availableYears = [2013, 2014, 2017, 2018, 2019, 2020, 2022, 2023, 2024];
</script>

<!--<h1>Love Talk</h1>-->

<!-- <section class="intro"><img src="newsletter2024.jpg" alt="intro"></section> -->

<!--<section class="current-affairs">
	Coming soon&hellip;-->
<!-- <a href="WW_Newsletter_2024.pdf" target="_blank">
		<img src="newsletter.jpg" alt="newsletter">
	</a>
	Welcome everyone. The 2024 tennis season will be here soon and we are looking forward to the warm weather and playing outdoors again.
	<br>&hellip;<br>
	Milica Stamenic, Michael Qian and Akemi Seiriki are returning as the club’s tennis coaches this year. They will be offering group lessons again,
	starting in early May, and also&hellip;
	<div>
		<a href="WW_Newsletter_2024.pdf" target="_blank">See what's new in 2024 (PDF)</a>
	</div> -->
<!--</section>-->

<h1>From the archives</h1>
<section class="news">
	{#each availableYears as year}
		<p><a href="/archive/newsletter_{year}.pdf" target="_blank">Spring {year}</a></p>
	{/each}
</section>

<section class="execs"><img src={execs2018} alt="2018 execs"></section>

<style>
	section.news {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		margin-top: 40px;

		p {
			padding-left: 2em;
			margin-top: 0;

			a[target="_blank"]:hover::after {
				content: url("$lib/assets/icon_pdf.svg");
				position: absolute;
				translate: 8px 2px;
				width: 16px;
				opacity: 0.6;
			}
		}
	}

	/*section.current-affairs {
		background-color: #ccc;
		padding: 3em;
		font-style: italic;
		font-size: 2rem;
		line-height: 3rem;
		user-select: none;
		position: relative;
		isolation: isolate;
		div {
			display: block;
			font-weight: 600;
			margin-top: 1em;
			font-style: normal;
		}
		img {
			all: revert;
			float: left;
			margin-right: 3em;
			margin-bottom: 6em;
			box-shadow: gray 0 2px 4px;
			rotate: 0deg;
			transition: all 0.1s ease-out;
		}
		&::before {
			content: open-quote;
			position: absolute;
			font-size: 40rem;
			color: #ddd;
			font-style: normal;
			right: 30px;
			top: -1rem;
			pointer-events: none;
			rotate: 180deg;
			z-index: -1;
		}
		&::after {
			content: "";
			clear: both;
			display: block;
		}
		a:first-of-type:hover img {
			box-shadow:
				gray 0 2px 4px,
				var(--secondary) 0 0 10px 1px;
			rotate: -7deg;
		}
	}*/

	section.execs {
		background-color: white;
		margin: 10rem 0 5rem;
		font-size: 0;
		img {
			all: unset;
			vertical-align: bottom;
		}
		&::after {
			content: "";
			display: inline-block;
			height: 240px;
			width: 35px;
			vertical-align: bottom;
			translate: -35px;
			background-image: linear-gradient(-90deg, white, transparent);
		}
	}

	/*.intro {
		position: relative;
		font-size: 0;
		line-height: 0;
		border-bottom: white 30px solid;
		max-height: 400px;
		overflow: hidden;
		&::before {
			content: ". . .";
			display: block;
		}
		&::after {
			content: "";
			display: block;
			width: 100%;
			height: 100px;
			position: absolute;
			bottom: 0;
			background: linear-gradient(0deg, white, transparent);
		}
		img {
			width: 100%;
			image-rendering: -webkit-optimize-contrast;
		}
	}*/
</style>
