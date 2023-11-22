const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ProjectService = require("../services/project.service");
const { ObjectId } = require("mongodb");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const projectService = new ProjectService(MongoDB.client);
        const document = await projectService.create(req.body);
        console.log(document)
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, "An error occured while creating the project")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let document = [];

    try{
        const projectService = new ProjectService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await projectService.findByName(name);
        } else {
            documents = await projectService.find({});
        }
    }catch (error){
        return next(
            new ApiError(500, "An error occured while retrieving projects")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try{
        const projectService = new ProjectService (MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document){
            return next (new ApiError(404, "Project not found"));
        }
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving project with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }
    try {
        const projectService = new ProjectService(MongoDB.client);
        const document = await projetcService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Project not found'));
        }
        return res.send({message: 'Project was updated successfully'});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error updating project with id ${req.params.id}`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const projectService = new ProjectService(MongoDB.client);
        const document = await projectService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, `Project not found`));
        }
        return res.send({message: 'Project was deleted successfully'});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete project with id ${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res) => {
    try {
        const projectService = new ProjectService(MongoDB.client);
        const deletedCount = await projectService.deleteAll();
        return res.send({
            message: `${deletedCount} projects were deleted successfully}`,
        });
    } catch (error) {
        return next(
            new ApiError(500, 'An error occurred while removing all projects'),
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const projectService = new ProjectService(MongoDB.client);
        const document = await projectService.findFavorite();
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorites projects"
            )
        );
    }
};