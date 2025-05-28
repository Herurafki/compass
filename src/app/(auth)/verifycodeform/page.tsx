"use client";

import { ChevronLeftIcon } from "@/icons";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import Alert from "@/components/ui/alert/Alert";

const VerifyCodeForm = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showResend, setShowResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [loadingResend, setLoadingResend] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const email =
  typeof window !== "undefined"
    ? localStorage.getItem("resetEmail") || searchParams.get("email")
    : null;

useEffect(() => {
  const emailFromQuery = searchParams.get("email");
  if (emailFromQuery) {
    localStorage.setItem("resetEmail", emailFromQuery);
  }
  inputRefs.current[0]?.focus();
}, [searchParams]);

  useEffect(() => {
    if (countdown === 0) {
      setShowResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");


    setError(null);
    setSuccess(null);

    if (!email) {
      setError("Email not found. Please restart the process.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Code verified successfully!");
        localStorage.setItem("resetEmail", email);
        setTimeout(() => router.push("/newPassword"), 1500);
      } else {
        setError(data.error || "Invalid code.");
      }
    } catch (err) {
      setError("An error occurred while verifying the code.");
      console.error(err);
    }
  };

  const handleResendCode = async () => {
    setLoadingResend(true);
    setResendMessage(null);

    
    if (!email) {
      setResendMessage("Email not found in local storage.");
      setLoadingResend(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/send-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResendMessage(data.message || data.error || "Failed to resend code.");
      } else {
        setCountdown(60);
        setShowResend(false);
      }
    } catch (error) {
      console.error("Error resending code:", error);
      setResendMessage("An error occurred while resending the code.");
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Verify Code
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter the 6-digit verification code sent to your email.
            </p>
          </div>

          {error && (
            <div className="mb-4">
            <Alert
              variant="error"
              title="Verification Failed"
              message={error}
              showLink={false}
            />
            </div>
          )}

          {success && (
            <Alert
              variant="success"
              title="Success"
              message={success}
              showLink={false}
            />
          )}

          {resendMessage && (
            <Alert
              variant={resendMessage.includes("resent") ? "success" : "error"}
              title={resendMessage.includes("resent") ? "Code Sent" : "Resend Failed"}
              message={resendMessage}
              showLink={false}
            />
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 text-center border rounded-lg text-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              ))}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
              Verify Code
            </button>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              {!showResend ? (
                <span className="text-gray-400">
                  Resend code in {countdown} seconds
                </span>
              ) : (
                <>
                  Didn’t receive the code?
                  <button
                    onClick={handleResendCode}
                    disabled={loadingResend}
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400 ml-1 underline"
                  >
                    {loadingResend ? "Sending..." : "Resend"}
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodeForm;