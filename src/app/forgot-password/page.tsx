'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { authAPI } from '@/lib/api/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      toast.success('Reset code sent to your email');
      setStep('code');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.verifyResetCode(resetCode);
      toast.success('Code verified successfully');
      setStep('reset');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.resetPassword({ email, newPassword: password });
      toast.success('Password reset successfully');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">
                  <i className="bi bi-key text-primary me-2"></i>
                  Reset Password
                </h2>

                {/* Step 1: Enter Email */}
                {step === 'email' && (
                  <form onSubmit={handleSendCode}>
                    <p className="text-muted mb-4">
                      Enter your email address and we'll send you a code to reset
                      your password.
                    </p>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Reset Code'}
                    </button>
                  </form>
                )}

                {/* Step 2: Verify Code */}
                {step === 'code' && (
                  <form onSubmit={handleVerifyCode}>
                    <p className="text-muted mb-4">
                      Enter the 6-digit code sent to your email.
                    </p>
                    <div className="mb-3">
                      <label htmlFor="code" className="form-label">
                        Reset Code
                      </label>
                      <input
                        type="text"
                        className="form-control text-center"
                        id="code"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        required
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Verify Code'}
                    </button>
                  </form>
                )}

                {/* Step 3: Reset Password */}
                {step === 'reset' && (
                  <form onSubmit={handleResetPassword}>
                    <p className="text-muted mb-4">
                      Enter your new password.
                    </p>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter new password"
                        minLength={6}
                      />
                      <small className="text-muted">
                        Must be at least 6 characters
                      </small>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </form>
                )}

                <hr className="my-4" />

                <p className="text-center mb-0">
                  Remember your password?{' '}
                  <Link href="/login" className="text-primary fw-bold">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
