'use client'

import TopMenu from './includes/TopMenu'
import MainHeader from './includes/MainHeader'
import SubMenu from './includes/SubMenu'
import Footer from './includes/Footer'
import Loading from '../components/Loading'

import { useEffect, useState } from 'react'

export default function MainLayout({ children }) {
    // Defining a state variable `isLoading` to control whether the loading spinner should be shown.
    const [isLoading, setIsLoading] = useState(false)

    // useEffect hook runs after the component mounts.
    useEffect(() => {
        // Adding an event listener to the window's "storage" event, which listens for changes to localStorage.
        window.addEventListener("storage", function () {
            // Retrieve the 'isLoading' value from localStorage.
            let res = localStorage.getItem('isLoading')

            // Set the `isLoading` state based on the value retrieved from localStorage.
            res === 'false' ? setIsLoading(false) : setIsLoading(true)
        })
    })

    // Returning the layout structure.
    return (
      <>
        <div id="MainLayout" className='min-w-[1050px] max-w-[1300px] mx-auto'>
            
            <div>
              {isLoading ? <Loading /> : <div></div>}

              <TopMenu />
              <MainHeader />
              <SubMenu />
            </div>

            <div>{children}</div>

            <div>
              <Footer />
            </div>
        </div>
      </>
    )
}

