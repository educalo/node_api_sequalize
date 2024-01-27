const { Sequelize, Model, DataTypes } = require("sequelize");

//partimos de la documentación oficial de Sequialize https://sequelize.org/
//el puerto por defecto de mysql es 3306, se ha puesto otro porque se utiliza un puerto de docker
const sequelize = new Sequelize("product_test", "root", "12345", {
    host: "localhost",
    dialect: "mysql",
    port: 3006,
});

class Product extends Model {}

Product.init(
    {
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
        },
        is_stock: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
        modelName: "Product",
    }
);

module.exports = Product;

// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log("All Good!!")
//     } catch (err) {
//         console.error("All Bad!!", err)
//     }
// }

// testConnection();
