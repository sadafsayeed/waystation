<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { PUBLIC_OBA_LOGO_URL, PUBLIC_OBA_REGION_NAME } from '$env/static/public';

	import Header from '$components/navigation/header.svelte';
	import Footer from '$components/navigation/footer.svelte';

	let arrivalsAndDepartures = $state([]);
	let loading = $state(true);
	let currentDateTime = $state(new Date());

	// Format the current date and time
	function formatCurrentDateTime(date) {
		const options = {
			weekday: 'long',
			month: 'long',
			day: 'numeric'
		};
		return date.toLocaleDateString('en-US', options);
	}

	// Format the current time
	function formatCurrentTime(date) {
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true
		});
	}

	// Get status for arrival or departure
	function getArrivalStatus(predictedTime, scheduledTime) {
		const now = new Date();
		const predicted = new Date(predictedTime);

		const predictedDiff = Math.floor((predicted - now) / 60000);

		if (predictedTime === 0) {
			return {
				status: 'Scheduled',
				text: '',
				color: 'text-gray-500',
				minutes: null,
				displayTime: formatTime(scheduledTime)
			};
		} else if (predictedDiff < -2) {
			// If the bus left more than 2 minutes ago, it's already gone
			return null;
		} else if (predictedDiff <= 0) {
			// If it's within 2 minutes of departure, show "Departing now" with time
			return {
				status: 'Departing',
				text: 'Departing now',
				color: 'text-red-500',
				minutes: null,
				displayTime: formatTime(predictedTime)
			};
		} else if (predictedDiff <= 20) {
			return {
				status: 'Arriving',
				text: 'Arriving in',
				color: 'text-blue-500',
				minutes: predictedDiff,
				displayTime: formatTime(predictedTime)
			};
		} else {
			return {
				status: 'Scheduled',
				text: '',
				color: 'text-gray-500',
				minutes: null,
				displayTime: formatTime(scheduledTime)
			};
		}
	}

	// Format time for display
	function formatTime(time) {
		const date = new Date(time);
		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	}

	// Fetch departures for the stop
	async function fetchDepartures() {
		loading = true;
		try {
			const response = await fetch(`/api/oba/departures`);
			if (!response.ok) throw new Error('Failed to fetch departures');
			arrivalsAndDepartures = await response.json();
		} catch (error) {
			console.error('Error fetching departures:', error);
			arrivalsAndDepartures = [];
		} finally {
			loading = false;
		}
	}

	// Update current time every second
	function updateTime() {
		currentDateTime = new Date();
		setTimeout(updateTime, 1000);
	}

	onMount(async () => {
		if (browser) {
			await fetchDepartures();
			updateTime();

			// Refresh departures every 30 seconds
			const interval = setInterval(fetchDepartures, 30000);
			return () => clearInterval(interval);
		}
	});
</script>

<div class="flex h-screen flex-col">
	<Header title={PUBLIC_OBA_REGION_NAME} imageUrl={PUBLIC_OBA_LOGO_URL}>
		<div slot="right" class="text-right">
			<div class="text-sm text-gray-600">{formatCurrentDateTime(currentDateTime)}</div>
			<div class="text-xl font-bold">{formatCurrentTime(currentDateTime)}</div>
		</div>
	</Header>

	<div class="flex-1 bg-gray-200 text-black">
		{#if loading}
			<div class="flex h-32 items-center justify-center">
				<p class="text-xl text-gray-600">Loading departures...</p>
			</div>
		{:else if arrivalsAndDepartures.length > 0}
			<div class="flex flex-col divide-y divide-gray-300">
				{#each arrivalsAndDepartures as dep (dep.tripId)}
					{#if getArrivalStatus(dep.predictedDepartureTime, dep.scheduledDepartureTime)}
						{@const status = getArrivalStatus(
							dep.predictedDepartureTime,
							dep.scheduledDepartureTime
						)}
						<div class="flex items-center p-5">
							<div class="mr-5 rounded-lg bg-gray-800 p-4 text-2xl font-bold text-white">
								{dep.routeShortName}
							</div>

							<div class="flex-1 text-xl">
								{dep.tripHeadsign}
							</div>

							<div class="flex items-center">
								{#if status.status === 'Departing'}
									<div class="mr-3 flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="mr-2 h-6 w-6 {status.color}"
											viewBox="0 0 20 20"
											fill="currentColor"
											transform="rotate(135)"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/>
										</svg>
										<span class="text-xl font-bold {status.color}">{status.text}</span>
									</div>
									<div class="mx-3 text-4xl text-gray-400">|</div>
								{:else if status.minutes !== null}
									<div class="mr-3 flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="mr-2 h-6 w-6 {status.color}"
											viewBox="0 0 20 20"
											fill="currentColor"
											transform="rotate(315)"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/>
										</svg>
										<span class="text-lg {status.color}">{status.text}</span>
										<span class="mx-2 text-4xl font-bold {status.color}">{status.minutes}</span>
										<span class="text-lg {status.color}">min</span>
									</div>
									<div class="mx-3 text-4xl text-gray-400">|</div>
								{/if}
								<div>
									<span class="text-4xl font-bold text-black">{status.displayTime}</span>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{:else}
			<div class="flex h-32 items-center justify-center">
				<p class="text-xl text-gray-600">No departures available</p>
			</div>
		{/if}
	</div>

	<Footer />
</div>
