import type { IconName } from "./dashboard.type";

export interface AdminNavItem {
  label: string;
  icon: IconName;
  path: string;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export interface AdminStat {
  label: string;
  value: string;
  icon: IconName;
  color: string;
}
