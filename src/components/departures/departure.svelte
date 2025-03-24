<script>
	import { formatArrivalStatus, formatRouteStatus } from '$lib/formatters';
	const { dep } = $props();

	const status = formatArrivalStatus(dep.predictedDepartureTime, dep.scheduledDepartureTime);
	const routeStatus = formatRouteStatus(dep.predictedDepartureTime, dep.scheduledDepartureTime);
</script>

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
			<div class="mx-3 h-9 border-l-3 border-gray-400"></div>
		{:else if status.minutes !== null}
			<div class="rounded-sm {routeStatus.color} px-2 py-2 text-center text-white">
				{routeStatus.status}
			</div>
			<div class="mx-3 h-9 border-l-3 border-gray-400"></div>

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
			<div class="mx-3 h-9 border-l-3 border-gray-400"></div>
		{/if}
		<div>
			<span class="text-4xl font-bold text-black">{status.displayTime}</span>
		</div>
	</div>
</div>
