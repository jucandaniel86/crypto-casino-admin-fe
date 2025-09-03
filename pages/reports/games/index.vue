<script setup lang="ts">
	import { GAMES_BREADCRUMBS } from '~/components/reports/Utils';	
	import GamesReport from '~/components/reports/games/index.vue';

	useSeoMeta({
		title: 'Reports :: Games',
		ogTitle: 'Reports :: Games',
	})

	definePageMeta({
		middleware: 'auth'
	})
</script>
<template>
	<CommonBreadcrumb title="Games" :items="GAMES_BREADCRUMBS" />
	<GamesReport />
</template>