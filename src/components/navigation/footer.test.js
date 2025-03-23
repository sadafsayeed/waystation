// @vitest-environment jsdom

import { render } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import Footer from './footer.svelte';

test('renders successfully', async () => {
	const div = document.createElement('div');
	render(Footer, {
		props: { stop: { code: '12345', name: 'Stop Test Example' } },
		target: div
	});

	expect(div.innerHTML).toContain('Waystation by Open Transit Software Foundation');
	expect(div.innerHTML).toContain('Stop Test Example');
});
