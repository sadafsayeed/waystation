import oba, { handleOBAResponse } from '$lib/obaSdk.js';

export async function load({ params }) {
	const stopID = params.stopID;

	const stopResponse = await oba.stop.retrieve(stopID);
	const stopBody = await handleOBAResponse(stopResponse, 'stop').json();

	return {
		stopID: params.stopID,
		stopData: stopBody.data
	};
}
