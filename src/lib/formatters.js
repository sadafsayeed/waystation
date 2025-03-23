/**
 * Format time for display
 * @param {Date} date
 */
export function formatTime(date) {
	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit', // Add this line to show seconds
		hour12: true
	});
}

// Get status for arrival or departure
export function formatArrivalStatus(predictedTime, scheduledTime) {
	const now = new Date();
	const predicted = new Date(predictedTime);

	const predictedDiff = Math.floor((predicted - now) / 60000);

	if (predictedTime === 0) {
		return {
			status: 'Scheduled',
			text: '',
			color: 'text-gray-500',
			minutes: null,
			displayTime: formatTime2(scheduledTime)
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
			displayTime: formatTime2(predictedTime)
		};
	} else if (predictedDiff <= 20) {
		return {
			status: 'Arriving',
			text: 'Arriving in',
			color: 'text-blue-500',
			minutes: predictedDiff,
			displayTime: formatTime2(predictedTime)
		};
	} else {
		return {
			status: 'Scheduled',
			text: '',
			color: 'text-gray-500',
			minutes: null,
			displayTime: formatTime2(scheduledTime)
		};
	}
}

/**
 * Format time for display
 * @param {Date} time
 */
export function formatTime2(time) {
	const date = new Date(time);
	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});
}

/**
 * Format date for display
 * @param {Date} date
 */
export function formatDate(date) {
	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	});
}

/**
 * Format the current time for display
 * @param {Date} date
 */
export function formatCurrentTime(date) {
	return date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true
	});
}
