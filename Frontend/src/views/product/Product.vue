<!-- dinh nghi trang hien thi danh sach cac lien he -->

<template>
    <SliderBar />
    <div class="page ">
        <div style="margin-left: 500px; margin-bottom: 10px;">
            <InputSearch v-model="searchText" style="width: 600px; " />
        </div>
        <div>

            <h4 style="text-align: center; font-size: 30px;margin-top: 20px; margin-bottom: 20px;">
                <i class="fas fa-list"></i>
                DANH SÁCH SẢN PHẨM

            </h4>
            <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts" v-model:activeIndex="activeIndex" />
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-center align-items-center">
                <button style="margin-left: 20px;" class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fa-sharp fa-solid fa-rotate-right"></i> Làm mới
                </button>
                <button style="margin-left: 20px;" class="btn btn-sm btn-success" @click="goToAddProduct">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button style="margin-left: 20px;" class="btn btn-sm btn-danger" @click="removeAllProducts">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
    </div>
</template>


<script>

import SliderBar from "@/components/SliderBar.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/product/ProductList.vue";
import ProductService from "@/services/Product.service";
export default {
    components: {
        // ProductCard,
        InputSearch,
        ProductList,
        SliderBar
    },
    data() {
        return {
            products: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.products.map((product) => {
                const { nameProduct, price, id_brand, imageProduct, description } = product;
                return [nameProduct, price, id_brand, imageProduct, description].join("");
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
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
        },
        async removeAllProducts() {
            if (confirm("Bạn muốn xóa tất cả sản phẩm?")) {
                try {
                    await ProductService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddProduct() {
            this.$router.push({ name: "product.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: center;
    /* max-width: 750px; */
}
</style>