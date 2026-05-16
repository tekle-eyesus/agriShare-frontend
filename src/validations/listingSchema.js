import { z } from "zod";

export const listingSchema = z.object({
  assetId: z.string().min(1, "Asset selection is required"),
  investmentGoalBirr: z
    .number()
    .min(1000, "Investment goal must be at least 1,000 ETB"),
  sharesToSellPercent: z
    .number()
    .min(1, "Shares to sell must be at least 1%")
    .max(49, "Shares to sell must be at most 49%"),
  expectedTotalYieldBirr: z
    .number()
    .min(5000, "Expected total yield must be at least 5,000 ETB"),
  pitchTitle: z
    .string()
    .min(10, "Pitch title must be at least 10 characters")
    .max(120, "Pitch title must be at most 120 characters"),
  pitchText: z
    .string()
    .min(50, "Pitch text must be at least 50 characters")
    .max(3000, "Pitch text must be at most 3000 characters"),
  useOfFunds: z
    .string()
    .min(30, "Use of funds must be at least 30 characters")
    .max(2000, "Use of funds must be at most 2000 characters"),
  riskFactors: z
    .string()
    .min(30, "Risk factors must be at least 30 characters")
    .max(2000, "Risk factors must be at most 2000 characters"),
  investmentDeadline: z
    .string()
    .min(1, "Investment deadline is required")
    .refine(
      (date) => new Date(date) > new Date(),
      "Investment deadline must be in the future",
    ),
  payoutMode: z.enum(["fixed", "offset"], {
    required_error: "Payout mode is required",
  }),
  paydayDate: z.string().optional(),
  payoffDaysFromRelease: z.number().optional(),
  minSharesPerInvestor: z.number().min(1).optional(),
});

export const listingFormSchema = listingSchema
  .refine(
    (data) => {
      if (data.payoutMode === "fixed") {
        return !!data.paydayDate;
      }
      return true;
    },
    {
      message: "Payday date is required when payout mode is fixed",
      path: ["paydayDate"],
    },
  )
  .refine(
    (data) => {
      if (data.payoutMode === "fixed" && data.paydayDate) {
        return new Date(data.paydayDate) > new Date(data.investmentDeadline);
      }
      return true;
    },
    {
      message: "Payday date must be after investment deadline",
      path: ["paydayDate"],
    },
  )
  .refine(
    (data) => {
      if (data.payoutMode === "offset") {
        return data.payoffDaysFromRelease !== undefined && data.payoffDaysFromRelease >= 1;
      }
      return true;
    },
    {
      message: "Payoff days from release is required and must be at least 1 when payout mode is offset",
      path: ["payoffDaysFromRelease"],
    },
  );
