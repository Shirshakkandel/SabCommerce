import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../actionTypes"

const productListReducer = (state = { products: [] }, action) => {
     const { type, payload } = action
    
     switch (type) {
          case PRODUCT_LIST_REQUEST:
               return {loading:true,products:[]}
          case PRODUCT_LIST_SUCCESS:
               // const { products, pages, page } = action.payload
               return {
                    loading: false,
                    products: action.payload.products,
                    pages: action.payload.pages,
                    page: action.payload.page}
          case PRODUCT_LIST_FAIL:
               return { loading: false, error: payload }
          default:
               return state
     }
}

const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
     switch (action.type) {
          case PRODUCT_DETAILS_REQUEST:
               return { ...state, loading: true }
          
          case PRODUCT_DETAILS_SUCCESS:
               return { loading: false, product: action.payload }
          case PRODUCT_DETAILS_FAIL:
               return { laoding: false, error: action.payload }
          default:
               return state
     }
}
export {productListReducer, productDetailsReducer}