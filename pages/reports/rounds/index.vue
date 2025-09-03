<script setup lang="ts">
import { PLAYERS_BRANDCRUMBS } from '~/components/reports/Utils';
import PlayersReport from '~/components/reports/rounds/index.vue';

useSeoMeta({
	title: 'Reports :: Player Rounds',
	ogTitle: 'Reports :: Player Rounds',
})
definePageMeta({
	middleware: 'auth'
})
</script>
<template>
	<CommonBreadcrumb title="Player Rounds" :items="PLAYERS_BRANDCRUMBS" />
	<PlayersReport />
</template>