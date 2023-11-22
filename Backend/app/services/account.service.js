const { ObjectId } = require("mongodb");

class AccountService {
    constructor(client) {
        this.Account = client.db().collection("accounts");
    }
// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
   extractAccountData(payload) {
        const account = {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            deleted: payload.deleted,
        };
        // Remove undefined fields
        Object.keys(account).forEach(
            (key) => account[key] === undefined && delete account[key]
        );
        return account;
    }
    async create(payload) {
        const account = this.extractAccountData(payload);
        const result = await this.Account.findOneAndUpdate(
            account,
            { $set: { deleted: account.deleted === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Account.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(username), $options: "i" },
        });
    }
    
     
    async findById(id) {
        return await this.Account.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractAccountData(payload);
        const result = await this.Account.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.value;
    }
 
   
   async delete(id) {
    const result = await this.Account.findOneAndDelete({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
   } 
   
    async findDelete(){
        return await this.find({deleted: true});
    }

    async deleteAll(){
       const result = await this.Account.deleteMany({});
       return result.deletedCount;
    }


    async register(payload) {
        const account = this.extractAccountData(payload);
        const result = await this.Account.findOneAndUpdate(
            account,
            { $set: { deleted: account.deleted === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }


    async login(email, username, pass) {
        const result = await this.Account.aggregate([
           {
            $match: {$and: [{email:email}, {username : username}, { password: pass}]}
           }
        ]);
        return await result.toArray();
    }

    async exitsAccount (filter) {
        const acc = await this.Account.aggregate([
            {
                $match: {email : filter}
            }            
        ]);
        return await acc.toArray()
    }

}
module.exports = AccountService;