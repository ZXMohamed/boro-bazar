import ProductDetail from "./_components/ProductDetail"
import ProductImages from "./_components/ProductImages"
import RelatedProducts from "./_components/RelatedProducts"
import Reviews from "./_components/Reviews"
import { getProductDetails } from "./_services/getProductDetails"

const ProductDetailsPage = async ({params}: {params: {id: string}}) => {
    const param = await params
    const productDetails = await getProductDetails(param.id)
    console.log(param.id)
    if(!productDetails) {
        return <div>Product not found</div>
    }
    return (
        <div className="container flex flex-col space-y-22 m-4 mx-auto">
        <div  className="container flex space-x-5 m-4 mx-auto">
            <ProductImages product={productDetails}/>
            <ProductDetail product={productDetails}/>
        </div>
            <Reviews reviews={productDetails.reviews}/>
            <RelatedProducts />
        </div>
    )
}

export default ProductDetailsPage