<script setup lang="ts">
import { CLIENTS_BRANDCRUMBS } from '~/components/clients/Utils';
import ClientsList from '~/components/clients/index.vue';

useSeoMeta({
	title: 'Clients',
	ogTitle: 'Clients',
})

definePageMeta({
	middleware: 'auth'
})
</script>
<template>
	<CommonBreadcrumb title="Clients" :items="CLIENTS_BRANDCRUMBS" />
	<ClientsList />
</template>