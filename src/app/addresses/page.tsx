'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/ui/Loading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { addressesAPI } from '@/lib/api/addresses';
import { Address } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    phone: '',
    city: '',
  });
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchAddresses();
  }, [isAuthenticated]);

  const fetchAddresses = async () => {
    try {
      const res = await addressesAPI.getAddresses();
      setAddresses(res.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addressesAPI.addAddress(formData);
      toast.success('Address added successfully');
      setShowForm(false);
      setFormData({ name: '', details: '', phone: '', city: '' });
      fetchAddresses();
    } catch (error) {
      toast.error('Failed to add address');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await addressesAPI.removeAddress(id);
        toast.success('Address deleted');
        fetchAddresses();
      } catch (error) {
        toast.error('Failed to delete address');
      }
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-4">
        <Breadcrumb items={[{ label: 'My Addresses' }]} />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="bi bi-geo-alt me-2"></i>
            My Addresses
          </h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Address
          </button>
        </div>

        {showForm && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Add New Address</h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Address Details</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={formData.details}
                      onChange={(e) =>
                        setFormData({ ...formData, details: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary me-2">
                      Save Address
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-geo display-1 text-muted"></i>
            <h4 className="mt-3">No addresses saved</h4>
            <p className="text-muted">Add your first address to get started</p>
          </div>
        ) : (
          <div className="row g-3">
            {addresses.map((address) => (
              <div key={address._id} className="col-md-6">
                <div className="address-card">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>{address.name}</h6>
                      <p className="mb-1">{address.details}</p>
                      <p className="mb-1 text-muted">{address.city}</p>
                      <p className="mb-0 text-muted">
                        <i className="bi bi-telephone me-2"></i>
                        {address.phone}
                      </p>
                    </div>
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => handleDelete(address._id!)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
