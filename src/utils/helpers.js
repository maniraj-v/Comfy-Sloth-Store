export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-IN',{
        style: 'currency',
        currency: 'INR'
    }).format(Math.round(number/10));
}

export const getUniqueValues = (products, type) => {
    let filterByType = products.map((product) => product[type])
    if(type === 'colors'){
        filterByType = filterByType.flat()
    }
    return ['all', ...new Set(filterByType)]
}
