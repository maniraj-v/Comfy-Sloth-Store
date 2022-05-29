import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSideBarOpen: false,
  products: [],
  featured_products: [],
  products_loading: false,
  products_error: false,
  single_product: {},
  single_product_loading: false,
  single_product_error: false,
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async(url) => {
    dispatch({type: GET_PRODUCTS_BEGIN})
    try{
        const response = await axios.get(url);
        const products = response.data;
        dispatch({type: GET_PRODUCTS_SUCCESS, payload: products})
      }catch(error){
        dispatch({type: GET_PRODUCTS_ERROR})
      }
  }

  const getSingleProduct = async(url) => {
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
    try{
        const response = await axios.get(url);
        const products = response.data;
        dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: products})
      }catch(error){
        dispatch({type: GET_SINGLE_PRODUCT_ERROR})
      }
  }

  useEffect(() => {
    getProducts(url);
  }, [])

  const openSideBar = () =>{
    dispatch({type: SIDEBAR_OPEN})
  }

  const closeSideBar = () =>{
    dispatch({type: SIDEBAR_CLOSE})
  }

  return (
    <ProductsContext.Provider value={{...state, openSideBar, closeSideBar, getSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
