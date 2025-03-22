<script>
	import { formatDate, formatTime } from '$lib/formatters.js';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	let { title, imageUrl } = $props();

	let currentTime = new Date();
	let currentDate = new Date();
	let countdown = $state(30); // Initialize countdown to 30 seconds

	let intervalTimer, refreshTimer;

	function startClock() {
		intervalTimer = setInterval(() => {
			currentTime = new Date();
			currentDate = new Date();
			countdown = countdown > 0 ? countdown - 1 : 30; // Reset countdown after refresh
		}, 1000);
	}

	function startAutoRefresh() {
		refreshTimer = setInterval(() => {
			window.location.reload();
		}, 30000); // Refresh every 30 seconds
	}

	onMount(() => {
		if (browser) {
			startClock();
			startAutoRefresh();
		}
	});

	onDestroy(() => {
		clearInterval(intervalTimer);
		clearInterval(refreshTimer);
	});
</script>

<div class="flex gap-x-4 p-2">
	<div class="flex w-full justify-between gap-4 px-2 py-2 md:w-auto">
		<div class="flex items-center justify-center gap-x-2">
			<a href="/" class="block">
				<img src={imageUrl} alt="Homepage" class="h-10 rounded-sm" />
			</a>
			<a href="/" class="block text-xl font-extrabold">
				{title}
			</a>
		</div>
	</div>
	<div class="flex-1 text-right">
		<div class="text-sm">{formatDate(currentDate)}</div>
		<div class="text-3xl font-bold">{formatTime(currentTime)}</div>
		<div class="text-sm text-gray-500">Refreshing in {countdown}s</div>
	</div>
</div>
