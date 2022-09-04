import Link from 'next/link'
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink'
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold hover:text-blue-400">Ecommerce</a>
            </Link>
            <div className='flex items-center'>
                <div className='flex items-center px-2 py-1'>
                <FaShoppingCart className='items-center h-6 w-6 text-green-500' />
              <Link href="/cart">
                <a className=" p-2 hover:text-blue-400">  Cart
                  
                    <span className="ml-1 rounded-full bg-red-600  p-2 text-xs font-bold text-white">
                      23
                    </span>
                  
                </a>
              </Link>
              <FaSignInAlt className='text-green-500' />
              <Link href="/signin">
                <a className=" p-2 hover:text-blue-400">  Sign In </a>
              </Link>
              
              </div>
              <Menu as="div" className="relative inline-block">
                  <Menu.Button className="hover:text-blue-600">
                    username
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
             
            </div>
          </nav>
  )
}

export default Navbar