<script>
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	let intervalTimer;
	let { refreshInterval, tick, timerElapsed } = $props();
	let countdown = refreshInterval;

	onMount(async () => {
		if (browser) {
			intervalTimer = setInterval(async () => {
				let now = new Date();
				countdown -= 1;

				tick(countdown, now);

				// When the counter reaches zero, fetch new departures and reset the counter
				if (countdown <= 0) {
					countdown = refreshInterval;
					timerElapsed();
				}
			}, 1000);
		}
	});

	onDestroy(() => {
		clearInterval(intervalTimer);
	});
</script>
