import { z } from "zod";

const KarboomFormSchema = z
  .object({
    name: z.string().trim().min(1, "نام کاربوم را وارد کنید"),
    first_number: z.string().max(2).nullish(),
    second_character: z.string().max(1).nullish(),
    third_number: z.string().max(3).nullish(),
    fourth_number: z.string().max(2).nullish(),
    smart_number: z.string().max(7).nullish(),
    description: z
      .string()
      .max(200, "طول توضیحات نباید بیشتر از 200 حرف باشد")
      .nullish(),
  })
  .superRefine((data, ctx) => {
    const fields = [
      data.first_number,
      data.second_character,
      data.third_number,
      data.fourth_number,
    ];

    const hasAnyValue = fields.some((value) => value?.trim());

    if (!hasAnyValue) return;

    const requiredFields = {
      first_number: data.first_number,
      second_character: data.second_character,
      third_number: data.third_number,
      fourth_number: data.fourth_number,
    };

    Object.entries(requiredFields).forEach(([key, value]) => {
      if (!value?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: "پلاک را کامل وارد کنید",
        });
      }
    });
  });

export default KarboomFormSchema;

export type KarboomFormType = z.infer<typeof KarboomFormSchema>;
