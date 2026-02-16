'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/ui/Loading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { brandsAPI } from '@/lib/api/brands';
import { Brand } from '@/types/product';

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await brandsAPI.getBrands(1, 50);
      setBrands(res.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <Breadcrumb items={[{ label: 'Brands' }]} />

        <h2 className="mb-4">All Brands</h2>

        {loading ? (
          <Loading />
        ) : (
          <div className="row g-4">
            {brands.map((brand) => (
              <div key={brand._id} className="col-lg-3 col-md-4 col-sm-6">
                <Link href={`/brands/${brand._id}`} className="text-decoration-none">
                  <div className="brand-card">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={200}
                      height={200}
                      style={{ objectFit: 'contain' }}
                    />
                    <h6 className="text-dark mt-3">{brand.name}</h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
