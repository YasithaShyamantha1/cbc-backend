import Product from "../Models/product.js";


export function getProduct(req,res){
Product.find().then(

    (productList)=>{
        res.json({
            list:productList 
        })
    }
)
}
export function createProduct(req,res){
    console.log(req.user)
    const product = new Product(req.body)
    product.save().then(()=>{
        res.json({
            message: "Product Created"
        })
    }

    )
}
export function deleteProduct(req,res){
    Product.deleteOne({name: req.body.name}).then(()=>{
        res.json(
            {
            message: "Product Deleted successfully"
            })
    })
}
export function getProductByName(res,req){
    const name= req.body.name;

    productRouter.propfind({name : name})
}