const ApiError = require("../api-error");
const BrandService = require("../services/brand.service");
const MongoDB = require("../utils/mongodb.util");
const { request } = require("express");

exports.create = async (req, res, next) => { //Create and save new contact
    if (!req.body?.nameBrand) {
        return next(
            new ApiError(400, "Name brand can not be empty")
        );
    }
    try {
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the brand")
        );
    }
};

// retrieve all contacts of a use from the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const brandService = new BrandService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await brandService.findByName(name);
        } else {
            documents = await brandService.find({});
        }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving brands")
        );
    }

    return res.send(documents);
};

// find a single contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);

    }
    catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id = ${req.params.id}`
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
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send({ message: 'Brand was updated successfully' });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error updating brand with id ${req.params.id}`
            )
        );
    }
};


// delete a contact with the specified id the request
exports.delete = async (req, res) => {
    try {
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Brand not found"));
        }
        return res.send({ message: "Brand was deleted successfully" });
    }
    catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete brand with id=${req.params.id}`
            )
        );
    }
};

// delete all contact with the specified id the request
exports.deleteAll = async (_req, res, next) => {
    try {
        const brandService = new BrandService(MongoDB.client);
        const deletedCount = await brandService.deleteAll();
        return res.send({
            message: `${deletedCount} brands were deleted successfully`,
        });
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all brands")
        )
    }
};


