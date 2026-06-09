import { z } from "zod";

export const pricingInputsSchema = z.object({
  liveMinutes: z.number().min(0).max(20000),
  documentCount: z.number().min(0).max(1500),
  targetLanguages: z.number().min(1).max(100),
  requiresHumanInTheLoop: z.boolean(),
  billingCycle: z.enum(["monthly", "annual"]),
});

export type PricingInputsForm = z.infer<typeof pricingInputsSchema>;
