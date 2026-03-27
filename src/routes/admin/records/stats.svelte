<script lang="ts">
	const stats = $props();
</script>

<fieldset>
	<legend>Stats</legend>
	<table>
		<thead>
			<tr>
				<th>&nbsp;</th>
				<th>total</th>
				<th>adults</th>
				<th>juniors</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>count</th>
				<td>{stats.total}</td>
				<td>{stats.numAdults}</td>
				<td>{stats.numJuniors}</td>
			</tr>
			<tr>
				<th>paid</th>
				<td>{stats.paidAdults + stats.paidJuniors}</td>
				<td>{stats.paidAdults}</td>
				<td>{stats.paidJuniors}</td>
			</tr>
		</tbody>
	</table>
</fieldset>

<style lang="scss">
	fieldset {
		border: white 2px groove;
		border-radius: 12px;
		user-select: none;
		padding-bottom: 20px;

		legend {
			color: #999;
			text-shadow: 0 1px 0 white;
		}
		tbody tr {
			font-size: 2rem;
			font-weight: 700;
			background-color: unset !important;

			td {
				text-align: left !important;
				padding: 0;
			}
		}
		th {
			font-weight: unset;
			text-align: left !important;
			padding-inline: 0 4em;
			min-width: 4em;
		}
		tr th:first-child {
			padding-left: 4em;
			font-size: 1.3rem;
			font-weight: 400;
			min-width: unset;
		}
	}
</style>
