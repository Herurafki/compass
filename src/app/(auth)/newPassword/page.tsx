'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from '@/icons';
import Alert from "@/components/ui/alert/Alert";


export default function ResetPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [matchError, setMatchError] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    console.log("Loaded email from localStorage:", savedEmail);
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset semua status
    setError(null);
    setMatchError(false);
    setShowWarning(false);
    setShowSuccess(false);

    if (!email || !newPassword || !confirmPassword) {
      setShowWarning(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMatchError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const result = await response.json();

      console.log('Status:', response.status);
      console.log('Response OK:', response.ok);
      console.log('Body:', result);

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError("Network error or server unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
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
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Create New Password
        </h1>
        <p className="text-sm text-gray-500 mb-6">Enter your email and new password below</p>

        {loading && <p className="text-blue-500 mb-2">Updating password...</p>}

        {error && (
          <Alert
            message={error}
            title="Error!"
            variant="error"
          />
        )}

        {showSuccess && (
          <Alert
            message="Password updated successfully! Redirecting..."
            title="Success!"
            variant="success"
          />
        )}

        {showWarning && (
          <Alert
            message="Please fill in all fields"
            title="Warning!"
            variant="warning"
          />
        )}

        {matchError && (
          <Alert
            message="Passwords do not match"
            title="Warning!"
            variant="warning"
          />
        )}

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              readOnly={true}  // pastikan pakai readOnly (camelCase)
              // onChange dihapus karena readOnly
            />
          </div>

          <div>
            <Label>New Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
              </span>
            </div>
          </div>

          <div>
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Updating...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
}