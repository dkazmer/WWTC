<script lang="ts">
	import { onMount } from 'svelte';
	import type { ChangeEventHandler, MouseEventHandler } from 'svelte/elements';
	import iconExcel from '$lib/assets/excel_icon.svg';
	import { createAPIMethod } from '$lib/createAPI';
	import { myExcelXML } from './excel.js';
	import type { List, Stats } from './index';
	import StatsComponent from './stats.svelte';
	import Table from './table.svelte';

	let checkedIDs: Set<number>;
	let checkedSize = $state(0);
	let list: List = $state([]);
	let stats: Stats = $state({
		total: 0,
		numAdults: 0,
		numJuniors: 0,
		paidAdults: 0,
		paidJuniors: 0
	});

	let listCount = $derived(Object.entries(list).length);

	const get = createAPIMethod<{ year: string }, List>({
		url: './data.json',
		method: 'GET'
	});

	onMount(async () => {
		list = await get({ year: '2026' });
		stats = setStats(list);
	});

	function setStats(data: List) {
		const adults = data.filter(({ ageGroup }) => ageGroup === 'a');
		const juniors = data.filter(({ ageGroup }) => ageGroup !== 'a');

		return {
			total: data.length,
			numAdults: adults.length,
			numJuniors: juniors.length,
			paidAdults: adults.filter(({ owing }) => owing === '0').length,
			paidJuniors: juniors.filter(({ owing }) => owing === '0').length
		};
	}

	const handleChecks: Fn<void, Set<number>> = x => {
		checkedIDs = x;
		checkedSize = x.size;
	};

	const markAsPaid: MouseEventHandler<HTMLButtonElement> = () => {
		if (!checkedSize) return;
		if (!confirm('Confirm mark selected as paid')) return;
		console.log('>> mark as paid', checkedIDs);
	};

	const yearChange: ChangeEventHandler<HTMLSelectElement> = ({ currentTarget }) => {
		console.log('>> db', currentTarget.value);
	};

	const genExcel = () => {
		const xls = new myExcelXML(list);
		xls.downLoad();
	};

	const refresh = () => {
		console.log('>> refresh');
	};
</script>

<section id="form" style="display: none;">
	<form>
		<!-- svelte-ignore a11y_autofocus -->
		<!-- biome-ignore lint/a11y/noAutofocus: allow autofocus -->
		<input type="password" name="pass" id="pass" placeholder="Password" required autofocus><br>
	</form>
</section>
<div class="wrapper" style="display: inline-block;">
	<section class="top-bar" data-members="{stats.total} members ({stats.numAdults} : {stats.numJuniors})">
		<button id="refresh" type="button" title="refresh data" onclick={refresh}>&#8634;</button>
		<button
			id="excel"
			type="button"
			class="icon"
			title="generate Excel spreadsheet"
			onclick={genExcel}
			disabled={!listCount}
		>
			<span>Excel </span>
			<img src={iconExcel} alt="excel" aria-hidden="true">
		</button>
		<form id="db" style="display: contents;">
			<select
				name="db"
				id="year"
				style="float: right; margin-right: 14px; box-shadow: 0 0 1px gray;"
				onchange={yearChange}
			>
				<option value="reg2026">2026</option>
				<option value="reg2025">2025</option>
				<option value="reg2024">2024</option>
				<option value="registration">2023</option>
			</select>
			<input type="hidden" name="pass" id="pass2">
		</form>
	</section>
	<section id="table">
		<Table {...list} onCheckChange={handleChecks} />
	</section>
	<section id="numbers"><StatsComponent {...stats} /></section>
	<button id="is_paid" type="button" disabled={!checkedSize} onclick={markAsPaid}>Mark as Paid</button
	><span class="selected">{checkedSize}</span>
</div>

<style lang="scss">
	:global(div:has(> .wrapper)) {
		display: flex;
		max-width: unset;
	}

	button,
	input,
	select {
		font-family: inherit;
		font-weight: 500;
		font-size: 1.6rem;
		padding: 2px 16px;
		margin: 0 4px 8px 0;
		border: none;
		user-select: none;
	}

	button {
		border-radius: 8px;
		border: white groove 2px;

		&:not(:disabled) {
			cursor: pointer;

			&:hover {
				background-color: white;
			}
		}
		&#excel img {
			max-width: 26px;
			float: right;
			margin-left: 6px;
			pointer-events: none;
		}
		&#excel.icon {
			--shadow: drop-shadow(0 1px 1px white);

			padding-inline: 9px;
			border: none;
			background: none;
			filter: var(--shadow);

			span {
				display: none;
			}
			&:hover {
				filter: drop-shadow(0 1px 1px #fff9) drop-shadow(0 0px 2px #00640099);
			}
			&:disabled {
				filter: var(--shadow) grayscale(1);
			}
		}
		&#is_paid {
			padding-block: 8px;
		}

		&#is_paid.hide,
		&#is_paid.hide + span.selected {
			display: none;
		}
	}

	input:not([type="button"], [type="hidden"], [type="checkbox"], [type="radio"]) {
		min-width: 219px;
	}

	section#form {
		margin: 5em auto;
		text-align: center;
		form {
			text-align: left;
			display: inline-block;
			&.filled::after {
				content: 'Press "Enter" ...';
				font-size: small;
				display: block;
				color: #666;
			}
		}
		& ~ * {
			display: none;
		}
	}

	section#table {
		overflow-x: auto;
		margin-bottom: 1em;
		padding: 0 4px 4px;
	}

	section.top-bar {
		background: linear-gradient(0deg, transparent, #eee);
		padding: 1em 2em 0;
		border-radius: 30px 30px 0 0;
		box-shadow: #aaa 0 2px 2px inset;
		margin-bottom: 2em;

		&::before {
			content: attr(data-members);
			font-size: x-large;
		}
		button {
			float: right;
			max-height: 41px;

			&#refresh {
				margin-inline: 1px -9px;
				border: none;
				padding: 0;
				background: none;
				font-size: 2.8rem;
				color: darkgreen;
				text-shadow: 0 1px 0 #fff;
				transform-origin: center 21px;
				-moz-transform-origin: center 22px;
				padding-inline: 9px;
				border-radius: 50%;
				line-height: 20pt;

				&:hover {
					text-shadow:
						0 1px 0 #ffffff99,
						0 0 5px darkgreen;
				}
				&:disabled {
					filter: grayscale(1);
					opacity: 0.5;
					animation: rotate_me 0.8s linear infinite;
				}
			}
		}
	}

	@keyframes rotate_me {
		from {
			rotate: 360deg;
		}
		to {
			rotate: 0deg;
		}
	}

	div.wrapper {
		display: inline-block;
		margin-inline: auto;
		overflow: hidden;
	}

	span.selected {
		color: gray;
		font-size: small;
		margin-left: 1em;
		user-select: none;

		&::after {
			content: " selected";
		}
	}

	section#numbers {
		float: right;
	}
</style>
