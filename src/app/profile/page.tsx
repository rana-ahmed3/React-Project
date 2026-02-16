'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useAuth } from '@/contexts/AuthContext';
import { authAPI } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    password: '',
    rePassword: '',
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.updateProfile(profileData);
      updateUser(res.data);
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.rePassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authAPI.changePassword(passwordData);
      toast.success('Password changed successfully');
      setPasswordData({ currentPassword: '', password: '', rePassword: '' });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <Header />
      <div className="container my-4">
        <Breadcrumb items={[{ label: 'My Profile' }]} />

        <div className="row">
          <div className="col-lg-8 mx-auto">
            {/* Profile Information */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-person me-2"></i>
                    Profile Information
                  </h5>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setEditing(!editing)}
                  >
                    {editing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {editing ? (
                  <form onSubmit={handleUpdateProfile}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                ) : (
                  <div>
                    <div className="mb-3">
                      <strong>Name:</strong>
                      <p>{user.name}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Email:</strong>
                      <p>{user.email}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Phone:</strong>
                      <p>{user.phone || 'Not provided'}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Role:</strong>
                      <p className="text-capitalize">{user.role}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Change Password */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  <i className="bi bi-lock me-2"></i>
                  Change Password
                </h5>

                <form onSubmit={handleChangePassword}>
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordData.password}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordData.rePassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          rePassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Changing...' : 'Change Password'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
