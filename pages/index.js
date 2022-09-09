import Head from "next/head"
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import ProductItem from "../components/ProductItem"
// import data from '../utils/data'
import Product from '../models/Product'
import dbConnect from '../lib/dbConnect'
import convertDocToObj from "../lib/convertDocToObj"
import { Store } from '../utils/Store';


const Home = ({ products }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };
  

  return (
    
      <div>
        <Head>
        <title>Home Page</title>
    </Head>
        <div className="container grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-10">
          {products.map((product) => (
            <ProductItem
             product={product}
             key={product.slug}
             addToCartHandler={addToCartHandler}
             />
          ))}
        
        </div>
      </div>
      
      
    
  )
}

export async function getServerSideProps() {
  await dbConnect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(convertDocToObj),
    },
  };
}


export default Home

