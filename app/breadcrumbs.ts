export type BreadcrumbType = {
  title: string;
  disabled: boolean;
  to?: string;
};

type BreadcrumbsInterface = {
  [index: string]: BreadcrumbType[];
};

export const APP_BREADCRUMBS: BreadcrumbsInterface = {
  DASHBOARD: [
    {
      title: "Dashboard",
      disabled: false,
    },
  ],
  GAMES: [
    {
      title: "Dashboard",
      disabled: false,
      to: "/",
    },
    {
      title: "Casino",
      disabled: true,
    },
    {
      title: "Games",
      disabled: true,
    },
  ],
  CATEGORIES: [
    {
      title: "Dashboard",
      disabled: false,
      to: "/",
    },
    {
      title: "Casino",
      disabled: true,
    },
    {
      title: "Categories",
      disabled: true,
    },
  ],
};
