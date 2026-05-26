"use client";

import { useEffect } from "react";
import {
  useFieldArray,
  useForm,
} from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { TOOL_PRICING } from "@/data/pricing";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { supabase } from "@/lib/supabase";
import { runAudit } from "@/engine/audit-engine";

const formSchema = z.object({
  teamSize: z.coerce.number().min(1),

  useCase: z.string(),

  tools: z.array(
    z.object({
      tool: z.string(),
      plan: z.string(),
      spend: z.coerce.number().min(0),
      seats: z.coerce.number().min(1),
    })
  ),
});



const defaultValues: FormValues = {
  teamSize: 5,
  useCase: "Coding",

  tools: [
    {
      tool: "ChatGPT",
      plan: "Plus",
      spend: 20,
      seats: 1,
    },
  ],
};

export default function AuditForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
  } = form;

  const { fields, append, remove } =
    useFieldArray({
      control,
      name: "tools",
    });

  const watchedData = watch();

  useEffect(() => {
    const saved =
      localStorage.getItem("audit-form");

    if (saved) {
      form.reset(JSON.parse(saved));
    }
  }, [form]);

  useEffect(() => {
    localStorage.setItem(
      "audit-form",
      JSON.stringify(watchedData)
    );
  }, [watchedData]);

  const router = useRouter();

  async function onSubmit(data: any) {

    const auditId = uuidv4();

    const results =
      runAudit(data.tools);

    const totalMonthlySpend =
      data.tools.reduce(
        (total, tool) =>
          total + tool.spend,
        0
      );

    const totalMonthlySavings =
      results.reduce(
        (total, result) =>
          total + result.monthlySavings,
        0
      );

    const totalAnnualSavings =
      results.reduce(
        (total, result) =>
          total + result.annualSavings,
        0
      );

    const { error } =
      await supabase
        .from("audits")
        .insert({
          id: auditId,

          team_size: data.teamSize,

          use_case: data.useCase,

          total_monthly_spend:
            totalMonthlySpend,

          monthly_savings:
            totalMonthlySavings,

          annual_savings:
            totalAnnualSavings,

          recommendations: results,

          tools: data.tools,
        });

    if (error) {

      console.error(error);

      alert("Failed to save audit.");

      return;
    }

    router.push(`/results/${auditId}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >

      <Card className="bg-white/5 border-white/10 text-white">
        <CardContent className="p-6 space-y-4">

          <div>
            <label className="text-sm text-gray-400">
              Team Size
            </label>

            <Input
              type="number"
              {...register("teamSize")}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Primary Use Case
            </label>

            <Select
              defaultValue="Coding"
              onValueChange={(value) =>
                setValue("useCase", value)
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Coding">
                  Coding
                </SelectItem>

                <SelectItem value="Writing">
                  Writing
                </SelectItem>

                <SelectItem value="Research">
                  Research
                </SelectItem>

                <SelectItem value="Data Analysis">
                  Data Analysis
                </SelectItem>

                <SelectItem value="Mixed">
                  Mixed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

        </CardContent>
      </Card>

      {fields.map((field, index) => {

        const selectedTool =
          watch(`tools.${index}.tool`);

        const plans =
          Object.keys(
            TOOL_PRICING[
              selectedTool as keyof typeof TOOL_PRICING
            ]?.plans || {}
          );

        return (
          <Card
            key={field.id}
            className="bg-white/5 border-white/10 text-white"
          >
            <CardContent className="p-6 space-y-4">

              <div>
                <label className="text-sm text-gray-400">
                  Tool
                </label>

                <Select
                  defaultValue={field.tool}
                  onValueChange={(value) =>
                    setValue(
                      `tools.${index}.tool`,
                      value
                    )
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>

                    {Object.keys(TOOL_PRICING).map(
                      (tool) => (
                        <SelectItem
                          key={tool}
                          value={tool}
                        >
                          {tool}
                        </SelectItem>
                      )
                    )}

                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Plan
                </label>

                <Select
                  defaultValue={field.plan}
                  onValueChange={(value) =>
                    setValue(
                      `tools.${index}.plan`,
                      value
                    )
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>

                    {plans.map((plan) => (
                      <SelectItem
                        key={plan}
                        value={plan}
                      >
                        {plan}
                      </SelectItem>
                    ))}

                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Monthly Spend ($)
                </label>

                <Input
                  type="number"
                  {...register(
                    `tools.${index}.spend`
                  )}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Seats
                </label>

                <Input
                  type="number"
                  {...register(
                    `tools.${index}.seats`
                  )}
                  className="mt-2"
                />
              </div>

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remove Tool
              </Button>

            </CardContent>
          </Card>
        );
      })}

      <Button
        type="button"
        onClick={() =>
          append({
            tool: "ChatGPT",
            plan: "Plus",
            spend: 20,
            seats: 1,
          })
        }
      >
        Add Tool
      </Button>

      <Button type="submit">
        Run Audit
      </Button>

    </form>
  );
}