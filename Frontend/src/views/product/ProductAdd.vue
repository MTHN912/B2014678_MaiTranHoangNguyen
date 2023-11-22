
<template>
    <SliderBar />
    <div v-if="product" class="page">
        <h4
            style="text-align: center; font-family: 'Courier New', Courier, monospace; font-weight: bolder; font-size:30px; margin-bottom: 20px;">
            THÊM SẢN PHẨM</h4>
        <ProductForm :product="product" @submit:product="createProduct" @delete:product="deleteProduct" />
        <p style="text-align: center;color: blue; margin-top: 10px; margin-bottom: 10px;">{{ message }}</p>
    </div>
</template>
<script>
import SliderBar from "@/components/SliderBar.vue";
import ProductForm from "@/components/product/ProductForm.vue";
import ProductService from "@/services/Product.service";
export default {
    components: {
        ProductForm,
        SliderBar
    },
    data() {
        return {
            product: {},
            message: "",
        };
    },
    methods: {

        async createProduct(data) {
            try {
                await ProductService.create(data);
                this.message = "Sản phẩm được thêm thành công!!!";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct() {
            if (confirm("Bạn muốn xóa sản phẩm này?")) {
                try {
                    await ProductService.delete(this.product._id);
                    this.$router.push({ name: "product" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
};
</script>