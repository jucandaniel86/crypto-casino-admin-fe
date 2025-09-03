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
    link: "/",
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
        label: "Default Settings",
        link: "/casino/settings",
        id: "casinoDefaultSettings",
      },
      { label: "Casino Menu", link: "/casino/menu", id: "casinoMenu" },
    ],
  },
  {
    label: "Settings",
    id: "sideBarClients",
    icon: "ph-gear-six",
    link: "/",
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
