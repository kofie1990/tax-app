export interface TaxCalculationResult {
  grossSalary: number;
  basicSalary: number;
  totalAllowances: number;
  employeeSSNIT: number;
  taxableIncome: number;
  payeTax: number;
  bonus: number;
  bonusTax: number;
  netSalary: number;
  tier2Employer: number;
  taxBands: { name: string; amount: number }[];
}

const TAX_BANDS_2025 = [
  { limit: 494, rate: 0, name: "First GH₵ 494" },
  { limit: 110, rate: 0.05, name: "Next GH₵ 110" },
  { limit: 130, rate: 0.10, name: "Next GH₵ 130" },
  { limit: 3167, rate: 0.175, name: "Next GH₵ 3,167" },
  { limit: 356, rate: 0.25, name: "Next GH₵ 356" },
  { limit: Infinity, rate: 0.30, name: "Exceeding GH₵ 4,257" },
];

export function calculateTax(
  grossSalary: number,
  basicSalary: number = grossSalary,
  allowances: number = 0,
  reliefs: number = 0,
  hasSSNIT: boolean = true,
  bonus: number = 0
): TaxCalculationResult {

  // 1. Calculate SSNIT (5.5% of Basic Salary)
  const employeeSSNIT = hasSSNIT ? basicSalary * 0.055 : 0;

  // Tier 2 is part of Employer's contribution by default (5% of Basic Salary)
  // But we can show it for transparency
  const tier2Employer = hasSSNIT ? basicSalary * 0.13 : 0;

  // 2. Calculate Taxable Income
  // Taxable Income = Gross Salary + Allowances - SSNIT - Reliefs
  let taxableIncome = grossSalary + allowances - employeeSSNIT - reliefs;
  if (taxableIncome < 0) taxableIncome = 0;

  // 3. Calculate PAYE
  let remainingIncome = taxableIncome;
  let payeTax = 0;
  const taxBands: { name: string; amount: number }[] = [];

  for (const band of TAX_BANDS_2025) {
    if (remainingIncome <= 0) break;

    const taxableAmountInBand = Math.min(remainingIncome, band.limit);
    const taxForBand = taxableAmountInBand * band.rate;
    payeTax += taxForBand;

    if (taxableAmountInBand > 0) {
      taxBands.push({
        name: band.name,
        amount: taxForBand
      });
    }

    remainingIncome -= taxableAmountInBand;
  }

  // 4. Calculate Bonus Tax
  const bonusTax = bonus * 0.05;
  // 5. Calculate Net Salary
  // Net = Gross + Allowances + Bonus - SSNIT - PAYE - BonusTax
  const netSalary = grossSalary + allowances + bonus - employeeSSNIT - payeTax - bonusTax;

  return {
    grossSalary,
    basicSalary,
    totalAllowances: allowances,
    employeeSSNIT,
    taxableIncome,
    payeTax,
    bonus,
    bonusTax,
    netSalary,
    tier2Employer,
    taxBands,
  };
}
