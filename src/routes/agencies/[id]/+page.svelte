<script>
	let { data } = $props();
	let stopIDs = data.stopIDs;
</script>

<h1>hello world</h1>

<ul class="ml-4 list-inside list-disc">
	{#each stopIDs as stopID (stopID)}
		<li><a href="/stops/{stopID}" class="text-blue-600">{stopID}</a></li>
	{/each}
</ul>
