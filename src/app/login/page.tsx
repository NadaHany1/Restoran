'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoginAction } from "@/actions/auth";

interface LoginErrors {
  email?: string[];
  password?: string[];
}

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setErrors({});
    setServerError("");

    const result = await LoginAction(formData);

    if (!result.success) {
      if (result.errors) {
        setErrors(result.errors);
      }
      if (result.message) {
        setServerError(result.message);
      }
      return;
    }

    setSuccess(true);
  }

  return (
    <div className="flex w-4/5 h-[60vh] my-[10vh] m-auto shadow-2xl rounded-xl overflow-hidden">
      {/* IMAGE CONTAINER */}
      <div className="hidden md:block relative flex-1 h-full">
        <Image src="/login.webp" alt="pizza" fill className="object-cover" />
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

        <form action={handleSubmit} className="flex flex-col w-[80%] gap-4">
          {/* Email */}
          <label className="relative">
            <input
              type="email"
              name="email"
              className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
            />
            <span className="absolute left-3 top-3 text-sm text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold peer-valid:text-green-600">
              Email
            </span>
            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
          </label>

          {/* Password */}
          <label className="relative">
            <input
              type="password"
              name="password"
              className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
            />
            <span className="absolute left-3 top-3 text-sm text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold peer-valid:text-green-600">
              Password
            </span>
            {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
          </label>
          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
          {success && <p className="text-green-500 text-sm">{"successful login"}</p>}
          <button
            type="submit"
            disabled={loading}
            className="p-2 w-[50%] bg-orange-500 text-white text-md rounded-xl m-auto hover:bg-orange-600 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link href="/signup" className="text-orange-500">
            Forgot password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;