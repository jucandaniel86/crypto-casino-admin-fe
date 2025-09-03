<script setup lang="ts">
import { CURRENCIES_BREADCRUMBS } from '~/components/users/Utils';
import CurrenciesList from '~/components/currencies/index.vue';

useSeoMeta({
	title: 'Currencies',
	ogTitle: 'Currencies',
})

definePageMeta({
	middleware: 'auth'
})
</script>
<template>
	<CommonBreadcrumb title="Currencies" :items="CURRENCIES_BREADCRUMBS" />
	<CurrenciesList />
</template>