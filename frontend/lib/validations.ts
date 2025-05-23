import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Электронная почта обязательна к заполнению" })
    .email("Введите корректный email"),
  password: z
    .string({ required_error: "Пароль обязателен к заполнению" })
    .min(8, "Пароль должен содержать не менее 8 символов")
    .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .regex(
      /[@$!%*?&]/,
      "Пароль должен содержать хотя бы один спецсимвол '@$!%*?&'"
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
