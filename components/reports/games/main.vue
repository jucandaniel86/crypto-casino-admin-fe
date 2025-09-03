<script setup lang="ts">
import moment from "moment";
import { GAMES_REPORT_HEADERS } from "./headers";
import { useTableHeaders } from "../useTableHeaders";
import { useAuthStore } from "~/store/auth";
import { encodeStr } from "../Utils";
import { capitalize } from "vue";

let fromDate = moment().subtract(1, "week");
let toDate = moment();

//models
const { user } = useAuthStore();
const { headers, hiddenColumns, activeHeaders, checkActiveData } =
  useTableHeaders(GAMES_REPORT_HEADERS);
const options = ref<any>({});
const period = ref([moment().subtract(1, "week"), moment()]);
const filter = reactive({
  fromDate: fromDate.format("YYYY-MM-DD"),
  toDate: toDate.format("YYYY-MM-DD"),
  game_search: "",
  site_id: "",
});

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

//@ts-ignore
watch(user, () => {
  reloadList();
});

//emitters
const emitters = defineEmits([
  "games:download",
  "games:change-report",
  "games:reload-list",
]);

//methods
const download = () => {
  emitters("games:download", {
    headers: activeHeaders.value,
    data: props.items,
  });
};

const changeReport = (_options: any) => {
  emitters("games:change-report", _options);
};

const reloadList = () => {
  emitters("games:reload-list", filter);
};

//mounted
onMounted(() => {
  // reloadList();
});

//props
const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <v-card class="pa-2 mb-4" style="overflow: auto">
    <v-row :align="'center'">
      <v-col cols="12" md="9">
        <v-row no-gutters>
          <v-col cols="12" md="3" class="d-flex align-center pa-1">
            <v-text-field
              v-model="filter.game_search"
              placeholder=" Client Name/ Round ID/ Transaction ID"
              hide-details
              variant="solo"
              density="compact"
              class="filter-search text-field-component"
            />
          </v-col>

          <v-col cols="12" md="3" class="pa-1">
            <SelectorOperators v-model="filter.site_id" />
          </v-col>
          <v-col cols="12" md="4" class="d-flex align-center pa-1">
            <SelectorDatetimepicker v-model="period" />
          </v-col>
          <v-col cols="12" md="2" class="d-flex align-center pa-1">
            <v-btn
              variant="tonal"
              color="primary"
              block
              :disabled="loading"
              @click.prevent="reloadList"
            >
              <i class="ph-funnel me-1" />
              <span class="font-weight-bold"> Filter</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="3" class="d-flex align-start justify-end ga-2">
        <v-row no-gutters>
          <v-col cols="12" class="pa-1">
            <SelectorFields
              v-model="hiddenColumns"
              :items="headers"
              class="mb-0"
            />
          </v-col>

          <v-col cols="12" class="pa-1 d-flex justify-end">
            <v-btn
              color="primary"
              :disabled="items.length === 0"
              @click="download"
              size="small"
              class="pl-1 pr-1"
            >
              <v-icon color="white">mdi-download</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
  <CommonCard>
    <v-data-table
      :headers="activeHeaders"
      :items="items"
      :options.sync="options"
      :loading="loading"
      class="pa-2"
      :height="450"
    >
      <template v-slot:item="{ item }: any">
        <tr>
          <td v-if="checkActiveData('game_id')">
            {{ item.game_id }}
          </td>
          <td v-if="checkActiveData('game_name')">{{ item.game_name }}</td>
          <td v-if="checkActiveData('site_id')">
            {{ capitalize(item.site_id) }}
          </td>
          <td v-if="checkActiveData('total_brands')">
            {{ item.total_brands }}
          </td>
          <td v-if="checkActiveData('total_bets')">
            {{ item.total_bets.toFixed(2) }}
          </td>
          <td v-if="checkActiveData('total_wins')">
            {{ item.total_wins_amount.toFixed(2) }}
          </td>
          <td v-if="checkActiveData('total_refunds')">
            {{ item.total_refunds }}
          </td>
          <td v-if="checkActiveData('ggr')">{{ item.ggr.toFixed(2) }}</td>
          <td v-if="checkActiveData('bonus_bets')">{{ item.bonus_bets }}</td>
          <td v-if="checkActiveData('bonus_wins')">{{ item.bonus_wins }}</td>
          <td v-if="checkActiveData('bonus_ggr')">{{ item.bonus_ggr }}</td>
          <td v-if="checkActiveData('rtp')">{{ item.rtp }}%</td>
          <td v-if="checkActiveData('avg_bets')">{{ item.avg_bets }}</td>
          <td v-if="checkActiveData('total_players')">
            <a
              href=""
              class="text-primary font-weight-bold"
              @click.prevent="
                changeReport({
                  game_id: item.game_id,
                  toDate: filter.toDate,
                  fromDate: filter.fromDate,
                  report: 'players',
                  gn: encodeStr(item.game_name),
                })
              "
              >{{ item.total_players }}</a
            >
          </td>
          <td v-if="checkActiveData('total_sessions')">
            <a
              href=""
              class="text-primary font-weight-bold"
              @click.prevent="
                changeReport({
                  game_id: item.game_id,
                  toDate: filter.toDate,
                  fromDate: filter.fromDate,
                  report: 'session',
                  gn: encodeStr(item.game_name),
                })
              "
              >{{ item.total_sessions }}</a
            >
          </td>
          <td v-if="checkActiveData('total_spins')">{{ item.total_spins }}</td>
        </tr>
      </template>
    </v-data-table>
  </CommonCard>
</template>

<style>
.mdrp__activator .activator-wrapper .text-field {
  padding: 4px 10px 1px 5px !important;
}

.mdrp__activator .activator-wrapper .text-field {
  width: 100% !important;
}
</style>
