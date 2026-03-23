export const CATEGORIES = [
  { id: 'standard', name: "Producto Estándar" },
  { id: 'vip_daily', name: "VIP Diario" },
  { id: 'vip_special', name: "VIP Especial" },
]

export const PLANS_DATA = {
  standard: [
    { name: "Producto Estándar 1", cost: 20000, daily: 6000, duration: 100, total: 600000, requirement: "Tu nivel VIP es >= VIP0" },
    { name: "Producto Estándar 2", cost: 50000, daily: 15500, duration: 100, total: 1550000, requirement: "Tu nivel VIP es >= VIP0" },
    { name: "Producto Estándar 3", cost: 80000, daily: 25600, duration: 100, total: 2560000, requirement: "Tu nivel VIP es >= VIP0" },
    { name: "Producto Estándar 4", cost: 100000, daily: 33000, duration: 100, total: 3300000, requirement: "Tu nivel VIP es >= VIP0" },
  ],
  vip_daily: [
    { name: "VIP Diario 1", cost: 30000, daily: 45000, duration: 1, total: 45000, requirement: "Tu nivel VIP es >= VIP1" },
    { name: "VIP Diario 2", cost: 70000, daily: 35000, duration: 3, total: 105000, requirement: "Tu nivel VIP es >= VIP2" },
    { name: "VIP Diario 3", cost: 120000, daily: 72000, duration: 3, total: 216000, requirement: "Tu nivel VIP es >= VIP3" },
    { name: "VIP Diario 4", cost: 150000, daily: 105000, duration: 3, total: 315000, requirement: "Tu nivel VIP es >= VIP4" },
  ],
  vip_special: [
    { name: "VIP Especial 1", cost: 500000, daily: 75000, duration: 7, total: 525000, requirement: "Tu nivel VIP es >= VIP2" },
    { name: "VIP Especial 2", cost: 2000000, daily: 340000, duration: 7, total: 2380000, requirement: "Tu nivel VIP es >= VIP3" },
    { name: "VIP Especial 3", cost: 5000000, daily: 950000, duration: 7, total: 6650000, requirement: "Tu nivel VIP es >= VIP4" },
  ]
}

export const ALL_PLANS = [
  ...PLANS_DATA.standard,
  ...PLANS_DATA.vip_daily,
  ...PLANS_DATA.vip_special
]
