import Product from '../Models/product.js';
function isAdmin(req) {
    return req.user && req.user.type === 'admin'; // Adjust 'type' to match your user schema
}


export function createProduct(req, res) {
    if (isAdmin(req)) {
        res.json({
            message: "Please login as Admin to add products"
        })
        return

    }
    const newProductData = req.body

    const product = new Product(newProductData)

    //console.log(req.user)
    // const product = new Product(req.body)
    product.save().then(() => {
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

export function deleteProduct(req, res) {
    if (isAdmin(req)) {
        res.status(403).json({
            message: "please login as Administrator"
        })
        return
    }

    const productId = req.params.productId

    Product.deleteOne(
        { productId: productId }
    ).then(() => {
        res.json({
            message: "Product Deleted!"
        })
    }).catch((error) => {
        res.status(403).json({
            message: error
        })
    })
}
export function updateProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Please login as Administrator",
        });
        return;
    }

    const productId = req.params.productId;
    const updatedData = req.body;

    Product.findOneAndUpdate({ productId: productId }, updatedData, { new: true })
        .then((updatedProduct) => {
            if (!updatedProduct) {
                res.status(404).json({
                    message: "Product not found",
                });
            } else {
                res.status(200).json({
                    message: "Product updated successfully",
                    product: updatedProduct,
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message,
            });
        });
}

export async function getProductById(req, res) {
    try {
      const productId = req.params.productId;
  
      const product = await Product.findOne({ productId: productId });
  
      res.json(product);
    } catch (e) {
      res.status(500).json({
        e,
      });
    }
  }
  export async function searchProducts(req, res) {
    const query = req.params.query;
    try {
      const products = await Product.find({
        $or: [
          { productName: { $regex: query, $options: "i" } },
          { altNames: { $elemMatch: { $regex: query, $options: "i" } } },
        ],
      });
  
      res.json(products);
    } catch (e) {
      res.status(500).json({
        e,
      });
    }
  }
