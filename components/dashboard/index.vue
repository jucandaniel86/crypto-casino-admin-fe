<script setup lang="ts">
//components
import TodayStats from "./TodayStats.vue";
import TopGamesComponent, { type TopGameItem } from "./TopGames.vue";
import TreasuryDistributionPie from "./TreasuryDistributionPie.vue";

//models
const currency = ref<string>("PEP");
const trasuryPie = ref<any[]>([]);
const treasuryPieError = ref<string>("");
const statsData = ref<any>();
const loading = ref<boolean>(false);
const topGames = ref<TopGameItem[]>([]);

//methods
const getTreasuryPie = async (): Promise<void> => {
  if (currency.value === "") return;

  const { data } = await useAPIFetch("/stats/treasury-distribution", {
    currency: currency.value,
  });
  if (!data.success) {
    treasuryPieError.value = data.message;
    return;
  }

  treasuryPieError.value = "";
  trasuryPie.value = data.series;
};

const getTodayStats = async (): Promise<void> => {
  const { data } = await useAPIFetch("/stats/today", {
    currency_id: currency.value,
    currency_code: currency.value,
  });

  if (data) {
    statsData.value = data;
  }
};

const getTopGames = async (): Promise<void> => {
  const { data } = await useAPIFetch("/stats/top-games", {
    currency_code: currency.value,
  });
  if (data) {
    topGames.value = data.items;
  }
};

const initDashboard = async (): Promise<void> => {
  loading.value = true;
  await Promise.all([getTreasuryPie(), getTodayStats(), getTopGames()]);
  loading.value = false;
};

//watch
watch(currency, async () => {
  initDashboard();
});

//onMounted
onMounted(() => {
  initDashboard();
});
</script>
<template>
  <v-card>
    <v-card-title class="d-flex align-center ga-1">
      <SelectCurrencies v-model="currency" />
    </v-card-title>
    <v-card-text>
      <div
        v-if="loading"
        class="d-flex justify-center align-center w-100 h-100"
        style="min-height: 500px"
      >
        <v-progress-circular indeterminate color="blue" />
      </div>

      <template v-else>
        <v-row>
          <v-col cols="12" md="6">
            <TreasuryDistributionPie
              :items="trasuryPie"
              :error="treasuryPieError"
              :label="`Treasury Distribution for ${currency} currency`"
            />
          </v-col>
          <v-col cols="12" md="6">
            <TopGamesComponent :items="topGames" />
          </v-col>
          <v-col cols="12" md="12">
            <TodayStats
              v-if="statsData"
              :stats="statsData.kpi"
              :range="statsData.range"
              :currency="currency"
            />
          </v-col>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>
