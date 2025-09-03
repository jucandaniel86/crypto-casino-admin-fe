<script setup lang="ts">
//import utils
import { PlayersReportEnum } from "../Types";
import { downloadCSVData } from '../Utils';

//import reports
import Games from "./games.vue";
import Players from "./main.vue";
import Session from "./sessions.vue";
import Transactions from "./transactions.vue";

//models
const route = useRoute();
const router = useRouter();
const currentReport = ref<PlayersReportEnum>(route.query.report as any || PlayersReportEnum.PLAYERS);

//watchers
watch(route, () => {  
	if (route.query.report) {
		currentReport.value = route.query.report as any;
	} else {
		currentReport.value = PlayersReportEnum.PLAYERS;
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
	router.push({ name: "reports-players", query: _params });
}
</script>

<template>
	<!-- REPORTS LOGIC -->
	<players
		@players:change-report="changeReport"
		@players:download="downloadCSVData"
		v-if="currentReport === PlayersReportEnum.PLAYERS"
	/>
	<session
		@players:change-report="changeReport"
		@players:download="downloadCSVData"
		v-if="currentReport === PlayersReportEnum.SESSION"
	/>
	<games
		@players:change-report="changeReport"
		@players:download="downloadCSVData"
		v-if="currentReport === PlayersReportEnum.GAMES"
	/>
	<transactions
		@players:change-report="changeReport"
		@players:download="downloadCSVData"
		v-if="currentReport === PlayersReportEnum.TRANSACTIONS"
	/>
	<!-- /REPORTS LOGIC -->
</template>
