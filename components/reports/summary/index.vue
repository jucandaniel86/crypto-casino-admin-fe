<script setup lang=ts>
import { useRoute, useRouter } from "vue-router";
import { SummaryReportEnum } from "../Types";
import { downloadCSVData } from '../Utils';
import { useSummaryReport } from "./useSummaryReport";
//import reports
import CurrentReport from "./main.vue";
import Brands from "./brands.vue";
import Games from "./games.vue";
import Players from "./players.vue";

//models 
const currentReport = ref<SummaryReportEnum>(SummaryReportEnum.SUMMARY);
const route = useRoute();
const router = useRouter();

//methods
const { brands, brandsLoading, players, 
	playersLoading, games, gamesLoading,
	getBrandsReport, getPlayersReport, getGamesReport } = useSummaryReport();

//watchers
watch(route, () => {
  if (route.query.report) {
		currentReport.value = route.query.report as SummaryReportEnum;
	} else {
		currentReport.value = SummaryReportEnum.SUMMARY;
	}
})

//mounted
onMounted(() => {
	if (route.query.report) {
		currentReport.value = route.query.report as SummaryReportEnum;
	}
})

//methods
const changeReport = (_params: any) => {
	router.push({ name: "reports-summary", query: _params });
}
</script>

<template>
	<!-- REPORTS LOGIC -->
	<current-report
		@summary:change-report="changeReport"
		@summary:download="downloadCSVData"
		v-if="currentReport === SummaryReportEnum.SUMMARY"
	/>
	<brands
		:loading="brandsLoading"
		:items="brands"
		@summary:reload-brands-list="getBrandsReport"
		@summary:change-report="changeReport"
		@summary:download="downloadCSVData"
		v-if="currentReport === SummaryReportEnum.BRANDS"
	/>
	<games
		:loading="gamesLoading"
		:items="games"
		@summary:reload-games-list="getGamesReport"
		@summary:change-report="changeReport"
		@summary:download="downloadCSVData"
		v-if="currentReport === SummaryReportEnum.GAMES"
	/>
	<players
		:loading="playersLoading"
		:items="players"
		@summary:reload-players-list="getPlayersReport"
		@summary:change-report="changeReport"
		@summary:download="downloadCSVData"
		v-if="currentReport === SummaryReportEnum.PLAYERS"
	/>
	<!-- /REPORTS LOGIC -->
</template>
