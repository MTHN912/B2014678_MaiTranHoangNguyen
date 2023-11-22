
<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Hình</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Danh mục</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products">

                    <th scope="row"> {{ index + 1 }}</th>
                    <td> {{ product.nameProduct }}</td>
                    <td> <img style="width: 100px; height: fit-content; " :src="`${product.imageProduct}`" /> </td>
                    <td> {{ product.description }}</td>
                    <td> {{ product.brand[0].nameBrand }}</td>
                    <td> {{ product.price }}</td>
                    <td>
                        <router-link :to="{
                            name: 'product.edit',
                            params: { id: product._id },
                        }">
                            <button class="mt-2 btn btn-outline-info">
                                <i class="fas fa-edit"></i></button>
                        </router-link>

                        <button type="button" class="ml-2 btn btn-outline-danger" @click="deleteProduct(product._id)">
                            <i class="fas fa-xmark"></i>
                        </button>
                    </td>
                </tr>


            </tbody>
        </table>
    </div>
</template>


<script>
import ProductService from "@/services/Product.service";

export default {


    props: {

        searchText: "",
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex", "delete:product"],

    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.products.map((product) => {
                const { nameProduct, des } = product;
                return [username, email].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredProducts() {
            if (!this.searchText) return this.products;
            return this.products.filter((_product, index) =>
                this.productStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredProducts[this.activeIndex];
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },

    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },


        async deleteProduct(id) {
            if (confirm("Bạn muốn xóa sản phẩm này?")) {
                try {
                    await ProductService.delete(id);
                    location.reload();
                    await this.$router.push({ name: "product" });
                } catch (error) {
                    console.log(error);
                }
            }

        },

        async getBrand(id) {
            try {
                this.brand = await BrandService.get(id);
            } catch (error) {
                console.log(error);

            }
        }
    }




}

</script>