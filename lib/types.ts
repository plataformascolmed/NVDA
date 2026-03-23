export type Role = 'INVESTOR' | 'ADMIN'
export type DepositStatus = 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED'

export interface Profile {
  id: string
  name: string
  email: string
  role: Role
  referral_code: string
  referred_by: string | null
  balance: number
  total_invested: number
  total_returns: number
  created_at: string
}

export interface Deposit {
  id: string
  user_id: string
  amount: number
  currency: string
  status: DepositStatus
  receipt_url: string | null
  bank_ref: string | null
  notes: string | null
  created_at: string
  updated_at: string
  profiles?: Profile
}

export interface Referral {
  id: string
  owner_id: string
  referred_email: string
  status: string
  bonus: number
  created_at: string
}

export interface DashboardStats {
  balance: number
  total_invested: number
  total_returns: number
  referrals_count: number
}
