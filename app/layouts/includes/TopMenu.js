'use client'

import Link from "next/link";
import { BsChevronDown } from 'react-icons/bs'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useUser } from "../../context/user"
import { useEffect, useState } from "react";
import { useCart } from "../../context/cart";
import { useRouter } from "next/navigation";
import ClientOnly from "../../components/ClientOnly"; 

export default function TopMenu() {
    const router = useRouter() // Initialize the router object for client-side navigation.
    const user = useUser(); // Get the user object from the user context.
    const cart = useCart(); // Get the cart object from the cart context.
    const [isMenu, setIsMenu] = useState(false) // Initialize the isMenu state variable to track the visibility of the dropdown menu.

    useEffect(() => { cart.cartCount() }, [cart]) // Update the cart count whenever the cart object changes.

    const isLoggedIn = () => { // Define a function to determine if the user is logged in.
        if (user && user?.id) { // Check if the user object exists and has an id.
            return (
                <button 
                    onClick={() => !isMenu ? setIsMenu(true) : setIsMenu(false)} // Toggle the visibility of the dropdown menu on click.
                    className="flex items-center gap-2 hover:underline cursor-pointer" // Style the button.
                >
                    <div>Hi, {user.name}</div> // Display the user's name.
                    <BsChevronDown/> // Display the BsChevronDown icon.
                </button>
            )
        } 

        return (
            <Link href="/auth" className="flex items-center gap-2 hover:underline cursor-pointer"> // Render a link to the authentication page if the user is not logged in.
                <div>Login</div> // Display the "Login" text.
                <BsChevronDown/> // Display the BsChevronDown icon.
            </Link>
        )
    }

    return (
        <>
            <div id="TopMenu" className="border-b"> // Render the top menu container.
                <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]"> // Style the container.
                    <ul 
                        id="TopMenuLeft"
                        className="flex items-center text-[11px] text-[#333333] px-2 h-8" // Style the left side of the menu.
                    >
                        <li className="relative px-3"> // Render the user menu item.

                            {isLoggedIn()} // Render the login/logout button.

                            <div 
                                id="AuthDropdown" 
                                className={`
                                    absolute bg-white w-[200px] text-[#333333] z-40 top-[20px] left-0 border shadow-lg
                                    ${isMenu ? 'visible' : 'hidden'}
                                `} // Style the dropdown menu.
                            >
                                <div>
                                    <div className="flex items-center justify-start gap-1 p-3"> // Render the user profile section.
                                        <img width={50} src={user?.picture} /> // Display the user's profile picture.
                                        <div className="font-bold text-[13px]">{user?.name}</div> // Display the user's name.
                                    </div>
                                </div>
                                
                                <div className="border-b"/> // Render a divider.

                                <ul className="bg-white"> // Render the dropdown menu items.
                                    <li className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer"> // Render the "My orders" item.
                                        <Link href="/orders">
                                            My orders
                                        </Link>
                                    </li>
                                    <li 
                                        onClick={() => { user.signOut(); setIsMenu(false) }} // Sign out the user and hide the dropdown menu on click.
                                        className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer" // Style the "Sign out" item.
                                    >
                                        Sign out
                                    </li>
                                </ul>
                                
                            </div>
                        </li>
                        <li className="px-3 hover:underline cursor-pointer"> // Render the "Daily Deals" item.
                            Daily Deals
                        </li>
                        <li className="px-3 hover:underline cursor-pointer"> // Render the "Help & Contact" item.
                            Help & Contact
                        </li>
                        
                    </ul>

                    <ul 
                        id="TopMenuRight"
                        className="flex items-center text-[11px] text-[#333333] px-2 h-8" // Style the right side of the menu.
                    >
                        <li 
                            onClick={() => router.push('/address')} // Navigate to the address page on click.
                            className="flex items-center gap-2 px-3 hover:underline cursor-pointer" // Style the "Ship to" item.
                        >
                            <img width={32} src="/images/uk.png"/> // Display the UK flag.
                            Ship to
                        </li>
                        <ClientOnly> // Render the cart item only on the client-side.
                            <li className="px-3 hover:underline cursor-pointer">
                                <div onClick={() => router.push('/cart')} className="relative"> // Navigate to the cart page on click.
                                    <AiOutlineShoppingCart size={22}/> // Display the shopping cart icon.
                                    {cart.cartCount() > 0 ? // Display the cart count if there are items in the cart.
                                        <div className="absolute text-[10px] -top-[2px] -right-[5px] bg-red-500 w-[14px] h-[14px] rounded-full text-white">
                                            <div className=" flex items-center justify-center -mt-[1px]">{cart.cartCount()}</div>
                                        </div>
                                    : <div></div>}
                                </div>
                            </li>
                        </ClientOnly>
                    </ul>
                </div>
            </div>
        </>
    )
  }

  
  