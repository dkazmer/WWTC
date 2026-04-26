<script lang="ts">
	import type { ChangeEventHandler, MouseEventHandler } from 'svelte/elements';
	import type { Pairing, TableDB } from '.';

	let tbody: HTMLElement;

	// biome-ignore format: compact
	const headings = [
		'id', 'name', 'email', 'phone', 'address', 'age group', 'gender', 'date', 'type', 'for', 'owing', 'paid'
	];

	const checkedIDs = new Map<string, Pairing>();
	const triggerEvent = (box: HTMLInputElement) => box?.dispatchEvent(new Event('change', { bubbles: true }));
	const { onCheckChange, ...list }: Props = $props();

	function getGender(x: TableDB['gender']) {
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
		checkedIDs[box.checked ? 'set' : 'delete'](box.name, {
			// id: parseInt(box.name, 10),
			// ow: parseInt(box.dataset.ow!, 10)
			id: box.name,
			ow: box.dataset.ow!
		});

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
		onCheckChange?: Fn<void, Map<string, Pairing>>;
	} & TableDB[];
</script>

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
		{#each list as { id, firstName, lastName, email, phone, phoneSec, address, postal, date, gender, ageGroup, season, type, bType, owing, paid }}
			{@const idString = `${id}`}
			<tr onclick={!owing ? null : setCheck}>
				<td>
					{#if owing}
						<input type="checkbox" name={idString} id={idString} data-ow={owing} onchange={checkChange}>
					{/if}
				</td>
				<td>{id}</td>
				<td class="bold">{firstName} {lastName}</td>
				<td><a href="mailto:{email}">{email}</a></td>
				<td>{phone}<br>{phoneSec}</td>
				<td style="white-space: normal;">{address.replaceAll(/\s?,\s?/g, ', ')}{postal ? `, ${postal}` : ''}</td>
				<td>{ageGroup === 'a' ? 'adult' : 'junior'}</td>
				<td>{getGender(gender)}</td>
				<td>{date}</td>
				<td>{type}, {bType}</td>
				<td>{season}</td>
				<td style:color={owing ? 'darkred' : 'darkgrey'}>${owing}</td>
				<!-- <td style:color={!owing ? 'darkgreen' : 'darkgrey'}>${paid}</td> -->
				<td style:color={!owing ? 'darkgreen' : 'darkgrey'}>{paid !== undefined ? `$${paid}` : '/'}</td>
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
			td.bold {
				font-weight: 600
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
