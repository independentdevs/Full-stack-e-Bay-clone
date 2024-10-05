import "./globals.css" 
import UserProvider from './context/user' 
import CartProvider from './context/cart' 
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

// Define metadata for the application.
export const metadata = {
  title: 'eBay Clone',
  description: 'eBay Clone',
}
 
// RootLayout component that wraps the entire application.
export default function RootLayout({ children }) {

  // Render the application with UserProvider, CartProvider, and ToastContainer.
 return (
    <html lang="en">
      <body>
        <div>
          <ToastContainer /> 

          <UserProvider> 
            <CartProvider> 
              {children} 
            </CartProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  )
}



