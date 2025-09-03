<script setup lang="ts">
	import { INVOICES_BREADCRUMBS } from '~/components/reports/Utils';	
	import InvoicesReport from '~/components/invoices/index.vue';

	useSeoMeta({
		title: 'Reports :: Invoices',
		ogTitle: 'Reports :: Invoices',
	})
</script>
<template>
	<CommonBreadcrumb title="Invoices" :items="INVOICES_BREADCRUMBS" />
	<InvoicesReport />
</template>