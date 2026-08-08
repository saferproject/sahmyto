import { z } from "@/app/_schemas/zod-mini";

const KarboomFormSchema = z
  .object({
    name: z.string().check(z.trim(), z.minLength(1, "نام کاربوم را وارد کنید")),
    first_number: z.nullish(z.string().check(z.maxLength(2))),
    second_character: z.nullish(z.string().check(z.maxLength(1))),
    third_number: z.nullish(z.string().check(z.maxLength(3))),
    fourth_number: z.nullish(z.string().check(z.maxLength(2))),
    smart_number: z.nullish(z.string().check(z.maxLength(7))),
    description: z.nullish(
      z
        .string()
        .check(z.maxLength(200, "طول توضیحات نباید بیشتر از 200 حرف باشد")),
    ),
  })
  .check(
    z.superRefine((data, ctx) => {
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
    }),
  );

export default KarboomFormSchema;

export type KarboomFormType = z.infer<typeof KarboomFormSchema>;
