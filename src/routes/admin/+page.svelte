<script lang="ts">
	import { onMount } from 'svelte';
	import type { ChangeEventHandler, MouseEventHandler } from 'svelte/elements';
	import iconExcel from '$lib/assets/excel_icon.svg';
	import { createAPIMethod } from '$lib/createAPI';
	import StatsComponent from './stats.svelte';

	// biome-ignore format: compact
	const headings = [
		'id', 'name', 'email', 'phone', 'address', 'age group', 'gender', 'date', 'type', 'for', 'owing', 'paid'
	];

	let tbody: HTMLElement;
	let list: List = [];
	let stats: Stats = {
		total: 0,
		numAdults: 0,
		numJuniors: 0,
		paidAdults: 0,
		paidJuniors: 0
	};

	const get = createAPIMethod<{ year: string }, List>({
		url: './data.json',
		method: 'GET'
	});

	onMount(async () => {
		list = await get({ year: '2026' });
		stats = setStats(list);
	});

	function getGender(x: Gender) {
		switch (x) {
			case 'm':
				return 'male';
			case 'f':
				return 'female';
			default:
				return 'other';
		}
	}

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

	const setCheck: MouseEventHandler<HTMLTableRowElement> = ({ currentTarget }) => {
		const box = currentTarget?.querySelector<HTMLInputElement>('input[type="checkbox"]');
		if (!box) return;
		box.checked = !box.checked;
	};

	const checkAll: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		const checks = tbody.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
		checks.forEach(c => {
			c.checked = currentTarget.checked;
		});
	};

	// use Zod here?
	// biome-ignore format: compact
	type ListKeys = 'id' | 'firstName' | 'lastName' | 'email' | 'phone' | 'phone_sec' | 'address' | 'postal'
		| 'date' | 'lessons' | 'season' | 'type' | 'bType' | 'numApplicants' | 'owing' | 'paid';

	type Stats = { [K in 'total' | 'numAdults' | 'numJuniors' | 'paidAdults' | 'paidJuniors']: number };

	type List = ({ [K in ListKeys]: string } & { gender: Gender } & { ageGroup: Age })[];
	type Gender = 'm' | 'f' | 'o';
	type Age = 'a' | 'j';
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
		<button id="refresh" type="button" title="refresh data">&#8634;</button>
		<button id="excel" type="button" class="icon" title="generate Excel spreadsheet">
			<span>Excel </span>
			<img src={iconExcel} alt="excel" aria-hidden="true">
		</button>
		<form id="db" style="display: contents;">
			<select name="db" id="year" style="float: right; margin-right: 14px; box-shadow: 0 0 1px gray;">
				<option value="reg2026">2026</option>
				<option value="reg2025">2025</option>
				<option value="reg2024">2024</option>
				<option value="registration">2023</option>
			</select>
			<input type="hidden" name="pass" id="pass2">
		</form>
	</section>
	<section id="table">
		<table>
			<thead>
				<tr>
					<th><input type="checkbox" onchange={checkAll}></th>
					{#each headings as h}
						<th>{h}</th>
					{/each}
				</tr>
			</thead>
			<tbody bind:this={tbody}>
				{#each list as { id, firstName, lastName, email, phone, phone_sec, address, postal, date, gender, ageGroup, lessons, season, type, bType, numApplicants, owing, paid }}
					<tr onclick={owing === '0' ? null : setCheck}>
						<td>
							{#if owing !== '0'}
								<input type="checkbox" name={id} {id} data-ow={owing}>
							{/if}
						</td>
						<td>${id}</td>
						<td style="font-weight:600">{firstName} {lastName}</td>
						<td><a href="mailto:{email}">{email}</a></td>
						<td>{phone}<br>{phone_sec}</td>
						<td>{address.replaceAll(/\s?,\s?/g, ', ')} {postal || ''}</td>
						<td>{ageGroup === 'a' ? 'adult' : 'junior'}</td>
						<td>{getGender(gender)}</td>
						<td>{date}</td>
						<td>{type}, {bType}</td>
						<td>{season}</td>
						<td style:color={owing !== '0' ? 'darkred' : 'darkgrey'}>${owing}</td>
						<!-- <td${owing !== '0' ? ' style="color:darkred"' : ' style="color:darkgrey"'}>$${owing}</td> -->
						<td style:color={owing === '0' ? 'darkgreen' : 'darkgrey'}>{paid ? `$${paid}` : '/'}</td>
						<!-- <td${owing === '0' ? ' style="color:darkgreen"' : ' style="color:darkgrey"'}>${paid ? `$${paid}` : '/'}</td></tr> -->
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
	<section id="numbers"><StatsComponent {...stats} /></section>
	<button id="is_paid" type="button" disabled>Mark as Paid</button><span class="selected">0</span>
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
			padding-inline: 9px;
			border: none;
			background: none;
			filter: drop-shadow(0px 1px 1px white);

			span {
				display: none;
			}
			&:hover {
				filter: drop-shadow(0px 1px 1px #fff9) drop-shadow(0px 0px 2px #00640099);
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

	table {
		font-size: small;
		margin-inline: auto;
		th {
			text-align: left;
		}
		td,
		th {
			vertical-align: baseline;
			padding-inline: 1em;
			white-space: nowrap;
		}
		tbody tr {
			&:nth-child(odd) {
				background-color: #e9e9e9;
			}
			&:has(input:checked) {
				background-color: #6836;

				&:hover {
					background-color: #6839;
				}
			}
			&:hover {
				background-color: #f3f3f3;
			}
			&:has(input[type="checkbox"]) {
				cursor: pointer;
				outline-offset: 4px;

				&:hover {
					outline: #683 dashed 2px;
				}
			}
		}

		td:has(input[type="checkbox"]) {
			font-size: 0;
			line-height: 0;
			vertical-align: middle;
			text-align: center;

			input[type="checkbox"] {
				margin: 0;
			}
		}
	}
	section#table :is(th, tbody td):nth-child(9n + 2) {
		text-align: right;
		display: none;
	}

	span.selected {
		color: gray;
		font-size: small;
		margin-left: 1em;
		user-select: none;

		&::before {
			content: "(";
		}
		&::after {
			content: " selected)";
		}
	}

	section#numbers {
		float: right;
	}
</style>
