import Head from "next/head"
import Link from "next/link"
import Product from '../../models/Product'
import dbConnect from '../../lib/dbConnect'
import convertDocToObj from '../../lib/convertDocToObj'
import { useRouter } from 'next/router'
// import data from "../../utils/data"
import axios from 'axios'
import { HiArrowLeft } from "react-icons/hi";
import Image from "next/image";
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';

const ProductScreen = ( props ) => {
    const { product } = props
    const { state, dispatch } = useContext(Store);
    const router = useRouter();
     
    
    
    if(!product) {
        return (
            
            <div>Product Not Found</div>
            
        )
    }

    const addToCartHandler = async () => {
      const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
  
      if (data.countInStock < quantity) {
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
        <title>{product .name}</title>
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
            priority
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

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await dbConnect();
  const product = await Product.findOne({ slug }).lean();
 
  return {
    props: {
      product: product ? convertDocToObj(product) : null,
    },
  };
}


export default ProductScreen
