const { ObjectId } = require("mongodb");

class BrandService {
    constructor(client) {
        this.Brand = client.db().collection("brands");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractBrandData(payload) {
        const brand = {
            nameBrand: payload.nameBrand,
            descriptionBrand: payload.descriptionBrand,
            deleted: payload.deleted,
        };
        // Remove undefined fields
        Object.keys(brand).forEach(
            (key) => brand[key] === undefined && delete brand[key]
        );
        return brand;
    }
    async create(payload) {
        const brand = this.extractBrandData(payload);
        const result = await this.Brand.findOneAndUpdate(
            brand,
            {
                $set: {
                    deleted: brand.deleted === true,
                    _id: `brand_${Date.now()}`
                }
            },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Brand.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }


    async findById(id) {
        return await this.Brand.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }


    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractBrandData(payload);
        const result = await this.Brand.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.value;
    }


    async delete(id) {
        const result = await this.Brand.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Brand.deleteMany({});
        return result.deletedCount;
    }


}
module.exports = BrandService;