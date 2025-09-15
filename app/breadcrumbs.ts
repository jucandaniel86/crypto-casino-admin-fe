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
  GAMES_ADD: [
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
      disabled: false,
      to: "/casino/games",
    },
    {
      title: "Add new Game",
      disabled: true,
    },
  ],
  GAMES_EDIT: [
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
      disabled: false,
      to: "/casino/games",
    },
    {
      title: "Edit Game",
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
  PROVIDERS: [
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
      title: "Providers",
      disabled: true,
    },
  ],
  PAGES: [
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
      title: "Pages",
      disabled: true,
    },
  ],
  PAGE_ADD: [
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
      title: "Pages",
      disabled: false,
      to: "/casino/pages",
    },
    {
      title: "Add Page",
      disabled: true,
    },
  ],

  TAG_SAVE: [
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
      title: "Tags",
      disabled: false,
      to: "/casino/tags",
    },
    {
      title: "Save Tag",
      disabled: true,
    },
  ],
};
