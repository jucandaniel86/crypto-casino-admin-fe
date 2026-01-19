<script setup lang="ts">
import { APP_BREADCRUMBS } from "~/app/breadcrumbs";
</script>

<template>
  <SharedBreadcrumb :title="'Dashboard'" :items="APP_BREADCRUMBS.STATS_GAMES" />
  <StatsGames />
</template>
