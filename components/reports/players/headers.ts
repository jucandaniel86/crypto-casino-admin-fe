import type { ReportHeadersData } from "../Types";

export const GAMES_REPORT_HEADERS: ReportHeadersData[] = [
  {
    title: "Game ID",
    align: "start",
    sortable: false,
    value: "game_id",
  },
  {
    title: "Game Title",
    align: "start",
    sortable: false,
    value: "game_name",
  },
  {
    title: "Operator",
    align: "start",
    sortable: false,
    value: "site_id",
  },
  {
    title: "Brands",
    align: "start",
    sortable: false,
    value: "total_brands",
  },
  {
    title: "Total wagered (€)",
    align: "start",
    sortable: false,
    value: "total_bets",
  },
  {
    title: "Total payouts (€)",
    align: "start",
    sortable: false,
    value: "total_wins",
  },
  {
    title: "Total Refounds (€)",
    align: "start",
    sortable: false,
    value: "total_refunds",
  },
  {
    title: "GGR (€)",
    align: "start",
    sortable: false,
    value: "ggr",
  },
  {
    title: "Bonus bets (€)",
    align: "start",
    sortable: false,
    value: "bonus_bets",
  },
  {
    title: "Bonus wins (€)",
    align: "start",
    sortable: false,
    value: "bonus_wins",
  },
  {
    title: "Bonus GGR (€)",
    align: "start",
    sortable: false,
    value: "bonus_ggr",
  },
  {
    title: "RTP%",
    align: "start",
    sortable: false,
    value: "rtp",
  },
  {
    title: "AVG Bets (€)",
    align: "start",
    sortable: false,
    value: "avg_bets",
  },
  {
    title: "Players",
    align: "start",
    sortable: false,
    value: "total_players",
  },
  {
    title: "Sessions Number",
    align: "start",
    sortable: false,
    value: "total_sessions",
  },
  {
    title: "Total Spins",
    align: "start",
    sortable: false,
    value: "total_spins",
  },
];

export const PLAYERS_REPORT_HEADERS: ReportHeadersData[] = [
  {
    title: "Player ID",
    align: "start",
    sortable: false,
    value: "player_id",
  },
  {
    title: "Operator",
    align: "start",
    sortable: false,
    value: "operator",
  },
  {
    title: "Total wagered (€)",
    align: "start",
    sortable: false,
    value: "total_bets",
  },
  {
    title: "Total payouts (€)",
    align: "start",
    sortable: false,
    value: "total_wins",
  },
  {
    title: "Total Refounds (€)",
    align: "start",
    sortable: false,
    value: "total_refunds",
  },
  {
    title: "GGR (€)",
    align: "start",
    sortable: false,
    value: "ggr",
  },
  {
    title: "Bonus bets (€)",
    align: "start",
    sortable: false,
    value: "bonus_bets",
  },
  {
    title: "Bonus wins (€)",
    align: "start",
    sortable: false,
    value: "bonus_wins",
  },
  {
    title: "Bonus GGR (€)",
    align: "start",
    sortable: false,
    value: "bonus_ggr",
  },
  {
    title: "RTP%",
    align: "start",
    sortable: false,
    value: "rtp",
  },
  {
    title: "AVG Bets (€)",
    align: "start",
    sortable: false,
    value: "avg_bets",
  },
  {
    title: "Games",
    align: "start",
    sortable: false,
    value: "games",
  },
  {
    title: "Sessions Number",
    align: "start",
    sortable: false,
    value: "total_sessions",
  },
  {
    title: "Total Spins",
    align: "start",
    sortable: false,
    value: "total_spins",
  },
];

export const SESSIONS_REPORT_HEADERS: ReportHeadersData[] = [
  {
    title: "Session ID",
    align: "start",
    sortable: false,
    value: "session_id",
  },
  {
    title: "Player ID",
    align: "start",
    sortable: false,
    value: "player_id",
  },
  {
    title: "Operator",
    align: "start",
    sortable: false,
    value: "operator",
  },
  {
    title: "Player Country",
    align: "start",
    sortable: false,
    value: "player_country",
  },
  {
    title: "Total wagered (€)",
    align: "start",
    sortable: false,
    value: "total_bets",
  },
  {
    title: "Total payouts (€)",
    align: "start",
    sortable: false,
    value: "total_wins",
  },
  {
    title: "Refound (€)",
    align: "start",
    sortable: false,
    value: "total_refunds",
  },
  {
    title: "Refounds Count",
    align: "start",
    sortable: false,
    value: "total_refunds_count",
  },
  {
    title: "GGR (€)",
    align: "start",
    sortable: false,
    value: "ggr",
  },
  {
    title: "Bonus Bets (€)",
    align: "start",
    sortable: false,
    value: "bonus_bets",
  },
  {
    title: "Bonus Wins (€)",
    align: "start",
    sortable: false,
    value: "bonus_wins",
  },
  {
    title: "Bonus GGR (€)",
    align: "start",
    sortable: false,
    value: "bonus_ggr",
  },
  {
    title: "RTP",
    align: "start",
    sortable: false,
    value: "rtp",
  },
  {
    title: "Total Spins",
    align: "start",
    sortable: false,
    value: "total_spins",
  },
  {
    title: "Time open",
    align: "start",
    sortable: false,
    value: "time_open",
  },
  {
    title: "Time closed",
    align: "start",
    sortable: false,
    value: "time_closed",
  },
];

export const TRANSACTIONS_REPORT_HEADERS: ReportHeadersData[] = [
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
    title: "Session ID",
    align: "start",
    sortable: false,
    value: "operator_session_id",
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
    title: "Balance (€)",
    align: "start",
    sortable: false,
    value: "balance",
  },
  {
    title: "Currency",
    align: "start",
    sortable: false,
    value: "currency",
  },
  {
    title: "Date",
    align: "start",
    sortable: false,
    value: "timestamp",
  },
];
