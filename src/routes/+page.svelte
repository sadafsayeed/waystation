<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { PUBLIC_OBA_LOGO_URL, PUBLIC_OBA_REGION_NAME } from '$env/static/public';

    let arrivalsAndDepartures = $state([]);
    let stopName = $state("Loading stop information...");
    let stopCode = $state("");

	// TODO: this was copied and pasted from Wayfinder. Unify them.
	function getArrivalStatus(predictedTime, scheduledTime) {
		const now = new Date();
		const predicted = new Date(predictedTime);
		const scheduled = new Date(scheduledTime);

		const predictedDiff = predicted - now;
		const scheduledDiff = scheduled - now;

		if (predictedTime == 0) {
			return Math.abs(Math.floor(scheduledDiff / 60000));
		} else {
			return Math.abs(Math.floor(predictedDiff / 60000));
		}
	}

    async function fetchStopInfo(id) {
        try {
            const response = await fetch(`api/oba/stops`);
            if (!response.ok) throw new Error('Failed to fetch stop information');
            const data = await response.json();
            if (data ) {
                stopName = data.name;
                stopCode = data.code;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error fetching stop information:', error);
            stopName = "Unknown Stop";
            return false;
        }
    }

    onMount(async () => {
        if (browser) {
            const response = await fetch('/api/oba/departures');
            arrivalsAndDepartures = await response.json();

            await fetchStopInfo(stopCode);
        }
    });
</script>

<div class="flex h-screen flex-col bg-red-100">
	<div class="mb-4 flex gap-x-4 bg-slate-50 p-2">
		<div class="flex w-full justify-between gap-4 px-2 py-2 md:w-auto">
			<div class="flex items-center justify-center gap-x-2">
				<a href="/" class="block">
					<img src={PUBLIC_OBA_LOGO_URL} alt="OneBusAway" class="h-10 rounded-sm" />
				</a>
				<a href="/" class="block text-xl font-extrabold">
					{PUBLIC_OBA_REGION_NAME}
				</a>
			</div>
		</div>
		<h2 class="flex-1 self-center text-2xl">Departures</h2>
		<div class="self-center">current time here</div>
	</div>

	{#if arrivalsAndDepartures.length > 0}
		<div class="flex flex-col gap-y-2">
			{#each arrivalsAndDepartures as dep}
				<div class="flex gap-x-4 px-2">
					<div>
						<h2 class="text-5xl">{dep.routeShortName}</h2>
					</div>
					<div class="flex-1 self-center text-xl">
						{dep.tripHeadsign}
					</div>
					<div class="self-center text-2xl">
						{getArrivalStatus(dep.predictedDepartureTime, dep.scheduledDepartureTime)}min
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p>Loading...</p>
	{/if}

    <div class="bg-gray-300 p-3 text-black">
        <div class="flex justify-between items-center">
            <div class="flex items-center">
                <span class="text-sm ml-2">[Code:{stopCode}]</span>
            </div>
            <div class="text-sm">
                Stop No. {stopCode} - {stopName}
            </div>
        </div>
    </div>
</div>
