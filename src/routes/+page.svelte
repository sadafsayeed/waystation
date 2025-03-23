<script>
	let { data } = $props();
	let agencies = data.agencies;
</script>

<main>
	<table>
		<thead>
			<tr>
				<th> ID </th>
				<th> Name </th>
			</tr>
		</thead>
		<tbody>
			{#each agencies as agency (agency.id)}
				<tr>
					<td>
						{agency.id}
					</td>
					<td>
						<a href="/agencies/{agency.id}" class="text-blue-600">{agency.name}</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
