import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  
  if(action.type === LOAD_PRODUCTS){
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice)
    return {...state, all_products: [...action.payload], filtered_products: [...action.payload], filters:{...state.filters, max_price: maxPrice, price: maxPrice}}
  }
  if(action.type === SET_GRIDVIEW){
    return {...state, grid_view: true}
  }
  if(action.type === SET_LISTVIEW){
    return {...state, grid_view: false}
  }
  if(action.type === UPDATE_SORT){
    return {...state, sort: action.payload}
  }
  if(action.type ===  SORT_PRODUCTS){
    const { sort, filtered_products } = state
    let sortedArr = []
    if(sort === 'price-highest'){
      sortedArr = filtered_products.sort((a,b) => b.price-a.price)
      return {...state, filtered_products: sortedArr}
    }
    if(sort === 'price-lowest'){
      sortedArr = filtered_products.sort((a,b) => a.price-b.price)
      return {...state, filtered_products: sortedArr}
    }
    if(sort === 'name-a'){
      sortedArr = filtered_products.sort((a,b) => a.name.localeCompare(b.name))
      // console.log(sortedArr, 'sort asc')
      return {...state, filtered_products: sortedArr}
    }
    if(sort === 'name-z'){
      sortedArr = filtered_products.sort((a,b) => b.name.localeCompare(a.name));
      return {...state, filtered_products: sortedArr}
    }
    return {...state}
  }

  if(action.type === UPDATE_FILTERS){
    const {name, value} = action.payload;
    return {...state, filters:{...state.filters, [name]:value}}
  }
  
  if(action.type === FILTER_PRODUCTS){
    const {all_products} = state;
    const {text, company, category, color, price, shipping} = state.filters;
    let temp_products = [...all_products];
    if(text){
      temp_products = temp_products.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }
    if(category !== 'all'){
      temp_products = temp_products.filter((product) => {
        return product.category === category
      })
    }
    if(company !== 'all'){
      temp_products = temp_products.filter((product) => {
        return product.company === company
      })
    }
    if(color !== 'all'){
      temp_products = temp_products.filter((product) => {
        return product.colors.includes(color)
        // return product.colors.find((c) => c === color)
      })
    } 
    temp_products = temp_products.filter((product) => {
      return product.price <= price && (!shipping || product.shipping === true)
    })

    return {...state, filtered_products: temp_products}
  }
  if(action.type === CLEAR_FILTERS){
    return {...state, 
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
