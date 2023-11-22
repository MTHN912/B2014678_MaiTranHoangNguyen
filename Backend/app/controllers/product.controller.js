const ApiError = require("../api-error");
const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const { request } = require("express");

exports.create = async (req, res, next) => { //Create and save new contact
    if (!req.body?.nameProduct) {
        return next(
            new ApiError(400, "Name can not be empty")
        );
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the product")
        );
    }
};

// retrieve all contacts of a use from the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const productService = new ProductService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await productService.findByName(name);
        } else {
            documents = await productService.find({});
        }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving Products")
        );
    }

    return res.send(documents);
};

// find a single contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "product not found"));
        }
        return res.send(document);

    }
    catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving product with id = ${req.params.id}`
            )
        );
    }
};

//update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.send({ message: 'Product was updated successfully' });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error updating product with id ${req.params.id}`
            )
        );
    }
};


// exports.update = (req, res) => {
//     res.send({message: "update handler"})
// }

// delete a contact with the specified id the request
exports.delete = async (req, res) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "product not found"));
        }
        return res.send({ message: "product was deleted successfully" });
    }
    catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete product with id=${req.params.id}`
            )
        );
    }
};

// delete all contact with the specified id the request
exports.deleteAll = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deletedCount = await productService.deleteAll();
        return res.send({
            message: `${deletedCount} products were deleted successfully`,
        });
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all products")
        )
    }
};

//find all favorite contact with the specified id the request
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const documents = await productService.findFavorite();
        return res.send(documents);
    }
    catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite products"
            )
        );
    }
};

exports.filterProduct = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client)
        const document = await productService.filterProduct(req.params.id)
        return res.send(document)
    } catch (e) {
        return next(new ApiError(500, "loi"))
    }
}
