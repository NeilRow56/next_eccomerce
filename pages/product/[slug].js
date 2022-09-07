import Head from "next/head"
import Link from "next/link"
import { useRouter } from 'next/router'
import data from "../../utils/data"
import { HiArrowLeft } from "react-icons/hi";
import Image from "next/image";
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';

const ProductScreen = () => {

    const { state, dispatch } = useContext(Store);
    const router = useRouter();
    const { query }  = useRouter()
    const { slug } = query
    const product  = data.products.find(x => x.slug === slug);

    
    if(!product) {
        return (
            <div>Product Not Found</div>
        )
    }

    const addToCartHandler = () => {
      const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
      const quantity = existItem ? existItem.quantity + 1 : 1;
  
      if (product.countInStock < quantity) {
        alert('Sorry. Product is out of stock');
        return;
      }
  
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
      router.push('/cart');
    };
    
   return (
    
    <>
      <div> 
    <Head>
        <title>{product.name}</title>
    </Head>
    </div>
      <div  className="container">
        <div>
        <Link href='/'>
        
        <a className="flex items-center gap-3 mt-10">
        <HiArrowLeft />  back to products</a>
        </Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className=" mb-5  block   rounded-lg border border-gray-200  shadow-md p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>£{product.price.toFixed(2)}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button
              onClick={addToCartHandler}
              className="primary-button w-full"
              
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
        </div>
       </> 
  )
}

export default ProductScreen
