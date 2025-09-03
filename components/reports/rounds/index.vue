<script setup lang="ts">
//import utils
import { RoundsReportEnum } from "../Types";
import { downloadCSVData } from '../Utils';

//import reports
import Rounds from './main.vue';
import Transactions from "./transactions.vue";

//models
const route = useRoute();
const router = useRouter();
const currentReport = ref<RoundsReportEnum>(route.query.report as any || RoundsReportEnum.ROUNDS);

//watchers
watch(route, () => {
	if (route.query.report) {
		currentReport.value = route.query.report as any;
	} else {
		currentReport.value = RoundsReportEnum.ROUNDS;
	}
})

//mounted
onMounted(() => {
	if (route.query.report) {
		currentReport.value = route.query.report as any;
	}
})

//methods
const changeReport = (_params: any) => {
	console.log('change report', _params);
	router.replace({ name: "reports-rounds", query: _params });
}
</script>

<template>
	<!-- REPORTS LOGIC -->
	<rounds @rounds:change-report="changeReport" @players:download="downloadCSVData"
		v-if="currentReport === RoundsReportEnum.ROUNDS" />
	<transactions @rounds:change-report="changeReport" @players:download="downloadCSVData"
		v-if="currentReport === RoundsReportEnum.TRANSACTIONS" />
	<!-- /REPORTS LOGIC -->
</template>
