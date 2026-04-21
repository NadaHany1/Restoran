'use client'

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupSchema, SignupInput } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


const Signup = () => {
  const router = useRouter();
  const { signup } = useAuth();
  

  const { register, handleSubmit, setError, reset, formState:{errors, isSubmitting, isSubmitSuccessful} } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<SignupInput> = async (data) =>{
    try{
      const result = await signup(data);
      if (!result.success) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (field === "root") {
              setError("root", {
                type: "server",
                message: messages?.[0],
              });
            } else {
              setError(field as keyof SignupInput, {
                type: "server",
                message: messages?.[0],
              });
            }
          });
        }
        return;
        
      }

      reset();
      router.push("/");
    }catch{
      setError(
        "root",{
          type: "server",
          message: "something went wrong from client catch"
        }
      )
    }
  }

  return (
    <div className="relative flex justify-center items-center py-[10vh] bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-4/5 md:w-1/2 p-5 rounded-2xl relative shadow-2xl  "
      >
        {/* Title */}
        <p className="relative flex items-center pl-8 text-[28px] font-semibold tracking-tight text-orange-500">
          <span className="absolute left-0 w-[18px] h-[18px] bg-orange-500 rounded-full"></span>
          <span className="absolute left-0 w-[18px] h-[18px] bg-orange-500 rounded-full animate-ping"></span>
          Register
        </p>

        <p className="text-sm text-gray-500">
          Signup now and get full access to our site.
        </p>

        {/* Name Fields */}
        <div className="flex gap-2">
          <label className="relative w-full">
            <input
              type="text"
              placeholder=""
              autoComplete="given-name"
              className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
              {...register("firstName")}
            />
            <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
              Firstname
            </span>
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </label>

          <label className="relative w-full">
            <input
              type="text"
              placeholder=""
              autoComplete="family-name"
              className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
              {...register("lastName")}
            />
            <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:left-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
              Lastname
            </span>
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </label>
        </div>

        {/* Email */}
        <label className="relative">
          <input
            type="email"
            placeholder=""
            autoComplete="email"
            className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
            {...register("email")}
          />
          <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:left-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
            Email
          </span>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </label>

        {/* Password */}
        <label className="relative">
          <input
            type="password"
            placeholder=""
            autoComplete="new-password"
            className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
            {...register("password")}
          />
          <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:left-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
            Password
          </span>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>

        {/* Confirm Password */}
        <label className="relative">
          <input
            type="password"
            placeholder=""
            autoComplete="new-password"
            className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
            {...register("confirmPassword")}
          />
          <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:left-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
            Confirm password
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </label>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              {...register("terms")}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300"
            />
          </div>

          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-500">
              I accept the{" "}
              <a
                className="font-medium text-orange-500 hover:underline"
                href="#"
              >
                Terms and Conditions
              </a>
              {errors.terms && (
                <p className="text-red-500">{errors.terms.message}</p>
              )}
            </label>
          </div>
        </div>
        {errors.root?.message && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
        {isSubmitSuccessful && (
          <p className="text-green-500 text-sm">
            {"You are registered successfuly!"}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="disabled:opacity-50 mt-2 rounded-xl bg-orange-500 py-2 text-white text-base transition duration-300 hover:bg-orange-600"
        >
          {isSubmitting ? "Submitting ..." : "submit"}
        </button>

        {/* Sign In */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="login" className="text-orange-500 hover:underline">
            Signin
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
