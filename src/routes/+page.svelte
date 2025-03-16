<script>
	import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let arrivalsAndDepartures = $state([]);

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

    onMount(async () => {
        if (browser) {
            const response = await fetch('/api/oba/departures');
            arrivalsAndDepartures = await response.json();
        }
    });
</script>

<h1>Waystation</h1>

{#if arrivalsAndDepartures.length > 0}
    <h2>Arrivals and Departures: {arrivalsAndDepartures.length}</h2>
    <div class='flex flex-col gap-y-2'>
        {#each arrivalsAndDepartures as dep}
            <div class='flex bg-red-100 gap-x-4 px-2'>
                <div>
                    <h2>{dep.routeShortName}</h2>
                </div>
                <div class='flex-1'>
                    {dep.tripHeadsign}
                </div>
                <div>
                    {getArrivalStatus(dep.predictedDepartureTime, dep.scheduledDepartureTime)}min
                </div>
            </div>
        {/each}
    </div>
{:else}
    <p>Loading...</p>
{/if}