const ApiError = require("../api-error");
const AccountService = require("../services/account.service");
const MongoDB = require("../utils/mongodb.util");
const { request } = require("express");

exports.create = async (req, res, next) => { //Create and save new contact
    if (!req.body?.username) {
        return next(
            new ApiError(400, " Username can not be empty")
        );
    }
    try {
        const accountService = new AccountService(MongoDB.client);
        const document = await accountService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the account")
        );
    }
};



// retrieve all contacts of a use from the database
exports.findAll = async (req,res,next) => {
   let documents = [];
   try {
    const accountService = new AccountService(MongoDB.client);
    const {name} = req.query;
    if(name){
        documents = await accountService.findByName(username);
    }else {
        documents = await accountService.find({});
    }
   }
   catch(error){
      return next (
        new ApiError(500, "An error occurred while retrieving accounts")
      );
   }

   return res.send(documents);
};

// find a single contact with an id
exports.findOne = async (req, res,next) => {
    try {
      const accountService = new AccountService(MongoDB.client);
      const document = await accountService.findById(req.params.id);
      if (!document){
        return next(new ApiError(404, "Account not found"));
      }
      return res.send(document);

    }
    catch (error){
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
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }
    try {
        const accountService = new AccountService(MongoDB.client);
        const document = await accountService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Account not found'));
        }
        return res.send({message: 'Account was updated successfully'});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error updating account with id ${req.params.id}`
            )
        );
    }
};




// delete a contact with the specified id the request
exports.delete = async (req,res)=> {
    try {
        const accountService = new AccountService(MongoDB.client);
        const document = await accountService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Account not found"));
        }
        return res.send({ message: "Account was deleted successfully"});
    }
    catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete account with id=${req.params.id}`
            )
        );
    }
};

// delete all contact with the specified id the request
exports.deleteAll = async ( _req,res, next)=> {
     try {
        const accountService = new AccountService(MongoDB.client);
        const deletedCount = await accountService.deleteAll();
        return res.send({
            message: `${deletedCount} accounts were deleted successfully`, 
        });
     }
     catch(error) {
        return next(
            new ApiError(500, "An error occurred while removing all accounts")
        )
     }
};




exports.register = async (req, res, next) => { //Create and save new contact
    if (!req.body?.username) {
        return next(
            new ApiError(400, " Username can not be empty")
        );
    }
    if (!req.body?.email) {
        return next(
            new ApiError(400, " Email can not be empty")
        );
    }
    try {
        const accountService = new AccountService(MongoDB.client);
        const document = await accountService.register(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the account")
        );
    }
 
};

exports.login = async (req, res, next) => {
    try {
         const accountServer = new AccountService(MongoDB.client);
         const document = await accountServer.login(req.body.email, req.body.username, req.body.password);
         const session = req.session;
         session.password  = document[0].password;
         session.username  = document[0].username;
         session.email  = document[0].email;
        //console.log(document);
        // console.log(session);
         return res.send(document);
    }
    catch(error) {
        return next(
            new ApiError(500, "Đăng nhập không thành công")
        //res.send({"document"})
        );  
        
     
    }
};


exports.findByEmail = async (req, res, next) => {
    try {
        const accountServer = new AccountService(MongoDB.client);
        const document = await accountServer.exitsAccount(req.params.email);

        //console.log(document[0]);
        document[0] ? res.send({ exitsAcc: true}) : res.send({ exitsAcc: false})

    }
    catch(error) {
        return next(
            new ApiError(500, "Loi roi tr oi")
        );   
    }
};
