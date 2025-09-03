<script setup lang="ts">
import { SUMMARY_REPORT_HEADERS } from "./headers";
import { useSummaryReport } from "./useSummaryReport";
import { useTableHeaders } from "../useTableHeaders";
import moment from "moment";
import { convertDateToUTC, convertNumber } from "../Utils";
import { useLineChart } from "./useLineChart";
import { useAPIFetch } from "#imports";

const { chartOptions, series, formatSeries } = useLineChart();
const { headers, hiddenColumns, activeHeaders, checkActiveData } =
  useTableHeaders(SUMMARY_REPORT_HEADERS);
const options = ref<any>({});
const period = ref([moment().subtract(1, "week"), moment()]);
const exchange = ref();

const filter = reactive({
  currency: "",
  fromDate: convertDateToUTC(period.value[0]),
  toDate: convertDateToUTC(period.value[1]),
});
const {
  summary,
  summaryLoading,
  wageredDays,
  getSummaryReport,
  getWageredByDays,
} = useSummaryReport();

//computed
const activeItems: any = computed(() => {
  return summary.value.map((el) => ({
    ...el,
    total_bets: Number(exchange.value * el.total_bets).toFixed(2),
    total_refunds: Number(exchange.value * el.total_refunds).toFixed(2),
    ggr: Number(exchange.value * el.ggr).toFixed(2),
    avg_bets: Number(exchange.value * el.avg_bets).toFixed(2),
    total_wins_amount: Number(exchange.value * el.total_wins_amount).toFixed(2),
  }));
});

const reloadList = async () => {
  await getSummaryReport(filter);
  exchange.value = 1;
};

//watchers
watch(options, () => ({
  handler() {
    reloadList();
  },
  deep: true,
}));

watch(period, () => {
  if (period.value && Array.isArray(period.value)) {
    if (typeof period.value[0] !== "undefined") {
      filter.fromDate = convertDateToUTC(period.value[0]);
    }
    if (typeof period.value[1] !== "undefined") {
      filter.toDate = convertDateToUTC(period.value[1]);
    }
  }
});

watch(wageredDays, () => {
  formatSeries(wageredDays.value);
});

//mounted
onMounted(() => {
  reloadList();
  getWageredByDays(filter);

  useAPIFetch("/exchange/get");
});

const doSearch = async () => {
  await reloadList();
  await getWageredByDays(filter);
};

//emitters
const emitters = defineEmits([
  "summary:download",
  "summary:reload-list",
  "summary:change-report",
]);

const changeReport = (_options: any) => {
  emitters("summary:change-report", _options);
};

const download = () => {
  emitters("summary:download", {
    headers: activeHeaders.value,
    data: summary.value,
  });
};

const currencyUpdate = (value: any) => {
  filter.currency = value;
};
</script>
<template>
  <div>
    <apexchart
      type="area"
      :height="300"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <v-data-table
      :headers="activeHeaders"
      :items="activeItems"
      :options.sync="options"
      :loading="summaryLoading"
      hide-default-footer
      class="pa-2"
      :height="450"
      :items-per-page="-1"
    >
      <template v-slot:top>
        <v-row>
          <v-col cols="12" md="7">
            <v-row>
              <v-col cols="12" md="4">
                <SelectorCurrency
                  v-model="filter.currency"
                  @model-update="currencyUpdate"
                />
              </v-col>
              <v-col cols="10" md="6">
                <SelectorDatetimepicker v-model="period" />
              </v-col>
              <v-col cols="2" md="2">
                <v-btn
                  color="primary"
                  :min-width="20"
                  small
                  @click.prevent="doSearch"
                  :disabled="summaryLoading"
                >
                  <v-icon color="white" small>mdi-magnify</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="5">
            <div class="d-flex ga-2 align-center justify-end">
              <SelectorExchange v-model="exchange" />
              <v-btn
                color="primary"
                :disabled="summary.length === 0"
                @click="download"
                small
              >
                <v-icon color="white">mdi-download</v-icon>
                Download Report
              </v-btn>
              <selector-fields
                v-model="hiddenColumns"
                :items="headers"
                style="max-width: 200px"
              ></selector-fields>
            </div>
          </v-col>
        </v-row>
      </template>

      <template v-slot:item="{ item }: any">
        <tr>
          <td v-if="checkActiveData('site_id')">{{ item.site_id }}</td>
          <td v-if="checkActiveData('total_brands')">
            <a
              href=""
              class="text-primary font-weight-bold"
              @click.prevent="
                changeReport({
                  site_id: item.site_id,
                  report: 'brands',
                  toDate: filter.toDate,
                  fromDate: filter.fromDate,
                })
              "
            >
              {{ item.total_brands }}
            </a>
          </td>
          <td v-if="checkActiveData('total_bets')">
            {{ convertNumber(item.total_bets) }}
          </td>
          <td v-if="checkActiveData('total_wins')">
            {{ convertNumber(item.total_wins_amount) }}
          </td>
          <td v-if="checkActiveData('total_refunds')">
            {{ convertNumber(item.total_refunds) }}
          </td>
          <td v-if="checkActiveData('ggr')">{{ convertNumber(item.ggr) }}</td>
          <td v-if="checkActiveData('bonus_bets')">{{ item.bonus_bets }}</td>
          <td v-if="checkActiveData('bonus_wins')">{{ item.bonus_wins }}</td>
          <td v-if="checkActiveData('bonus_ggr')">{{ item.bonus_ggr }}</td>
          <td v-if="checkActiveData('rtp')">{{ item.rtp }}%</td>
          <td v-if="checkActiveData('avg_bets')">
            {{ convertNumber(item.avg_bets) }}
          </td>
          <td v-if="checkActiveData('total_players')">
            <a
              href=""
              class="text-primary font-weight-bold"
              @click.prevent="
                changeReport({
                  report: 'players',
                  site_id: item.site_id,
                  toDate: filter.toDate,
                  fromDate: filter.fromDate,
                })
              "
              >{{ item.total_players }}</a
            >
          </td>
          <td v-if="checkActiveData('total_games')">
            <a
              href=""
              class="text-primary font-weight-bold"
              @click.prevent="
                changeReport({
                  report: 'games',
                  site_id: item.site_id,
                  toDate: filter.toDate,
                  fromDate: filter.fromDate,
                })
              "
              >{{ item.total_games }}</a
            >
          </td>
          <td v-if="checkActiveData('total_sessions')">
            {{ item.total_sessions }}
          </td>
          <td v-if="checkActiveData('total_spins')">{{ item.total_spins }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
