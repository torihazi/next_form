import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  name: z.string().min(1, "必須"),
  email: z.string().min(1, "必須").email("形式が不正です"),
  password: z
    .string()
    .min(8, "8文字以上")
    .regex(/^[a-zA-Z0-9]+$/, "英大文字、英小文字、数字の組み合わせ"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSuccess: SubmitHandler<LoginSchemaType> = (
    data: LoginSchemaType,
    e?: BaseSyntheticEvent
  ) => console.log(data);

  const onError: SubmitErrorHandler<LoginSchemaType> = (
    errors: FieldErrors<LoginSchemaType>,
    e?: BaseSyntheticEvent
  ) => console.log(errors);

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSuccess, onError)}
        className="flex flex-col gap-2"
      >
        <input {...register("name")} className="border" placeholder="名前" />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        <input
          {...register("email")}
          className="border"
          placeholder="メールアドレス"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <input
          {...register("password")}
          className="border"
          placeholder="パスワード"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <button className="border hover:bg-slate-300 transition-all">
          送信
        </button>
      </form>
    </div>
  );
}
