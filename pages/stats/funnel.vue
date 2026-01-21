<script setup lang="ts">
import moment from "moment";
import ConversionFunnelCard from "~/components/stats/ConversionFunnelCard.vue";

const currency = ref("PEP");
const from = ref(moment().subtract(7, "days").startOf("day").toISOString());
const to = ref(moment().add(1, "day").startOf("day").toISOString());

const {
  data: funnel,
  refresh,
  status,
} = await useApiUseFetch(
  "/stats/funnel",
  computed(() => ({
    from: from.value,
    to: to.value,
    currency_code: currency.value,
    bets_10_threshold: 10,
    bets_100_threshold: 100,
  })),
);

useHead({
  title: "Conversion funnel",
});
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row class="mb-4 align-center">
      <v-col cols="12" md="6">
        <div class="text-h5 font-weight-bold">Stats</div>
        <div class="text-body-2 text-medium-emphasis">
          Funnels & engagement.
        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-end ga-2">
        <SelectCurrencies v-model="currency" style="max-width: 120px" />
        <v-btn variant="outlined" @click="refresh">
          <v-icon start icon="mdi-refresh" />
          Refresh
        </v-btn>
      </v-col>
    </v-row>

    <ConversionFunnelCard
      :data="funnel"
      title="Conversion funnel (7d cohort)"
      :currencyCode="currency"
    />
  </v-container>
</template>
