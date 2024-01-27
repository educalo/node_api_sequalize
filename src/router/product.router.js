const router = require("express").Router();
const { faker } = require("@faker-js/faker");

const Products = require("../model/product.model");

//las peticiones get las podemos hacer desde nuestro navegador, las peticiones post, put y delete debemos hacerlo con una herramienta tipo postman
//findAll todos los elementos de la tabla products
//devuelve un json, true, 200, produtcs
//con la herramienta postman con metodo GET http://localhost:3001/api/v1/productos
router.get("/products", async (req, res) => {
    const products = await Products.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: products,
    });
});

router.get("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const product = await Products.findOne({
        where: {
            product_id: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: product,
    });
});

//cuando haga a traves de postman con metodo POST http://localhost:3001/api/v1/products se creará un produto nuevo cada vez que haga esta llamada
//debe devolver true, 201, created product
router.post("/products", async (req, res) => {
    const dataProducts = req.body;
    await Products.sync();
    const createProduct = await Products.create({
        product_name: dataProducts.product_name,
        price: dataProducts.price,
        is_stock: dataProducts.is_stock,
    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Created Product",
    });
});

router.put("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const dataProducts = req.body;
    const updateProduct = await Products.update(
        {
            product_name: dataProducts.product_name,
            price: dataProducts.price,
            is_stock: dataProducts.is_stock,
        },
        {
            where: {
                product_id: id,
            },
        }
    );
    res.status(200).json({
        ok: true,
        status: 200,
        body: updateProduct,
    });
});

router.delete("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const deleteProduct = await Products.destroy({
        where: {
            product_id: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: deleteProduct,
    });
});

module.exports = router;
