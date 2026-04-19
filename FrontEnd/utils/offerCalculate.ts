export function offerCalculate(price: number, oldPrice: number):string {
    
    const discountAmount = oldPrice - price;
    const salePercentage = (discountAmount / oldPrice) * 100;

    return salePercentage.toFixed(2);
}