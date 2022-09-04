// components/layout.js


import Navbar from './Navbar'


export default function Layout({ children }) {
  return (
    <>
    
    <div className='container mx-auto'>
      <Navbar />
      <main>{children}</main>
      
    </div>
    </>
  )
}
