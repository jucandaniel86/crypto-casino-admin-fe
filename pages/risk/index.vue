<script setup lang="ts">
import { APP_BREADCRUMBS } from "~/app/breadcrumbs";

const title = "Risk & Fraud";

useHead({
  title,
});
</script>
<template>
  <SharedBreadcrumb :items="APP_BREADCRUMBS.RISK_SUSPICIOUS" :title="title" />
  <Risk />
</template>
