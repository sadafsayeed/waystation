<script>
	import { PUBLIC_OBA_LOGO_URL, PUBLIC_OBA_REGION_NAME } from '$env/static/public';
	import Header from '$components/navigation/header.svelte';
	import Footer from '$components/navigation/footer.svelte';
	import Countdown from '$components/countdown.svelte';
	import DepartureList from '$components/departures/list.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	const stop = data.stopData.entry;

	let now = $state(new Date());
	let countdown = $state(0);
	let departureList;

	async function timerElapsed() {
		await departureList.fetchDepartures();
	}

	function tick(counter, date) {
		now = date;
		countdown = counter;
	}

	onMount(async () => {
		await departureList.fetchDepartures();
	});
</script>

<Countdown refreshInterval={30} {tick} {timerElapsed} />

<div class="flex h-screen flex-col">
	<Header
		title={PUBLIC_OBA_REGION_NAME}
		imageUrl={PUBLIC_OBA_LOGO_URL}
		currentDate={now}
		{countdown}
	/>

	<DepartureList bind:this={departureList} stopID={data.stopID} />

	<Footer {stop} />
</div>
