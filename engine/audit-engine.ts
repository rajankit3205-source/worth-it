import { TOOL_PRICING } from "@/data/pricing";

type ToolInput = {
  tool: string;
  plan: string;
  spend: number;
  seats: number;
};

type AuditResult = {
  tool: string;
  currentPlan: string;
  recommendedPlan: string;
  currentSpend: number;
  recommendedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  reason: string;
};

export function runAudit(
  tools: ToolInput[]
): AuditResult[] {

  return tools.map((tool) => {

    let recommendedPlan = tool.plan;

    let recommendedSpend = tool.spend;

    let reason =
  "Your current setup already appears cost efficient for your usage.";

    /*
      CHATGPT RULES
    */

    if (
      tool.tool === "ChatGPT" &&
      tool.plan === "Team" &&
      tool.seats <= 2
    ) {

      recommendedPlan = "Plus";

      recommendedSpend = 20 * tool.seats;

      reason =
        "ChatGPT Team is typically unnecessary for teams with 2 or fewer users.";

    }

    /*
      CLAUDE RULES
    */

    if (
      tool.tool === "Claude" &&
      tool.plan === "Max"
    ) {

      recommendedPlan = "Pro";

      recommendedSpend = 20 * tool.seats;

      reason =
        "Claude Max is expensive for most lightweight and medium usage teams.";

    }

    /*
      CURSOR RULES
    */

    if (
      tool.tool === "Cursor" &&
      tool.plan === "Business" &&
      tool.seats <= 3
    ) {

      recommendedPlan = "Pro";

      recommendedSpend = 20 * tool.seats;

      reason =
        "Cursor Business becomes cost effective only for larger collaborative teams.";

    }

    /*
      COPILOT RULES
    */

    if (
      tool.tool === "GitHub Copilot" &&
      tool.plan === "Enterprise" &&
      tool.seats <= 5
    ) {

      recommendedPlan = "Business";

      recommendedSpend = 19 * tool.seats;

      reason =
        "GitHub Copilot Enterprise is often unnecessary for smaller engineering teams.";

    }

    const monthlySavings =
      Math.max(
        tool.spend - recommendedSpend,
        0
      );

    const annualSavings =
      monthlySavings * 12;
      
    if (
      monthlySavings === 0 &&
      recommendedPlan === tool.plan
    ) {

      recommendedPlan = tool.plan;

      recommendedSpend = tool.spend;

    }

    return {

      tool: tool.tool,

      currentPlan: tool.plan,

      recommendedPlan,

      currentSpend: tool.spend,

      recommendedSpend,

      monthlySavings,

      annualSavings,

      reason,
    };
  });
}