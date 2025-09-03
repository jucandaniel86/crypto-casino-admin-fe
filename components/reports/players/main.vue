<script setup lang="ts">
import { useCountries } from "~/composables/useCountries";
import { PLAYERS_REPORT_HEADERS } from "./headers";
import { useGetReport } from "../useGetReport";
import { useTableHeaders } from "../useTableHeaders";
import moment from "moment";
import { convertNumber } from "../Utils";

//models
const { headers, activeHeaders, hiddenColumns, checkActiveData } =
  useTableHeaders(PLAYERS_REPORT_HEADERS);
const options = ref<any>({});
const firstLoading = ref<boolean>(true);
const { items, loading, totalItems, reloadList } = useGetReport();
const period = ref([moment().subtract(1, "week"), moment()]);
const DEFAULT_ITEMS = 50;
const exchange = ref();

let filter = reactive({
  currency: "",
  player_id: "",
  fromDate: period.value[0].format("YYYY-MM-DD"),
  toDate: period.value[1].format("YYYY-MM-DD"),
});

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
      filter.fromDate = moment(period.value[0]).format(
        "YYYY-MM-DD HH:mm:ss"
      ) as any;
    }
    if (typeof period.value[1] !== "undefined") {
      filter.toDate = moment(period.value[1]).format(
        "YYYY-MM-DD HH:mm:ss"
      ) as any;
    }
  }
});

//emitters
const emitters = defineEmits(["players:change-report", "players:download"]);

//methods
const getList = (options: any = {}) => {
  const { itemsPerPage, page } = options;
  if (!firstLoading.value) {
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
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="filter.player_id"
                placeholder="Player ID"
                hide-details
                variant="solo"
                density="compact"
                class="filter-search text-field-component"
                min-width="200"
              />
            </v-col>
            <v-col cols="12" md="3">
              <selector-currency
                v-model="filter.currency"
                @model-update="currencyUpdate"
              />
            </v-col>
            <v-col cols="8" md="4">
              <SelectorDatetimepicker v-model="period" />
            </v-col>
            <v-col cols="2" md="2">
              <v-btn
                color="primary"
                small
                @click.prevent="getList"
                :disabled="loading"
              >
                <v-icon color="white" small>mdi-magnify</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="4" md="6" class="d-flex">
              <SelectorExchange v-model="exchange" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-center justify-end ga-2">
              <selector-fields
                v-model="hiddenColumns"
                :items="headers"
                style="max-width: 220px"
              ></selector-fields>
              <v-btn
                color="primary"
                :disabled="items.length === 0"
                @click="download"
                size="small"
              >
                <v-icon color="white">mdi-download</v-icon>
              </v-btn>
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
