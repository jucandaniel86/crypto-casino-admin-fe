export enum topGamesModelEnum {
  BETS = "bets",
  SPINS = "spins",
  WINS = "wins",
  GGR = "ggr",
}

export enum GamesReportEnum {
  GAMES = "games",
  PLAYERS = "players",
  SESSION = "session",
}

export enum SummaryReportEnum {
  SUMMARY = "summary",
  BRANDS = "brands",
  GAMES = "games",
  PLAYERS = "players",
}

export enum PlayersReportEnum {
  PLAYERS = "players",
  GAMES = "games",
  SESSION = "session",
  TRANSACTIONS = "transactions",
}

export enum RoundsReportEnum {
  ROUNDS = "rounds",
  TRANSACTIONS = "transactions",
}

export type ReportHeadersData = {
  title: string;
  align?: string | undefined;
  sortable?: boolean | undefined;
  value: string;
  width?: (number | string) | undefined;
  key?: any;
};
