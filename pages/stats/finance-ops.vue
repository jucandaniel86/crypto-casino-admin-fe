<script setup lang="ts">
import moment from "moment";
import FinanceOpsOverview from "~/components/stats/FinanceOpsOverview.vue";

const currency = ref("PEP");

// default: today
const from = ref(moment().subtract(30, "day").startOf("day").toISOString());
const to = ref(moment().add(1, "day").startOf("day").toISOString());

const unclaimedDays = ref(7);

const { data, refresh, status } = await useApiUseFetch(
  "/stats/finance-ops",
  computed(() => ({
    from: from.value,
    to: to.value,
    currency_code: currency.value,
    unclaimed_days: unclaimedDays.value,
  })),
);

useHead({
  title: "Finance OPS",
});
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row class="align-center mb-4">
      <v-col cols="12" md="6">
        <div class="text-h5 font-weight-bold">Finance / Ops</div>
        <div class="text-body-2 text-medium-emphasis">
          Deposits, withdrawals, cashflow, wallet distribution, unclaimed
          balances.
        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-end ga-2">
        <SelectCurrencies
          v-model="currency"
          variant="outlined"
          style="max-width: 130px"
        />
        <v-text-field
          v-model="unclaimedDays"
          type="number"
          label="Unclaimed days"
          variant="outlined"
          density="compact"
          hide-details
          style="max-width: 160px"
        />

        <v-btn flat @click="refresh" color="primary">
          <v-icon start icon="mdi-refresh" />
          Refresh
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-card-text>
        <v-progress-linear
          v-if="status === 'pending'"
          indeterminate
          class="mb-4"
        />
        <FinanceOpsOverview :data="data" :currency="currency" />
      </v-card-text>
    </v-card>
  </v-container>
</template>
