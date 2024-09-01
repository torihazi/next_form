import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import * as z from "zod";

const addableFormSchema = z.object({
  profile: z.array(
    z.object({
      name: z.string().min(1, "必須"),
      email: z.string().min(1, "必須").email("形式が不正"),
    })
  ),
});

type addableFormSchemaType = z.infer<typeof addableFormSchema>;

export default function AddableForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<addableFormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(addableFormSchema),
    defaultValues: { profile: [{ name: "", email: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "profile",
  });

  const onSubmit: SubmitHandler<addableFormSchemaType> = (
    data: addableFormSchemaType,
    e?: BaseSyntheticEvent
  ) => console.log(data);

  const onError: SubmitErrorHandler<addableFormSchemaType> = (
    errors: FieldErrors<addableFormSchemaType>,
    e?: BaseSyntheticEvent
  ) => console.log(errors);

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-1"
      >
        {fields.map((field, index) => (
          <div key={index} className="last:mb-3">
            <div className="grid grid-cols-12 gap-2">
              <input
                {...register(`profile.${index}.name`)}
                placeholder="名前"
                className="border p-1 col-span-5"
              />
              <input
                {...register(`profile.${index}.email`)}
                placeholder="email"
                className="border p-1 col-span-5"
              />

              <button
                type="button"
                onClick={() => append({ name: "", email: "" })}
                className="border hover:bg-slate-300 transition-all p-1 col-span-1"
              >
                追加
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className={`border p-1 col-span-1 ${
                  fields.length === 1
                    ? "bg-slate-300 cursor-not-allowed"
                    : "hover:bg-slate-300 transition-all"
                }`}
              >
                削除
              </button>
            </div>
            <div className="grid grid-cols-12 gap-2">
              {errors.profile?.[index]?.name && (
                <span className="text-red-500 text-sm col-span-5">
                  {errors.profile[index].name.message}
                </span>
              )}
              {errors.profile?.[index]?.email && (
                <span className="text-red-500 text-sm col-span-5">
                  {errors.profile[index].email.message}
                </span>
              )}
            </div>
          </div>
        ))}
        <div className="flex flex-col w-full gap-2">
          <button
            type="submit"
            className={`border ${
              !isValid
                ? "bg-slate-400 cursor-not-allowed"
                : "hover:bg-blue-400 transition-all"
            }`}
            disabled={!isValid}
          >
            送信 {`${fields.length}件`}
          </button>
        </div>
      </form>
    </div>
  );
}
