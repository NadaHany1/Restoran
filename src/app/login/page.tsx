"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginInput } from "@/schemas/auth";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const result = await login(data.email, data.password);

      if (!result.success) {
        setError("root", {
          type: "server",
          message: result.message ?? "Invalid credentials",
        });
        return;
      }

      reset();
      router.push("/");
    } catch {
      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex w-4/5 h-[60vh] min-h-fit my-[10vh] m-auto shadow-2xl rounded-xl overflow-hidden">
      {/* IMAGE CONTAINER */}
      <div className="hidden md:block relative flex-1 h-full">
        <Image
          src="/login.webp"
          alt="pizza"
          fill
          sizes="100"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs flex justify-center items-center">
          <p className="text-white text-6xl text-center font-['BBH_Bartle', cursive]">
            Welcome <br /> Back
          </p>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="flex-1 h-full m-auto flex flex-col justify-evenly items-center gap-5 py-5 rounded-xl">
        <h1 className="text-orange-500 font-bold text-3xl border-b-2 border-orange-500 py-4">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[80%] gap-4"
        >
          {/* Email */}
          <label className="relative">
            <input
              type="email"
              placeholder=""
              autoComplete="username"
              className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
              {...register("email")}
            />
            <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
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
              autoComplete="current-password"
              className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
              {...register("password")}
            />
            <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
              Password
            </span>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </label>

          {errors.root?.message && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}
          {isSubmitSuccessful && (
            <p className="text-green-500 text-sm">{"Successful login!"}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="disabled:opacity-50 p-2 w-[50%] bg-orange-500 text-white text-md rounded-xl m-auto hover:bg-orange-600 transition duration-300"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-gray-500 text-center">
            Don&apos;t have an account ?
            <br />
            <Link href="/signup" className="text-orange-500 ml-3">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;