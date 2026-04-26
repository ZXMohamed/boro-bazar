export const getProductsList = async (query: string) => {
    try{
        const response = await fetch(`/api/products?${query}`)
        return response.json()
    }catch(error){
        console.log(error)
        
    }
}