<script setup lang="ts">
	import { GamesReportEnum } from '../Types';
	import { downloadCSVData } from '../Utils';
	import { useRoute, useRouter } from 'vue-router';
	import { useGamesReports } from './useGamesReports';

	//import reports
	import Games from "./main.vue";
	import Players from "./players.vue";
	import Sessions from "./sessions.vue";

	const route = useRoute();
	const router = useRouter();
	const currentReport = ref<GamesReportEnum>(GamesReportEnum.GAMES);

	const { games, gamesLoading, players, playersLoading, sessions, sessionsLoading, 
		getGamesReport, getPlayersReport, getSessionsReport } = useGamesReports();

	const changeReport = (_params: any) => {
		router.push({ name: "reports-games", query: _params });
	}

	onMounted(() => {  
		if (route.query.report) {
			currentReport.value = route.query.report as any;
		} 
	})
 
	//@ts-ignore
	watch(route, () => {  
 		if (route.query.report) {
			currentReport.value = route.query.report as any;
		} else {
			currentReport.value = GamesReportEnum.GAMES;
		}
	})
 
</script>
<template>
 <!-- REPORTS LOGIC -->
 <games
	:loading="gamesLoading"
	:items="games"
	@games:change-report="changeReport"
	@games:download="downloadCSVData"
	@games:reload-list="getGamesReport"
	v-if="currentReport === GamesReportEnum.GAMES"
/>
<players
	:loading="playersLoading"
	:items="players"
	@games:reload-players-list="getPlayersReport"
	v-if="currentReport === GamesReportEnum.PLAYERS"
/>
<sessions
	:loading="sessionsLoading"
	:items="sessions"
	@games:reload-sessions-list="getSessionsReport"
	v-if="currentReport === GamesReportEnum.SESSION"
/>
<!-- /REPORTS LOGIC -->
</template>