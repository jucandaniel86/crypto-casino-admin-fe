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
    label: "Players",
    id: "sidebarPlayers",
    icon: "ph-users",
    link: "/players",
  },
  {
    label: "Withdraw Requests",
    id: "sidebarWithdrawRequests",
    icon: "ph-wallet",
    subMenu: [],
    link: "/withdraw-requests",
  },
  {
    label: "Risk & Fraud",
    id: "sidebarRisk&Fraud",
    icon: "ph-warning",
    subMenu: [],
    link: "/risk",
  },
  {
    label: "Financiar",
    id: "sidebarFinanciar",
    icon: "ph-chart-line",
    subMenu: [
      {
        label: "Finance OPS",
        link: "/stats/finance-ops",
        id: "statsFinanceOPS",
      },
      {
        label: "Crypto OPS",
        link: "/stats/crypto-ops",
        id: "statsCryptoOPS",
      },
      { label: "Summary", link: "/summary", id: "casinoSummary" },
      {
        label: "Crypto Transactions",
        link: "/stats/crypto-transactions",
        id: "statsCryptoTransactions",
      },
      { label: "Games", link: "/stats/games", id: "statsGames" },
      {
        label: "Conversion Funnel",
        link: "/stats/funnel",
        id: "statsFunnel",
      },
    ],
  },
  {
    label: "Casino",
    icon: "ph-poker-chip",
    id: "sidebarCasino",
    prefix: "/reports",
    subMenu: [
      { label: "Pages", link: "/casino/pages", id: "casinoPages" },
      { label: "Games", link: "/casino/games", id: "casinoGames" },
      {
        label: "Categories",
        link: "/casino/categories",
        id: "casinoCategories",
      },
      { label: "Tags", link: "/casino/tags", id: "casinoTags" },
      { label: "Providers", link: "/casino/providers", id: "casinoProviders" },
      {
        label: "Promotions",
        link: "/casino/promotions",
        id: "casinoPromotions",
      },
      { label: "Casino Menu", link: "/casino/menu", id: "casinoMenu" },
    ],
  },
  {
    label: "Settings",
    id: "sidebarSettings",
    icon: "ph-gear-six",
    link: "/",
    subMenu: [
      { label: "Wallets", link: "/settings/wallets", id: "casinoWallets" },
    ],
  },
  {
    label: "Admin Users",
    id: "sidebarUsers",
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
