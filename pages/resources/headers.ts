import type { ReportHeadersData } from "~/components/reports/Types";

export const RESOURCE_HEADERS: ReportHeadersData[] = [
  {
    title: "Game ID",
    align: "start",
    sortable: false,
    value: "id",
    key: "id",
  },
  {
    title: "Game Name",
    align: "start",
    sortable: false,
    key: "label",
    value: "label",
  },
  {
    title: "Actions",
    align: "start",
    sortable: false,
    value: "actions",
  },
];
