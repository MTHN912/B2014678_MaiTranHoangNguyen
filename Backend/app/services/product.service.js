const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractProductData(payload) {
        const product = {
            nameProduct: payload.nameProduct,
            price: payload.price,
            id_brand: payload.id_brand,
            imageProduct: payload.imageProduct,
            description: payload.description,
            favorite: payload.favorite,
        };
        // Remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }
    async create(payload) {
        const product = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            product,
            { $set: { favorite: product.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        // const cursor = await this.Product.find(filter);
        // return await cursor.toArray();

        const cursor = await this.Product.aggregate([
            {
                $lookup: {
                    from: 'brands',
                    localField: 'id_brand',
                    foreignField: '_id',
                    as: 'brand'
                }
            }
        ])

        return await cursor.toArray()
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }


    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }


    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.value;
    }


    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }

    async filterProduct(id) {
        const cursor = await this.Product.aggregate([
            {
                $match: {
                    $and: [{ "id_brand": id }]
                }
            }
        ])
        return await cursor.toArray()
    }
}
module.exports = ProductService;