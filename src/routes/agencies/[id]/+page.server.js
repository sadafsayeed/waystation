import oba, { handleOBAResponse } from '$lib/obaSdk.js';

export async function load({ params }) {
	const response = await oba.stopIdsForAgency.list(params.id);
	const json = await handleOBAResponse(response, 'stop-ids').json();

	return {
		stopIDs: json.data.list
	};
}
