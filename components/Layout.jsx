// components/layout.js


import Navbar1 from './Navbar1'


export default function Layout({ children }) {
  return (
    <>
    
    <div className='container mx-auto'>
      <Navbar1 />
      <main>{children}</main>
      
    </div>
    </>
  )
}
