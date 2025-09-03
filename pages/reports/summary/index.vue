<script setup lang="ts">
	import { SUMMARY_BREADCRUMBS } from '~/components/reports/Utils';	
	import SummaryReport from '~/components/reports/summary/index.vue';

	useSeoMeta({
		title: 'Reports :: Summary',
		ogTitle: 'Reports :: Summary', 
	})

	definePageMeta({
    middleware: 'auth'
	})
</script>
<template>
	<CommonBreadcrumb title="Summary" :items="SUMMARY_BREADCRUMBS" />
	<SummaryReport />
</template>