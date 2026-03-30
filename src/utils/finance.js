export function formatCurrency(value) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function monthlyMortgagePayment(principal, annualRatePercent, years) {
  const monthlyRate = annualRatePercent / 100 / 12;
  const months = years * 12;
  if (principal <= 0 || months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

function remainingBalance(principal, annualRatePercent, years, monthsPaid) {
  const monthlyRate = annualRatePercent / 100 / 12;
  const totalMonths = years * 12;
  if (monthsPaid <= 0) return principal;
  if (monthsPaid >= totalMonths) return 0;
  if (monthlyRate === 0) {
    return Math.max(0, principal - (principal / totalMonths) * monthsPaid);
  }
  const payment = monthlyMortgagePayment(principal, annualRatePercent, years);
  return (
    principal * Math.pow(1 + monthlyRate, monthsPaid) -
    payment * ((Math.pow(1 + monthlyRate, monthsPaid) - 1) / monthlyRate)
  );
}

export function computeComparison({
  purchasePrice,
  downPayment,
  mortgageRate,
  mortgageYears,
  notaryFeesPct,
  annualPropertyTax,
  annualMaintenancePct,
  annualInsurance,
  appreciationRate,
  saleCostsPct,
  monthlyRent,
  annualRentIncrease,
  investmentReturn,
  comparisonYears,
  monthlySavings = 0,
}) {
  // Input validation
  if (!purchasePrice || purchasePrice <= 0) return null;
  if (!comparisonYears || comparisonYears <= 0) return null;
  if (!monthlyRent || monthlyRent < 0) return null;

  const months = comparisonYears * 12;
  const notaryFees = purchasePrice * (notaryFeesPct / 100);
  const loanAmount = Math.max(0, purchasePrice - downPayment);
  const annualMaintenance = purchasePrice * (annualMaintenancePct / 100);

  const monthlyPayment = monthlyMortgagePayment(loanAmount, mortgageRate, mortgageYears);
  const ownerMonthlyCost =
    monthlyPayment + (annualPropertyTax + annualMaintenance + annualInsurance) / 12;

  const monthlyRate = investmentReturn / 100 / 12;

  // Renter invests the down payment + notary fees they didn't spend
  let renterPortfolio = downPayment + notaryFees;

  const yearlyData = [];

  for (let m = 1; m <= months; m++) {
    const yearIndex = Math.floor((m - 1) / 12);
    const currentRent = monthlyRent * Math.pow(1 + annualRentIncrease / 100, yearIndex);
    // Extra monthly investment when owner costs exceed rent.
    // Assumption: when ownerMonthlyCost < rent (costSurplus negative), the owner has a monthly
    // advantage but we don't credit the renter's portfolio with that difference — the renter is
    // assumed to spend (not invest) any surplus rent savings. This slightly favours the buyer
    // in low-cost-of-ownership scenarios, but is acceptable as a conservative simplification.
    const costSurplus = Math.max(0, ownerMonthlyCost - currentRent);

    renterPortfolio =
      renterPortfolio * (1 + monthlyRate) + costSurplus + monthlySavings;

    if (m % 12 === 0) {
      const year = m / 12;
      const propValue = purchasePrice * Math.pow(1 + appreciationRate / 100, year);
      const rem = remainingBalance(loanAmount, mortgageRate, mortgageYears, m);
      yearlyData.push({
        year,
        ownerNetWorth: propValue - rem - propValue * (Math.min(99, saleCostsPct) / 100),
        renterPortfolio,
      });
    }
  }

  const monthsPaid = Math.min(months, mortgageYears * 12);
  const remaining = remainingBalance(loanAmount, mortgageRate, mortgageYears, monthsPaid);
  const propertyValueAtEnd =
    purchasePrice * Math.pow(1 + appreciationRate / 100, comparisonYears);
  // Clamp saleCostsPct to avoid division by zero / negative net worth
  const saleCostsPct_clamped = Math.min(99, saleCostsPct);
  const saleCosts = propertyValueAtEnd * (saleCostsPct_clamped / 100);
  const ownerNetWorth = propertyValueAtEnd - remaining - saleCosts;

  // Minimum property sale price that would make buying equally good as renting
  // ownerNetWorth = renterPortfolio  →  minPropValue - remaining - minPropValue * saleCostsPct/100 = renterPortfolio
  // Guard: if saleCostsPct >= 100, denominator would be <= 0, return null
  const minPropertyValue = saleCostsPct >= 100
    ? null
    : (renterPortfolio + remaining) / (1 - saleCostsPct_clamped / 100);

  const advantage = ownerNetWorth - renterPortfolio;
  const isBuyingBetter = advantage >= 0;

  return {
    loanAmount,
    notaryFees,
    monthlyPayment,
    remaining,
    propertyValueAtEnd,
    saleCosts,
    ownerNetWorth,
    renterPortfolio,
    ownerMonthlyTotal: ownerMonthlyCost,
    advantage,
    recommendation: isBuyingBetter ? "Acheter" : "Louer",
    isBuyingBetter,
    minPropertyValue,
    yearlyData,
  };
}
