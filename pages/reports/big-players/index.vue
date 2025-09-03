<script setup lang="ts">
import { BIG_PLAYERS_BRANDCRUMBS } from '~/components/reports/Utils';
import BigPlayersReport from '~/components/reports/big-players/index.vue';

useSeoMeta({
	title: 'Reports :: Big Players',
	ogTitle: 'Reports :: Big Players',
})
definePageMeta({
	middleware: 'auth'
})
</script>
<template>
	<CommonBreadcrumb title="Big Players" :items="BIG_PLAYERS_BRANDCRUMBS" />
	<BigPlayersReport />
</template>