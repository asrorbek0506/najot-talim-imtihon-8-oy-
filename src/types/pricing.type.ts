export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  desc: string;
  popular?: boolean;
  features: string[];
}

export interface ComparisonRow {
  feature: string;
  starter: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
}
