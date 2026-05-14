export const getProductDetails = async (id: string) => {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }

}