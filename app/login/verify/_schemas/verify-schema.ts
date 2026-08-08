import { z } from "@/app/_schemas/zod-mini";

const VerifyFormSchema = z.object({
  firstDigit: z.string().check(z.length(1)),
  secondDigit: z.string().check(z.length(1)),
  thirdDigit: z.string().check(z.length(1)),
  fourthDigit: z.string().check(z.length(1)),
});

export default VerifyFormSchema;

export type VerifyFormType = z.infer<typeof VerifyFormSchema>;
