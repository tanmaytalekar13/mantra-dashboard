export interface GrantFinance {
  grant_id: string;
  donor: string;
  grant_name: string;
  reporting_month: string;
  budget_line: string;
  approved_budget_units: number;
  monthly_utilized_units: number;
  cumulative_utilized_units: number;
  cumulative_utilization_rate: number;
  finance_note: string;
}

export interface GrantPerformance {
  grant_id: string;
  donor: string;
  grant_name: string;
  reporting_month: string;
  report_status: string;
  schools_completed_pbl: number;
  pbl_completion_rate: number;
  attendance_rate: number;
  risk_status: string;
  draft_report_text: string;
}

export interface GrantEvidence {
  record_id: string;
  record_type: string;
  grant_id: string;
  donor: string;
  reporting_month: string;
  district: string;
  title: string;
  summary_or_caption: string;
  file_name: string;
  relative_path: string;
}

export interface GrantData {
  profile: GrantFinance[];
  performance: GrantPerformance[];
  evidence: GrantEvidence[];
}