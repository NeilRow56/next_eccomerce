import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink'
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';


const Navbar = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const { status, data: session } = useSession();

    const router = useRouter();

    const logoutClickHandler = () => {
      
      signOut({ callbackUrl: '/signin' });
    };

  return (
    <>
    <ToastContainer position="bottom-center" limit={1} />
    <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className={router.pathname == '/' ? "active " : "not_active" }  > Ecommerce</a>
               </Link>
            <div className='flex items-center'>
                <div className='flex items-center px-2 py-1'>
                <FaShoppingCart className='items-center h-6 w-6 text-green-500' />
              <Link href="/cart">
                <a className={router.pathname == '/cart' ? "active" : "not_active" } > 
                Cart
                {cartItemsCount > 0 && (
                  <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>{cartItemsCount}</span>
                )}
                </a>
              </Link>
              <FaSignInAlt className='text-green-500' />
              
              
              </div>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
              <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-800 hover:text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-[-10] w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                    <DropdownLink className={router.pathname == '/cart' ? "dropdown-link-active" : "dropdown-link-not_active" }
                        href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className={router.pathname == '/cart' ? "dropdown-link-active" : "dropdown-link-not_active" }
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        
                        href="#"
                        onClick={logoutClickHandler}
                        className={router.pathname == '/cart' ? "dropdown-link-active" : "dropdown-link-not_active" }
                        
                        
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/signin">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
          </>
  )
}

export default Navbar