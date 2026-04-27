import ProductImages from "./_components/ProductImages"
import { getProductDetails } from "./_services/getProductDetails"

const ProductDetailsPage = async ({params}: {params: {id: string}}) => {
    const param = await params
    const productDetails = await getProductDetails(param.id)
    console.log(param.id)
    if(!productDetails) {
        return <div>Product not found</div>
    }
    return (
        <div>
            <ProductImages product={productDetails}/>
        </div>
    )
}

export default ProductDetailsPage