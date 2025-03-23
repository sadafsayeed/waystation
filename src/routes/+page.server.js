import oba, { handleOBAResponse } from '$lib/obaSdk.js';

export async function load() {
	const agencies = await oba.agenciesWithCoverage.list();
	const agenciesBody = await handleOBAResponse(agencies, 'agencies').json();

	const agencyRefs = agenciesBody.data.references.agencies;

	return {
		agencies: agencyRefs
	};
}
