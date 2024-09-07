import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function VerifyCode() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "";
  const inputRefs = useRef([]);

  const { handleSubmit, values, errors, setFieldValue, touched } = useFormik({
    initialValues: {
      resetCode: Array(6).fill(""),
    },
    onSubmit: verify,
    validationSchema: Yup.object({
      resetCode: Yup.array()
        .of(
          Yup.string()
            .matches(/^\d$/, "Each resetCode digit must be a number.")
            .required("All resetCode fields are required.")
        )

        .test("all-required", "All resetCode fields are required.", (value) =>
          value.every((v) => v !== "")
        )
        .length(6, "resetCode must be exactly 6 digits."),
    }),
  });

  async function verify() {
    try {
      const resetCode = values.resetCode.join("");
      console.log(resetCode);

      if (!resetCode) {
        throw new Error("resetCode is required");
      }
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: resetCode }
      );
      console.log(resetCode);

      console.log(data);

      toast.success("Reset code submitted!");
      navigate("/resetpassword");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  }
  const handleKeyDown = (e, index) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      if (index > 0) {
        setFieldValue(`resetCode[${index}]`, "");
        inputRefs.current[index - 1].focus();
      }
    }
  };
  const handleInput = (e, index) => {
    const { value } = e.target;
    if (value) {
      setFieldValue(`resetCode[${index}]`, value);
      if (index < values.resetCode.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${values.resetCode.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    digits.forEach((digit, i) => {
      setFieldValue(`resetCode[${i}]`, digit);
    });
  };

  async function resendCode() {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      toast.success("A new reset code has been sent to your email!");
      localStorage.removeItem("userEmail");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <div>
      <Helmet>
        <title>Verify Code</title>
      </Helmet>
      <div className="relative lightBackground dark:darkBackground ">
        <div className="relative p-4 pt-16">
          <form
            onSubmit={handleSubmit}
            id="resetCode-form"
            className="bg-white dark:bg-gray-800 dark:text-white max-w-xl w-full mx-auto shadow-[0_2px_10px_-3px_rgba(26,83,0.3)] p-8 rounded-2xl mb-10"
          >
            <div>
              <h3 className="text-black-800 text-3xl font-bold text-center mb-6">
                Email Verification
              </h3>

              <p className="my-4 text-center">
                Enter the 6-digit verification code that was sent to your email.
              </p>
              <hr className="h-px mt-6 mb-6 mx-6 bg-green-400 border-0 dark:bg-gray-700"></hr>
            </div>
            <div className="flex items-center justify-center gap-3">
              {values.resetCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={handleFocus}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border border-stroke border-green-300 bg-green-50 p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
                />
              ))}
            </div>
            {errors.resetCode && touched.resetCode && (
              <div className="text-red-500 text-center mt-4">
                {Array.isArray(errors.resetCode)
                  ? errors.resetCode[0]
                  : errors.resetCode}
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={() =>verify() }
                type="submit"
                className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold tracking-wider rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none transition-all"
              >
                Verify
              </button>
              <p className="text-black-800 text-sm mt-8 text-center">
                Didn't recieve code?
                <a
                  onClick={resendCode}
                  className="text-green-500 cursor-pointer font-semibold hover:underline ml-1"
                >
                  Resend
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
