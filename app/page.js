"use client"; // This indicates that the component uses Client Components.

import { useEffect, useState } from 'react';
import CarouselComp from './components/CarouselComp'
import Product from './components/Product';
import MainLayout from './layouts/MainLayout';
import useIsLoading from "@/app/hooks/useIsLoading"

export default function Home() {

  // Initialize state for storing product data
  const [products, setProducts] = useState([])

  // Function to fetch product data from the API
  const getProducts = async () => {
    // Show loading state
    useIsLoading(true)

    // Fetch product data from the API
    const response = await fetch('/api/products')
    const prods = await response.json()

    // Update the products state with fetched data
    setProducts([]) // Clear existing products
    setProducts(prods) 

    // Hide loading state
    useIsLoading(false)
  }

  // Fetch products when the component mounts
  useEffect(() => { getProducts() }, [])

  return (
    <>
        <MainLayout>
          <CarouselComp />

          <div className="max-w-[1200px] mx-auto">
            <div className="text-2xl font-bold mt-4 mb-6 px-4">Products</div>

            <div className="grid grid-cols-5 gap-4">
              {/* Map through the products array and render a Product component for each product */}
              {products.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </MainLayout>
    </>
  )
}

