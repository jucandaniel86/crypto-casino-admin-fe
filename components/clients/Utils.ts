import type { BreadcrumbType } from "~/app/types";
import type { ReportHeadersData } from "../reports/Types";

export const CLIENTS_BRANDCRUMBS: BreadcrumbType[] = [
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Clients",
    disabled: true,
  },
];

export const CLIENTS_HEADERS_SETUP: ReportHeadersData[] = [
  {
    title: "Name",
    align: "start",
    sortable: false,
    value: "name",
    width: "20%",
  },
  {
    title: "Site ID",
    align: "start",
    sortable: false,
    value: "site_id",
    width: "15%",
  },
  {
    title: "Client RGS ID",
    align: "start",
    sortable: false,
    value: "rgs_id",
    width: "30%",
  },
  {
    title: "Contract Type",
    align: "start",
    sortable: false,
    value: "contract_type",
    width: "10%",
  },
  {
    title: "Taxes",
    align: "start",
    sortable: false,
    value: "tasex",
    width: "5%",
  },
  {
    title: "Brands",
    align: "start",
    sortable: false,
    value: "brands",
    width: "5%",
  },
];

export const BRANDS_HEADERS_SETUP: ReportHeadersData[] = [
  {
    title: "Name",
    align: "start",
    sortable: false,
    value: "name",
    width: "70%",
  },
  {
    title: "Client RGS ID",
    align: "start",
    sortable: false,
    value: "client_rgs_id",
    width: "20%",
  },
  { title: "Actions", value: "iron", width: "20%" },
];

export type ClientType = {
  id?: number;
  name: string;
  legal_name: string;
  regulated: number;
  country_id: number;
  tax: number;
  rev_share: number;
  currencies: string;
  clientCurrencies: any;
  bet_limits: number;
  client_rgs_id: string;
  created_at: string;
  updated_at: string;
  brands_count?: number;
};

export type OperatorType = {
  name: string;
  id?: number;
  site_id: string;
  rgs_id: string;
  contract_type: string;
  brands: number[];
  rev_share: number;
};

export type BrandType = {
  id: number;
  name: string;
  brand_rgs_id: string;
  brand_url: string;
  client_id: number;
  created_at: string;
  updated_at: string;
};
