// @vitest-environment jsdom

import { render } from '@testing-library/svelte';
import { beforeEach, expect, test, vi } from 'vitest';
import Departure from './departure.svelte';

beforeEach(() => {
	vi.useFakeTimers();
});

test('renders successfully with departure data', async () => {
	const div = document.createElement('div');
	const dep = {
		routeShortName: '10',
		tripHeadsign: 'Downtown',
		predictedDepartureTime: new Date().getTime(),
		scheduledDepartureTime: new Date().getTime()
	};

	const status = {
		status: 'Arriving',
		text: 'Arriving in',
		color: 'text-blue-500',
		minutes: 5,
		displayTime: '10:30 AM'
	};

	const routeStatus = {
		status: "ON TIME"
	};

	render(Departure, {
		props: { dep, status, routeStatus },
		target: div
	});

	await vi.runAllTimersAsync();

	expect(div.innerHTML).toContain('10');
	expect(div.innerHTML).toContain('Downtown');
	expect(div.innerHTML).toContain('Arriving in');
	expect(div.innerHTML).toContain('5');
	expect(div.innerHTML).toContain('min');
	expect(div.innerHTML).toContain('10:30 AM');
});

test('renders successfully with "Departing" status', async () => {
	const div = document.createElement('div');
	const dep = {
		routeShortName: 'A12',
		tripHeadsign: 'Downtown Express',
		predictedDepartureTime: new Date().getTime(),
		scheduledDepartureTime: new Date().getTime()
	};

	const status = {
		status: 'Departing',
		text: 'Now',
		color: 'text-green-500',
		minutes: null,
		displayTime: '10:45'
	};

	render(Departure, {
		props: { dep, status },
		target: div
	});

	await vi.runAllTimersAsync();

	expect(div.innerHTML).toContain('A12');
	expect(div.innerHTML).toContain('Downtown Express');
	expect(div.innerHTML).toContain('Now');
	expect(div.innerHTML).toContain('10:45');
});

test('renders successfully with no status or minutes', async () => {
	const div = document.createElement('div');
	const dep = {
		routeShortName: 'C78',
		tripHeadsign: 'Central Station',
		predictedDepartureTime: new Date().getTime(),
		scheduledDepartureTime: new Date().getTime()
	};

	const status = {
		status: 'Delayed',
		text: 'Delayed',
		color: 'text-red-500',
		minutes: null,
		displayTime: '12:30'
	};

	render(Departure, {
		props: { dep, status },
		target: div
	});

	await vi.runAllTimersAsync();

	expect(div.innerHTML).toContain('C78');
	expect(div.innerHTML).toContain('Central Station');
	expect(div.innerHTML).toContain('12:30');
	expect(div.innerHTML).not.toContain('Delayed');
	expect(div.innerHTML).not.toContain('min');
});
