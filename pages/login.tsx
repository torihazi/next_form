import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { BaseSyntheticEvent } from "react";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Invalid email Address"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit } = useForm<LoginSchemaType>({
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
        <input {...register("name")} className="border" />
        <input {...register("email")} className="border" />
        <button className="border hover:bg-slate-300 transition-all">
          送信
        </button>
      </form>
    </div>
  );
}
