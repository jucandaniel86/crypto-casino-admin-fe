import moment from "moment";
import { useRoute } from "vue-router";
import { type BreadcrumbType } from "@/app/types";

type CSVExportDataType = {
  headers: any[];
  data: any[];
  name?: any;
};

export const encodeStr = (_str: string): string => btoa(_str);

export const decodeStr = (_str: string): string => atob(_str);

export const convertNumber = (_number: number, _decimals: number = 2) => {
  return Number(_number).toLocaleString(undefined, {
    maximumFractionDigits: _decimals,
  });
};

export const convertDateToUTC = (_date: any) => {
  return moment(_date).format("YYYY-MM-DD HH:mm:ss");
};

export const capitalize = (s: string) =>
  String(s[0]).toUpperCase() + String(s).slice(1);

export const convertDates = () => {
  const route = useRoute();
  const toDate: any = route.query.toDate;
  const fromDate: any = route.query.fromDate;

  if (!toDate || !fromDate) return "";

  return (
    moment(fromDate).format("ddd, MMM Do YYYY") +
    " - " +
    moment(toDate).format("ddd, MMM Do YYYY")
  );
};

export const downloadCSVData = (
  { headers, data, name }: CSVExportDataType,
  additionalCsv: string = ""
) => {
  let csv = "";

  if (additionalCsv !== "") {
    csv += additionalCsv;
  }

  csv += headers.map((el) => el.title).join(",") + "\n";
  let allowedHeaders = headers.map((el) => el.value);

  data.forEach((row) => {
    let values: any[] = [];
    allowedHeaders.forEach((el) => {
      if (typeof row[el] !== "undefined") {
        values.push(row[el]);
      }
    });
    csv += values.join(",");

    csv += "\n";
  });

  const anchor = document.createElement("a");
  anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  anchor.target = "_blank";
  anchor.download = typeof name !== "undefined" ? name : "games-report.csv";
  anchor.click();
};

export const PLAYERS_BRANDCRUMBS: BreadcrumbType[] = [
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Reports",
    disabled: false,
  },
  {
    title: "Players",
    disabled: true,
  },
];

export const BIG_PLAYERS_BRANDCRUMBS: BreadcrumbType[] = [
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Reports",
    disabled: false,
  },
  {
    title: "Big Players",
    disabled: true,
  },
];

export const GAMES_BREADCRUMBS: BreadcrumbType[] = [
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Reports",
    disabled: false,
  },
  {
    title: "Games",
    disabled: true,
  },
];

export const DASHBOARD_BREADCRUMBS: BreadcrumbType[] = [
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Reports",
    disabled: false,
  },
  {
    title: "Dashboard",
    disabled: true,
  },
];

export const SUMMARY_BREADCRUMBS: BreadcrumbType[] = [
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Reports",
    disabled: false,
  },
  {
    title: "Summary",
    disabled: true,
  },
];

export const SESSIONS_BREADCRUMBS: BreadcrumbType[] = [
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Reports",
    disabled: false,
  },
  {
    title: "Sessions",
    disabled: true,
  },
];

export const INVOICES_BREADCRUMBS: BreadcrumbType[] = [
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Invoices",
    disabled: true,
  },
];
