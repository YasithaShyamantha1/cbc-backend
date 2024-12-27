import Product from '../Models/product.js';
function isAdmin(req) {
    return req.user && req.user.type === 'admin'; // Adjust 'type' to match your user schema
}


export function createProduct(req,res){
    if(isAdmin(req)){
        res.json({
            message: "Please login as Admin to add products"
        })
        return
        
    }
    const newProductData = req.body

    const product = new Product(newProductData)

        //console.log(req.user)
       // const product = new Product(req.body)
        product.save().then(()=>{
            res.json({
                message: "Product Created"
            })
        }).catch((error) => {
            res.json({
                message: error.message,
            });
        });
    }
    export function getProduct(req, res) {
        Product.find({})
          .then((product) => {
            res.json(product);
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message,
            });
          });
      }
    
    