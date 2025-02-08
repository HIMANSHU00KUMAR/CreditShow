// src/types.ts

export interface BasicDetails {
  name: string;
  mobilePhone: string;
  pan: string;
  creditScore: number;
}

export interface ReportSummary {
  totalAccounts: number;
  activeAccounts: number;
  closedAccounts: number;
  currentBalanceAmount: number;
  securedAccountsAmount: number;
  unsecuredAccountsAmount: number;
  lastSevenDaysCreditEnquiries: number;
}

export interface CreditAccount {
  accountType: string;
  bankName: string;
  accountNumber: string;
  address: string;
  amountOverdue: number;
  currentBalance: number;
}

export interface CreditReport {
  basicDetails: BasicDetails;
  reportSummary: ReportSummary;
  creditAccounts: CreditAccount[];
}
