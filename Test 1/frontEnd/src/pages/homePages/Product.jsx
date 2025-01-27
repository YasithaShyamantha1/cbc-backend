import axios from "axios"
import { useEffect,useState } from "react"
import toast from "react-hot-toast"

export default function ProductPage(){
    const [products, setProducts]=useState([])
    const [loadingStatus,setLoadingStatus]=useState('loading')

    useEffect(()=>{
        if(loadingStatus==="loading"){
        axios.get(import.meta.env.VITE_BACKEND_URL+"/products").then
        ((res)=>{
            console.log(res.data)
            setProducts(res.data)
            setLoadingStatus('loaded')
        
        
        }
        ).catch
        (
           (err)=> toast.error('fail to fetch products')
        )
    }

    }
    )
    return(
        <div>
            
    
        </div>
    )
}