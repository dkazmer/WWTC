<script lang="ts">
	import type { ChangeEventHandler, MouseEventHandler } from 'svelte/elements';
	import type { Age, Gender, List } from './index';

	let tbody: HTMLElement;

	// biome-ignore format: compact
	const headings = [
		'id', 'name', 'email', 'phone', 'address', 'age group', 'gender', 'date', 'type', 'for', 'owing', 'paid'
	];

	const checkedIDs = new Set<number>();
	const triggerEvent = (box: HTMLInputElement) => box?.dispatchEvent(new Event('change', { bubbles: true }));
	const { onCheckChange, ...list }: Props = $props();

	function getGender(x: Gender) {
		// biome-ignore format: compact
		switch (x) {
			case 'm': return 'male';
			case 'f': return 'female';
			default: return 'other';
		}
	}

	const setCheck: MouseEventHandler<HTMLTableRowElement> = ({ currentTarget, target }) => {
		if ((target as HTMLElement)?.tagName === 'INPUT') return;
		const box = currentTarget?.querySelector<HTMLInputElement>('input[type="checkbox"]');
		if (box) box.checked = !box.checked;
		box && triggerEvent(box);
	};

	const checkChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget: box }) => {
		checkedIDs[box.checked ? 'add' : 'delete'](parseInt(box.name, 10));
		onCheckChange?.(checkedIDs);
	};

	const checkAll: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		const checks = tbody.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

		checks.forEach(c => {
			c.checked = currentTarget.checked;
			triggerEvent(c);
		});
	};

	type Props = {
		onCheckChange?: Fn<void, Set<number>>;
	} & List;
</script>

<!-- <script module>
	export type Gender = 'm' | 'f' | 'o';
	export type Age = 'a' | 'j';
	export type List = ({ [K in ListKeys]: string } & { gender: Gender; ageGroup: Age; })[]

	// biome-ignore format: compact
	type ListKeys = 'id' | 'firstName' | 'lastName' | 'email' | 'phone' | 'phone_sec' | 'address' | 'postal'
		| 'date' | 'lessons' | 'season' | 'type' | 'bType' | 'numApplicants' | 'owing' | 'paid';
</script> -->

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
		{#each list as { id, firstName, lastName, email, phone, phone_sec, address, postal, date, gender, ageGroup, season, type, bType, owing, paid }}
			<tr onclick={owing === '0' ? null : setCheck}>
				<td>
					{#if owing !== '0'}
						<input type="checkbox" name={id} {id} data-ow={owing} onchange={checkChange}>
					{/if}
				</td>
				<td>{id}</td>
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
				<td style:color={owing === '0' ? 'darkgreen' : 'darkgrey'}>{paid ? `$${paid}` : '/'}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
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

	:is(th, tbody td):nth-child(9n + 2) {
		text-align: right;
		display: none;
	}
</style>
