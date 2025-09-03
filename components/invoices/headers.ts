import type { ReportHeadersData } from "../reports/Types";

export const INVOICES_REPORT_HEADERS: ReportHeadersData[] = [
  {
    title: "Client Name",
    align: "start",
    sortable: false,
    value: "client_name",
  },
  {
    title: "Total wagered (€)",
    align: "start",
    sortable: false,
    value: "total_bets",
  },
  {
    title: "Total payouts (€)",
    align: "start",
    sortable: false,
    value: "total_wins_amount",
  },
  {
    title: "Total Refunds (€)",
    align: "start",
    sortable: false,
    value: "total_refunds",
  },
  {
    title: "Tax %",
    align: "start",
    sortable: false,
    value: "tax",
  },
  {
    title: "GGR",
    align: "start",
    sortable: false,
    value: "ggr",
  },
  {
    title: "NGR",
    align: "start",
    sortable: false,
    value: "ngr",
  },
  {
    title: "Contract Type",
    align: "start",
    sortable: false,
    value: "contract_type",
  },
  {
    title: "Rev Share %",
    align: "start",
    sortable: false,
    value: "rev_share",
  },
  {
    title: "Rev Share amount (€)",
    align: "start",
    sortable: false,
    value: "rev_share_amount",
  },
  {
    title: "Actions",
    align: "start",
    sortable: false,
    value: "actions",
  },
];

export const INVOICES_REPORT_EXPORT_HEADERS = [
  {
    title: "Date",
    value: "dt",
  },
  {
    title: "Client Name",
    value: "client_name",
  },
  {
    title: "Total wagered (€)",
    value: "total_bets",
  },
  {
    title: "Total payouts (€)",
    value: "total_wins_amount",
  },
  {
    title: "Total Refunds (€)",
    value: "total_refunds",
  },
  {
    title: "Tax %",
    value: "tax",
  },
  {
    title: "GGR",
    value: "ggr",
  },
  {
    title: "NGR",
    value: "ngr",
  },
  {
    title: "Contract Type",
    value: "contract_type",
  },
  {
    title: "Rev Share amount (€)",
    value: "rev_share_amount",
  },
];
