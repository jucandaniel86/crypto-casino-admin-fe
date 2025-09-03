import { type MenuItemType } from "@/app/types";

export const menuItems: MenuItemType[] = [
  {
    label: "Menu",
    isHeader: true,
    id: "HeaderMenu",
  },
  {
    label: "Dashboard",
    id: "sideBarDashboard",
    icon: "ph-gauge",
    link: "/",
  },
  {
    label: "Statements",
    icon: "ph-chart-pie",
    id: "sideBarReports",
    prefix: "/reports",
    subMenu: [
      { label: "Summary", link: "/reports/summary" },
      { label: "Games", link: "/reports/games" },
      { label: "Players", link: "/reports/players" },
      { label: "Sessions", link: "/reports/sessions" },
      { label: "Player Rounds", link: "/reports/rounds" },
      { label: "Big Players", link: "/reports/big-players" },
    ],
  },
  {
    label: "Invoices",
    id: "sideBarInvoices",
    icon: "ph-barbell-fill",
    link: "/invoices",
  },
  {
    label: "Games Resources",
    id: "sidebarGameResources",
    icon: "ph-poker-chip-bold",
    link: "/resources",
  },
  {
    label: "Clients",
    id: "sideBarClients",
    icon: "ph-users-three",
    link: "/clients",
  },
  {
    label: "Users",
    id: "sideBarUsers",
    icon: "ph-users",
    link: "/users",
  },
  {
    label: "Currencies",
    id: "sidebarCurrencies",
    icon: "ph-money",
    link: "/currencies",
  },
];

export const setAttributes = (key: string, value: string) => {
  document.documentElement.setAttribute(key, value);
};
