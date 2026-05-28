import React from "react";

export interface OverviewCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}

export interface UserStatsProps {
  total_properties: number;
  eligible_properties: number;
  pending_offers: number;
  completed_buybacks: number;
}

export interface DocumentItem {
  key: string;
  label: string;
  optional?: boolean;
  status: "empty" | "uploaded";
  fileName?: string;
  file?: any;
}