import React from "react";

export interface OverviewCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}

export type UserProps = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  current_role: string;
  created_at: string;
  bank_account_name?: string | null;
  bank_account_number?: string | null;
  bank_name?: string | null;
  bank_code?: string | null;
  role: string;
  stats: UserStatsProps;
};

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

export type StatusType = "all" | "eligible" | "not_eligible" | "offer_sent" | "completed" | "pending";

export interface PropertyItemProps {
  name: string;
  estate_name: string;
  description: string;
}

export interface MyPropertyProps {
  id: number;
  user_id: number;
  property_id: number;
  purchase_date: string;
  purchase_type: string; // e.g., "Regular"
  number_of_plots: number;
  plot_numbers: string;
  price_per_plots: string; // Numeric string, e.g., "3000000.00"
  total_value: string;     // Numeric string, e.g., "3000000.00"
  
  offer_amount: number | null;
  offer_date: string | null;
  documents_submitted_at: string | null;
  verified_at: string | null;
  paid_at: string | null;
  offer_status: string | null;
  
  decline_reason: string | null;
  
  allocation_letter: string; // URL string
  deed_of_assignment: string | null;
  company_receipt: string | null;
  electronic_receipt: string | null;
  other_document: string | null;
  
  status: StatusType;
  eligibility_date: string | null;
  created_at: string; // ISO 8601 DateTime string
  updated_at: string; // ISO 8601 DateTime string
  x_coord: string;    // Numeric string, e.g., "90.77"
  y_coord: string;    // Numeric string, e.g., "87.23"
  eligibility: 'Eligible' | "not_eligible"; // Use literal union if eligibility values are strict

  property: PropertyItemProps;
  user: UserProps;
}

export interface PropertyCardProps extends MyPropertyProps {
  offerId?: string;
  onPress: () => void;
  children?: React.ReactNode;
}

export interface NotificationType {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
};