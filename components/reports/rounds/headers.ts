import type { ReportHeadersData } from "../Types";

export const ROUNDS_REPORT_HEADERS: ReportHeadersData[] = [
  {
    title: "Round ID",
    align: "start",
    sortable: false,
    value: "round_id",
  },
  {
    title: "Player ID",
    align: "start",
    sortable: false,
    value: "operator_player_id",
  },
  {
    title: "Game",
    align: "start",
    sortable: false,
    value: "game",
  },
  {
    title: "Studio",
    align: "start",
    sortable: false,
    value: "site_id",
  },
  {
    title: "Bet (€)",
    align: "start",
    sortable: false,
    value: "stake",
  },
  {
    title: "Win (€)",
    align: "start",
    sortable: false,
    value: "returns",
  },
  {
    title: "Profit (€)",
    align: "start",
    sortable: false,
    value: "profit",
  },
  {
    title: "Details",
    align: "start",
    sortable: false,
    value: "details",
  },
];

export const TRANSACTIONS_REPORT_HEADERS: ReportHeadersData[] = [
  {
    title: "Bet ID",
    align: "start",
    sortable: false,
    value: "bet_id",
  },
  {
    title: "Date",
    align: "start",
    sortable: false,
    value: "date",
  },
  {
    title: "Currency",
    align: "start",
    sortable: false,
    value: "currency",
  },
  {
    title: "Stake",
    align: "start",
    sortable: false,
    value: "stake",
  },
  {
    title: "Returns",
    align: "start",
    sortable: false,
    value: "returns",
  },
];
