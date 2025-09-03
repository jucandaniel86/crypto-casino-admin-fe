<script setup lang="ts">
	import { PLAYERS_BRANDCRUMBS } from '~/components/reports/Utils';	
	import PlayersReport from '~/components/reports/players/index.vue';

	useSeoMeta({
		title: 'Reports :: Players',
		ogTitle: 'Reports :: Players',
	})
	definePageMeta({
		middleware: 'auth'
	})
</script>
<template>
	<CommonBreadcrumb title="Players" :items="PLAYERS_BRANDCRUMBS" />
	<PlayersReport />
</template>