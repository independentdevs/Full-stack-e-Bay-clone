"use client" 

import MainLayout from "../../layouts/MainLayout" 
import SimilarProducts from "../../components/SimilarProducts" 
import { useEffect, useState } from "react" 
import useIsLoading from "../../hooks/useIsLoading" 
import { useCart } from "../../context/cart" 
import { toast } from "react-toastify" 

export default function Product({ params }) { // Define the Product component.
  const cart = useCart() // Get the cart context.

  const [product, setProduct] = useState({}) // Initialize the product state with an empty object.

  const getProduct = async () => { // Define the getProduct function to fetch product data.
    useIsLoading(true) // Set the loading state to true.
    setProduct({}) // Clear the product state.

    const response = await fetch(`/api/product/${params.id}`) // Fetch product data from the API.
    const prod = await response.json() // Parse the response as JSON.
    setProduct(prod) // Update the product state with the fetched data.
    cart.isItemAddedToCart(prod) // Check if the product is already in the cart.
    useIsLoading(false) // Set the loading state to false.
  }

  useEffect(() => { 
    getProduct() // Fetch product data when the component mounts.
  }, []) // Run the effect only once when the component mounts.

  return (
    <>
      <MainLayout> // Render the main layout.

        <div className="max-w-[1200px] mx-auto"> // Container for the product details.
          <div className="flex px-4 py-10"> // Flex container for product image and details.

            {product?.url 
              ? <img className="w-[40%] rounded-lg" src={product?.url+'/280'} /> // Display the product image if available.
              : <div className="w-[40%]"></div> // Placeholder if image is not available.
            }

            <div className="px-4 w-full"> // Container for product details.
              <div className="font-bold text-xl">{product?.title}</div> // Display the product title.
              <div className="text-sm text-gray-700 pt-2">Brand New - Full Warranty</div> // Display the product condition.

              <div className="border-b py-1" /> // Horizontal divider.

              <div className="pt-3 pb-2"> // Container for the product condition.
                <div className="flex items-center">
                  Condition: <span className="font-bold text-[17px] ml-2">New</span> // Display the product condition.
                </div>
              </div>

              <div className="border-b py-1" /> // Horizontal divider.

              <div className="pt-3"> // Container for the product price and add to cart button.
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center">
                    Price: 
                    {product?.price 
                      ? <div className="font-bold text-[20px] ml-2">
                          GBP £{(product?.price / 100).toFixed(2)} // Display the product price.
                        </div> 
                    : null }
                  </div>
                  <button 
                    onClick={() => { // Handle click event for the add to cart button.
                      if (cart.isItemAdded) { // If the product is already in the cart, remove it.
                        cart.removeFromCart(product)
                        toast.info('Removed from cart', { autoClose: 3000 }) // Display a notification.
                      } else { // If the product is not in the cart, add it.
                        cart.addToCart(product)
                        toast.success('Added to cart', { autoClose: 3000 }) // Display a notification.
                      }
                    }} 
                    className={`
                      text-white py-2 px-20 rounded-full cursor-pointer 
                      ${cart.isItemAdded ? 'bg-[#e9a321] hover:bg-[#bf851a]' : 'bg-[#3498C9] hover:bg-[#0054A0]'}
                    `} // Style the button based on whether the product is in the cart.
                  >
                      {cart.isItemAdded ? 'Remove From Cart' : 'Add To Cart'} // Display the appropriate button text.
                  </button>
                </div>
              </div>

              <div className="border-b py-1" /> // Horizontal divider.

              <div className="pt-3"> // Container for the product description.
                <div className="font-semibold pb-1">Description:</div> // Display the description label.
                <div className="text-sm">{product?.description}</div> // Display the product description.
              </div>

            </div>
          </div>
        </div>

        <SimilarProducts /> // Render the SimilarProducts component.

        </MainLayout>
    </>
  )
}

