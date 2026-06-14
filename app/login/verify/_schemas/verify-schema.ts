import * as z from "zod";

const VerifyFormSchema = z.object({
  firstDigit: z.string().length(1),
  secondDigit: z.string().length(1),
  thirdDigit: z.string().length(1),
  fourthDigit: z.string().length(1),
});

export default VerifyFormSchema;

export type VerifyFormType = z.infer<typeof VerifyFormSchema>;
