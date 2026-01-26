export interface CreateCheckoutParams {
  priceId: string;
  couponId?: string | null;
  clientReferenceId?: string;
  user?: {
    customerId?: string;
    email?: string;
  };
}

export interface CreateCustomerPortalParams {
  customerId: string;
  returnUrl: string;
}

export interface CheckoutRequestBody {
  priceId: string;
  couponId?: string;
}

export interface PortalRequestBody {
  returnUrl: string;
}

export interface PortalResponse {
  url: string;
}

export type SubStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "trialing"
  | "unpaid"
  | "none";

export interface SubscriptionInfo {
  plan: string;
  status: SubStatus;
  currentPeriodEnd?: number; // Unix timestamp from Stripe
  cancelAtPeriodEnd?: boolean;
}
