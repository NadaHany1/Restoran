'use client'

import React, { useState } from 'react'
import { Building2, Phone, Mail } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ContactInput, ContactSchema } from '@/schemas/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactAction } from '@/actions/contact';
import Toast from '@/components/Toast';
import { useAuth } from '@/context/AuthContext';

const Contact = () => {

  const [showToast, setShowToast] = useState(false)
  const {user} = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit: SubmitHandler<ContactInput> = async (data) =>{
    try{
      const formData = new FormData();

      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("message", data.message);

      const result = await ContactAction(formData, user?.id)

      if(!result.success){
        setError("root", {
          type: "server",
          message: result.message ?? "Invalid credentials",
        });
        return;
      }
      
      reset();
      setShowToast(true);

    }catch{
      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again later.",
      });
    }
  }
  return (
    <div className="min-h-[80vh] py-[10vh]">
      {showToast && isSubmitSuccessful && <Toast message='your message sent successfuly' duration={3000} onClose={() => setShowToast(false)}/>}
      {/* wrapper */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-5/6 h-full m-auto">
        {/* DATA SECTION */}
        <div className="flex-1 flex flex-col justify-center items-start w-full h-full gap-5 text-gray-500 text-md">
          <h1 className="capitalize text-3xl text-orange-500">get in touch</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo,
            corporis quae? Aut aperiam eos nihil nobis nisi cumque, optio
            sapiente quaerat quas voluptates ea ullam expedita, consequatur
            itaque accusamus corrupti. Nemo similique asperiores omnis ipsam,
            illo distinctio dolorum, atque earum aperiam vero alias dolores
            fugit deserunt ipsa impedit! Aliquam, explicabo.
          </p>
          <p>
            <Building2 className="inline-block" /> 123 Orabi.st Dokki Giza Egypt
          </p>
          <p>
            <Phone className="inline-block" /> +20123456789
          </p>
          <p>
            <Mail className="inline-block" /> restoran@email.com
          </p>
        </div>
        {/* FORM SECTION */}
        <div className="flex-1 w-full h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full p-5 rounded-2xl relative"
          >
            {/* Title */}
            <p className="relative flex items-center pl-8 text-[28px] font-semibold tracking-tight text-orange-500">
              <span className="absolute left-0 w-[18px] h-[18px] bg-orange-500 rounded-full"></span>
              <span className="absolute left-0 w-[18px] h-[18px] bg-orange-500 rounded-full animate-ping"></span>
              Contact Us
            </p>

            {/* Name Fields */}
            <div className="flex gap-2">
              <label className="relative w-full">
                <input
                  type="text"
                  placeholder=""
                  autoComplete="off"
                  {...register("firstName")}
                  className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
                />
                <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                  First name
                </span>
                {errors.firstName && (
                  <p className="text-red-600">{errors.firstName.message}</p>
                )}
              </label>

              <label className="relative w-full">
                <input
                  type="text"
                  placeholder=""
                  autoComplete="off"
                  {...register("lastName")}
                  className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
                />
                <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                  Last name
                </span>
              </label>
              {errors.lastName && (
                <p className="text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            {/* Email */}
            <label className="relative">
              <input
                type="email"
                placeholder=""
                autoComplete="off"
                {...register("email")}
                className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
              />
              <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                Email
              </span>
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </label>

            {/* phone */}
            <label className="relative">
              <input
                type="text"
                placeholder=""
                autoComplete="off"
                {...register("phone")}
                className="peer w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
              />
              <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                Phone Number
              </span>
              {errors.phone && (
                <p className="text-red-600">{errors.phone.message}</p>
              )}
            </label>

            {/* Message */}
            <label className="relative">
              <textarea
                cols={50}
                rows={6}
                placeholder=""
                autoComplete="off"
                {...register("message")}
                className="peer resize-none w-full rounded-xl border border-gray-400 px-3 pt-4 pb-1 outline-none focus:border-orange-500"
              />
              <span className="absolute top-0 left-3 text-xs font-semibold text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                Message
              </span>
              {errors.message && (
                <p className="text-red-600">{errors.message.message}</p>
              )}
            </label>
            {errors.root && (
              <p className="text-red-600">{errors.root.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="disabled:opacity-50 mt-2 rounded-xl bg-orange-500 py-2 text-white text-base transition duration-300 hover:bg-orange-600"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact
