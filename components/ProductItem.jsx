import Link from 'next/link'


const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <div className='mb-5  block   rounded-lg border border-gray-200  shadow-md'>
      <Link href={`/product/${product.slug}`}>
        <a >
            <img 
            src={product.image}
            alt={product.name}
            className="rounded shadow object-cover h-64 w-full"
            />

        </a>
      </Link>
      <div className='flex flex-col items-center justify-center p-5'>
      <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className='mb-2'>{product.brand}</p>
        <p className=''>£ {product.price}</p>
        <button 
        onClick={() => addToCartHandler(product)}
        className='primary-button' type="button" >Add to cart</button>
      </div>
    </div>
  )
}

export default ProductItem
