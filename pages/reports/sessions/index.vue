<script setup lang="ts">
	import { SESSIONS_BREADCRUMBS } from '~/components/reports/Utils';	
	import SessionsReport from '~/components/reports/sessions/index.vue';

	useSeoMeta({
		title: 'Reports :: Sessions',
		ogTitle: 'Reports :: Sessions',
	})
	definePageMeta({
		middleware: 'auth'
	})
</script>
<template>
	<CommonBreadcrumb title="Sessions" :items="SESSIONS_BREADCRUMBS" />
	<SessionsReport />
</template>