<script setup lang="ts"> 
import { DASHBOARD_BREADCRUMBS } from '~/components/reports/Utils';	
import ReportsDashboard from '~/components/reports/dashboard/index.vue';

useSeoMeta({
  title: 'Reports :: Dashboard',
  ogTitle: 'Reports :: Dashboard',
})

definePageMeta({
	middleware: 'auth'
})
</script>

<template>
 	<CommonBreadcrumb title="Dashboard" :items="DASHBOARD_BREADCRUMBS" />
	<ReportsDashboard />
</template>
