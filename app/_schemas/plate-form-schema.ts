import { z } from "zod";

const PlateFormSchema = z
  .object({
    first_number: z.string().max(2).nullish(),
    second_character: z
      .string()
      .regex(
        /^[\u0627\u0628\u062A\u062B\u062C\u062F\u0631\u0633\u0635\u0637\u0639\u0641\u0642\u06A9\u06AF\u0644\u0645\u0646\u0648\u0647\u06CC\u0698\u067E\u0634]$/,
        "حرف پلاک غیر مجاز است",
      )
      .max(1)
      .nullish(),
    third_number: z.string().max(3).nullish(),
    fourth_number: z.string().max(2).nullish(),
  })
  .refine(
    ({ first_number, second_character, third_number, fourth_number }) => {
      if (first_number && second_character && third_number && fourth_number)
        return true;
      else if (
        !first_number &&
        !second_character &&
        !third_number &&
        !fourth_number
      )
        return true;
      else return false;
    },
    { error: "پلاک خودرو را کامل پر الزامی است" },
  );

export default PlateFormSchema;

export type PlateFormType = z.infer<typeof PlateFormSchema>;
