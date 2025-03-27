const URL_List_Products = 'https://dummyjson.com/products/search';
const URL_Deatil_Products = 'https://dummyjson.com/products';
import  axios  from 'axios';

const serviceApi = {
    getListProduct: async()=> {
        const res = await axios.get(URL_List_Products);
        return res.data;
    },
    getDetailProduct: async (id)=> {
        const res = await axios.get(`${URL_Deatil_Products}/${id}`)
        return res.data;
    },
    getCategory: async (category)=> {
        const res = await axios.get(`${URL_Deatil_Products}/category/${category}`);
        return res.data;
    },
    getListCategory: async ()=> {
        const res = await axios.get(`${URL_Deatil_Products}/categories`);
        return res.data;
    },
    getProduct: async(url)=> {
        const res = await axios.get(url);
        return res.data;
    },
    searchProduct: async(tmp)=> {
        const res = await axios.get(`${URL_List_Products}?q=${tmp}`);
        return res.data;
    }
};
export default serviceApi;
