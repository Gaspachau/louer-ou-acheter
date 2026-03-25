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
    const paid = (principal / totalMonths) * monthsPaid;
    return Math.max(0, principal - paid);
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
}) {
  const months = comparisonYears * 12;
  const notaryFees = purchasePrice * (notaryFeesPct / 100);
  const loanAmount = Math.max(0, purchasePrice - downPayment);
  const annualMaintenance = purchasePrice * (annualMaintenancePct / 100);

  const monthlyPayment = monthlyMortgagePayment(loanAmount, mortgageRate, mortgageYears);
  const ownerMonthlyCost = monthlyPayment + (annualPropertyTax + annualMaintenance + annualInsurance) / 12;

  const monthlyRate = investmentReturn / 100 / 12;

  // Renter starts by investing the down payment + notary fees they won't spend
  let renterPortfolio = downPayment + notaryFees;

  const yearlyData = [];

  for (let m = 1; m <= months; m++) {
    const yearIndex = Math.floor((m - 1) / 12);
    const currentRent = monthlyRent * Math.pow(1 + annualRentIncrease / 100, yearIndex);
    const surplus = Math.max(0, ownerMonthlyCost - currentRent);

    // Grow portfolio by one month then add surplus
    renterPortfolio = renterPortfolio * (1 + monthlyRate) + surplus;

    // Snapshot at each year end
    if (m % 12 === 0) {
      const year = m / 12;
      const propValue = purchasePrice * Math.pow(1 + appreciationRate / 100, year);
      const remaining = remainingBalance(loanAmount, mortgageRate, mortgageYears, m);
      yearlyData.push({
        year,
        ownerNetWorth: propValue - remaining - propValue * (saleCostsPct / 100),
        renterPortfolio,
      });
    }
  }

  const monthsPaid = Math.min(months, mortgageYears * 12);
  const remaining = remainingBalance(loanAmount, mortgageRate, mortgageYears, monthsPaid);
  const propertyValueAtEnd = purchasePrice * Math.pow(1 + appreciationRate / 100, comparisonYears);
  const saleCosts = propertyValueAtEnd * (saleCostsPct / 100);
  const ownerNetWorth = propertyValueAtEnd - remaining - saleCosts;

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
    yearlyData,
  };
}
