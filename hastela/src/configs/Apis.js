import axios from "axios"
// import cookies from 'react-cookies'

export let endpoints = {
    "categories": "/categories/",
    "products": "/products/",
    "products_detail": (product_id) => `/products/${product_id}/`,
    "cate_detail": (cate_id) => `/categories/${cate_id}/products/`,
    "oauth2-info": "/oauth2-info/",
    "login": "/o/token/",
    "current-user": "/users/current-user/",
    "register": "/users/",
    "comments": (product_id)=> `/products/${product_id}/add-comment/`
}

export default axios.create({
    baseURL:"http://127.0.0.1:8000/",
    // headers: {
    //     'Authorization': `Bearer ${cookies.load('token')}`
    // }
})