const { ObjectId } = require("mongodb");

class ProjectService {
    constructor(client) {
        this.Project = client.db().collection("projects");
    }
    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractProjectData (payload) {
        const project = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        //Remove undefined fields
        Object.keys(project).forEach((key) => {
            project[key] === undefined && delete project[key]
        });
        return project;
    }

    async create(payload){
        const project = this.extractProjectData(payload);
        const result = await this.Project.findOneAndUpdate(
            project,
            { $set: {favorite: project.favorite === true }, },
            { returnDocument: "after", upsert: true }   
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Project.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.Project.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractProjectData(payload);
        const result = await this.Project.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }
    async delete(id) {
        const result = await this.Project.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    async deleteAll() {
        const result = await this.Project.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ProjectService;