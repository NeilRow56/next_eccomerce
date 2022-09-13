import { Menu } from '@headlessui/react'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';
import { signOut, useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';

const links = [
  { href: '/profile', label: 'Profile' },
  { href: '/order-history', label: 'Order History' },
  { href: '/spare', label: 'Spare' },
  
]

function DropdownMenu() {
    const { state,dispatch} = useContext(Store);
    const { status, data: session } = useSession();
    const router = useRouter();
    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/signin' });
      };
  return (
    <Menu>
      <Menu.Button className="text-blue-800 hover:text-blue-600">{session.user.name}</Menu.Button>
      <Menu.Items className="absolute right-[60px] top-[55px] w-48 origin-top-right bg-white  shadow-lg ">
        {links.map((link) => (
          <Menu.Item
            as="a"
            key={link.href}
            href={link.href}
            className={router.pathname == link.href ? "dropdown-link-active" : "dropdown-link-not_active" }
          >
            {link.label}
          </Menu.Item>
        ))}
                            {session.user.isAdmin && (
                      <Menu.Item 
                      as='a'
                      href='/admin/dashboard'
                      className={router.pathname == '/admin/dashboard' ? "dropdown-link-active" : "dropdown-link-not_active" }>
                        
                          <a>Admin Dashboard</a>
                        
                      </Menu.Item>
                    )}
        <Menu.Item>

        
        <a
                        
                        href="#"
                        onClick={logoutClickHandler}
                        className={router.pathname == '/signout' ? "dropdown-link-active" : "dropdown-link-not_active" }
                        
                        
                      >
                        Logout
        </a>
        </Menu.Item>

      </Menu.Items>
    </Menu>
  )
}
export default DropdownMenu