type SummaryInput = {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  toolCount: number;
};

export function generateSummary({
  totalMonthlySavings,
  totalAnnualSavings,
  toolCount,
}: SummaryInput) {

  if (totalMonthlySavings === 0) {

    return `
Your AI stack appears well optimized for your current team size and usage patterns. 
At the moment, there are no major overspending signals detected across your ${toolCount} active AI tools. 
Worth-It recommends periodically re-auditing your stack as pricing models and team workflows evolve.
`;
  }

  if (totalMonthlySavings < 100) {

    return `
Worth-It identified several moderate optimization opportunities within your AI tooling stack. 
While your current setup is reasonably efficient overall, adjusting a few plan selections could reduce operational AI costs by approximately $${totalAnnualSavings} annually without impacting team productivity.
`;
  }

  if (totalMonthlySavings < 500) {

    return `
Your organization is currently overspending on multiple AI subscriptions relative to team size and usage requirements. 
Worth-It identified optimization opportunities capable of reducing costs by approximately $${totalAnnualSavings} annually while maintaining similar functionality and workflow coverage.
`;
  }

  return `
Worth-It detected substantial inefficiencies in your current AI spending structure. 
Based on your reported tooling stack, your organization may be overspending by more than $${totalAnnualSavings} annually. 
Several enterprise-grade plans appear unnecessary for current usage levels, and significant savings opportunities are available through plan restructuring and optimization.
`;
}