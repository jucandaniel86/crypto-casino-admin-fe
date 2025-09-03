<script setup lang="ts">
import moment from "moment";
import {
  INVOICES_REPORT_EXPORT_HEADERS,
  INVOICES_REPORT_HEADERS,
} from "./headers";
import { useTableHeaders } from "../reports/useTableHeaders";
import { convertNumber, downloadCSVData } from "../reports/Utils";
import { useGetInvoices } from "../reports/useGetInvoices";

//models
const { headers, hiddenColumns, activeHeaders, checkActiveData } =
  useTableHeaders(INVOICES_REPORT_HEADERS);
const { items, loading, reloadList } = useGetInvoices();
const exportedOperator = ref<string>("");
const options = ref<any>({});
const period = ref<any>({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
});
const filter = reactive({
  client_name: "",
  fromDate: moment().startOf("month").utc().format(),
  toDate: moment().endOf("month").utc().format(),
});

//watchers
watch(options, () => ({
  handler() {
    getList();
  },
  deep: true,
}));
watch(period, () => {
  if (typeof period.value.month !== "undefined") {
    const month =
      String(period.value.month).length === 1
        ? `0${period.value.month + 1}`
        : period.value.month + 1;

    filter.fromDate = moment(`${period.value.year}-${month}-01`)
      .startOf("month")
      .utc()
      .format() as any;
    filter.toDate = moment(`${period.value.year}-${month}-01`)
      .endOf("month")
      .utc()
      .format() as any;
  }
});

//methods
const getList = () => {
  reloadList(filter, "invoices");
};

const convertRevShare = (rev_share: any) => {
  if (Array.isArray(rev_share)) {
    return rev_share.join("/ ");
  }
  return convertNumber(rev_share);
};

const download = () => {
  downloadCSVData({
    headers: activeHeaders.value,
    data: items.value,
  });
};

const buildOperatorDownload = async (item: any) => {
  exportedOperator.value = item.site_id;

  const convertedTiers = item.tiers.map((el: any) => el.rev_share);

  let csv: string = "";
  csv += "Client Name," + item.site_id + "\n";
  csv += "Month," + moment(period.value.toDate).format("MMMM") + "\n";
  csv += "Total Wagered," + parseFloat(item.total_bets).toFixed(2) + "\n";
  csv +=
    "Total Payouts," + parseFloat(item.total_wins_amount).toFixed(2) + "\n";
  csv += "Total GGR," + parseFloat(item.ggr).toFixed(2) + "\n";
  csv += "Total Tax," + item.tax + "\n";
  csv += "Revshare Tiers," + convertedTiers.join("/ ") + "\n";
  csv += "Revshare," + parseFloat(item.rev_share_amount).toFixed(2) + "\n";

  csv += "\n\n\n";
  csv += "Detalied" + "\n";

  const { data, success } = await useAPIFetch(
    "reports/invoices/export",
    {
      ...filter,
      site_id: item.site_id,
    },
    false
  );

  if (success) {
    downloadCSVData(
      {
        headers: INVOICES_REPORT_EXPORT_HEADERS,
        data: data.data.items,
        name: "export_" + item.site_id + ".csv",
      },
      csv
    );
  }
  exportedOperator.value = "";
};

//mounted
onMounted(() => {
  getList();
});
</script>
<template>
  <v-data-table
    :headers="activeHeaders"
    :items="items"
    :options.sync="options"
    :loading="loading"
    hide-default-footer
    class="pa-2"
    :height="450"
  >
    <template v-slot:top>
      <v-row class="align-start d-flex" no-gutters>
        <v-col cols="12" md="8">
          <div class="d-flex ga-2 align-center">
            <v-text-field
              v-model="filter.client_name"
              label="Client Name"
              disabled
              placeholder=" Client Name/ Round ID/ Transaction ID"
              hide-details
              variant="solo"
              density="compact"
              class="filter-search text-field-component"
              style="min-width: 200px"
            />
            <SelectorMonthpicker v-model="period" />
            <v-btn color="primary" small @click.prevent="getList">
              <v-icon color="white" small>mdi-magnify</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-end">
          <div class="d-flex ga-2 align-center justify-end">
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
              style="min-width: 150px"
            ></selector-fields>
          </div>
        </v-col>
      </v-row>
    </template>

    <template v-slot:item="{ item }: any">
      <tr>
        <td v-if="checkActiveData('client_name')">
          {{ item.client_name }}
        </td>
        <td v-if="checkActiveData('brand')">{{ item.brand }}</td>
        <td v-if="checkActiveData('total_bets')">
          {{ convertNumber(item.total_bets) }}
        </td>
        <td v-if="checkActiveData('total_wins_amount')">
          {{ convertNumber(item.total_wins_amount) }}
        </td>
        <td v-if="checkActiveData('total_refunds')">
          {{ item.total_refunds }}
        </td>
        <td v-if="checkActiveData('total_refunds_native')">
          {{ item.total_refunds_native }}
        </td>
        <td v-if="checkActiveData('tax')">
          {{ item.tax }}
        </td>
        <td v-if="checkActiveData('ggr')">
          {{ convertNumber(item.ggr) }}
        </td>
        <td v-if="checkActiveData('ngr')">
          {{ convertNumber(item.ngr) }}
        </td>
        <td v-if="checkActiveData('contract_type')">
          {{ item.contract_type }}
        </td>
        <td v-if="checkActiveData('rev_share')">
          {{ convertRevShare(item.rev_share) }}
        </td>
        <td v-if="checkActiveData('rev_share_amount')">
          {{ convertNumber(item.rev_share_amount) }}
        </td>
        <td v-if="checkActiveData('other_promo_discount')">
          {{ item.other_promo_discount }}
        </td>
        <td>
          <v-btn
            :disabled="exportedOperator === item.site_id"
            color="primary"
            link
            target="_blank"
            @click="buildOperatorDownload(item)"
          >
            <v-icon color="white">mdi-download</v-icon>
            {{
              exportedOperator === item.site_id
                ? "Loading..."
                : "Download Report"
            }}
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
