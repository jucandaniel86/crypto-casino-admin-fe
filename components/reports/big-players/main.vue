<script setup lang="ts">
import { PLAYERS_REPORT_HEADERS } from "../players/headers";
import { useGetReport } from "../useGetReport";
import { useTableHeaders } from "../useTableHeaders";
import moment from "moment";
import { convertDateToUTC, convertNumber } from "../Utils";

//models
const { headers, activeHeaders, hiddenColumns, checkActiveData } =
  useTableHeaders(PLAYERS_REPORT_HEADERS);
const options = ref<any>({});
const { items, loading, totalItems, reloadList } = useGetReport();
const period = ref([moment().subtract(1, "week"), moment()]);
const firstLoading = ref<boolean>(true);
const DEFAULT_ITEMS = 50;

const exchange = ref(1);
let filter = reactive({
  currency: "EUR",
  site_id: "",
  fromDate: period.value[0].format("YYYY-MM-DD"),
  toDate: period.value[1].format("YYYY-MM-DD"),
  betSize: 30,
});

//composables
const { alertError } = useAlert();

//computed
const activeItems: any = computed(() => {
  return items.value.map((el) => ({
    ...el,
    total_bets: Number(exchange.value * el.total_bets).toFixed(2),
    total_refunds: Number(exchange.value * el.total_refunds).toFixed(2),
    ggr: Number(exchange.value * el.ggr).toFixed(2),
    avg_bets: Number(exchange.value * el.avg_bets).toFixed(2),
  }));
});

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

//emitters
const emitters = defineEmits(["players:change-report", "players:download"]);

//methods
const getList = (options: any = {}) => {
  if (!firstLoading.value) {
    if (filter.site_id === "") {
      alertError("Please choose an operator");
      return;
    }

    const { itemsPerPage, page } = options;
    reloadList(
      {
        ...filter,
        itemsPerPage,
        page,
      },
      "players"
    );
  }

  firstLoading.value = false;
};

const changeReport = (_options: any) => {
  emitters("players:change-report", _options);
};

const download = () => {
  emitters("players:download", {
    headers: activeHeaders.value,
    data: items.value,
  });
};

const currencyUpdate = (value: any) => {
  filter.currency = value;
};
</script>
<template>
  <v-data-table-server
    :headers="activeHeaders"
    :items="activeItems"
    :options.sync="options"
    :loading="loading"
    class="pa-2"
    :height="450"
    :items-per-page="DEFAULT_ITEMS"
    @update:options="getList"
    :items-length="totalItems"
  >
    <template v-slot:top>
      <v-row>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="8">
              <SelectorOperators v-model="filter.site_id" />
            </v-col>
            <v-col cols="12" md="4">
              <selector-currency
                v-model="filter.currency"
                @model-update="currencyUpdate"
                :default-value="filter.currency"
              />
            </v-col>
            <v-col cols="6" md="5" class="pt-0 mb-2">
              <SelectorDatetimepicker v-model="period" />
            </v-col>
            <v-col cols="3" md="3" class="pt-0 mb-2">
              <v-text-field
                v-model="filter.betSize"
                type="number"
                label="Bet Size"
                variant="solo"
                density="compact"
                class="filter-search text-field-component"
              />
            </v-col>
            <v-col cols="3" md="4" class="pt-0 mb-2 d-flex ga-2">
              <v-btn
                color="primary"
                @click.prevent="getList"
                :disabled="loading"
              >
                <v-icon color="white">mdi-magnify</v-icon>
              </v-btn>

              <SelectorExchange v-model="exchange" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-end ga-2">
              <v-btn
                color="primary"
                :disabled="items.length === 0"
                @click="download"
                small
              >
                <v-icon color="white">mdi-download</v-icon>
                Download Report
              </v-btn>
              <selector-fields
                v-model="hiddenColumns"
                :items="headers"
                style="max-width: 220px"
              ></selector-fields>
            </v-col>
            <v-col cols="12" class="d-flex justify-end align-center pt-2">
              <v-chip x-small
                >Total: <b>{{ totalItems }}</b></v-chip
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>

    <template v-slot:item="{ item }: any">
      <tr>
        <td v-if="checkActiveData('player_id')">
          <a
            href=""
            class="text-primary font-weight-bold"
            @click.prevent="
              changeReport({
                player_id: item.operator_player_id,
                toDate: filter.toDate,
                fromDate: filter.fromDate,
                report: 'session',
                betSize: filter.betSize,
              })
            "
          >
            {{ item.operator_player_id }}
          </a>
        </td>
        <td v-if="checkActiveData('operator')">{{ item.client_name }}</td>
        <td v-if="checkActiveData('total_bets')">
          {{ convertNumber(item.total_bets) }}
        </td>
        <td v-if="checkActiveData('total_wins')">
          {{ convertNumber(item.total_wins_amount) }}
        </td>
        <td v-if="checkActiveData('total_refunds')">
          {{ convertNumber(item.total_refunds) }}
        </td>
        <td v-if="checkActiveData('ggr')">
          {{ convertNumber(item.ggr) }}
        </td>
        <td v-if="checkActiveData('bonus_bets')">{{ item.bonus_bets }}</td>
        <td v-if="checkActiveData('bonus_wins')">{{ item.bonus_wins }}</td>
        <td v-if="checkActiveData('bonus_ggr')">{{ item.bonus_ggr }}</td>
        <td v-if="checkActiveData('rtp')">{{ item.rtp }}%</td>
        <td v-if="checkActiveData('avg_bets')">
          {{ item.avg_bets }}
        </td>
        <td v-if="checkActiveData('games')">
          <a
            class="text-primary font-weight-bold"
            href=""
            @click.prevent="
              changeReport({
                player_id: item.operator_player_id,
                toDate: filter.toDate,
                fromDate: filter.fromDate,
                betSize: filter.betSize,
                report: 'games',
              })
            "
          >
            {{ item.total_games }}
          </a>
        </td>
        <td v-if="checkActiveData('total_sessions')">
          <a
            href=""
            class="text-primary font-weight-bold"
            @click.prevent="
              changeReport({
                player_id: item.operator_player_id,
                toDate: filter.toDate,
                fromDate: filter.fromDate,
                betSize: filter.betSize,
                report: 'session',
              })
            "
            >{{ item.total_sessions }}</a
          >
        </td>
        <td v-if="checkActiveData('total_spins')">
          <a
            href=""
            class="text-primary font-weight-bold"
            @click.prevent="
              changeReport({
                player_id: item.operator_player_id,
                toDate: filter.toDate,
                fromDate: filter.fromDate,
                betSize: filter.betSize,
                report: 'transactions',
              })
            "
          >
            {{ item.total_spins }}
          </a>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>
