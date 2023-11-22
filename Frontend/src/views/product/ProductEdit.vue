    <template>
        <SliderBar/>
        <div v-if="product" class="page">
            <h4 style="text-align: center; font-family: 'Courier New', Courier, monospace; font-weight: bolder; font-size:30px; margin-bottom: 20px;">HIỆU CHỈNH SẢN PHẨM</h4>
                <ProductForm
                    :product="product"
                    @submit:product="updateProduct"
                    @delete:product="deleteProduct"
            />
            <p style="text-align: center;color: blue; margin-top: 10px; margin-bottom: 10px;">{{ message }}</p>
        </div>
    </template>

    <script>
        import SliderBar from "@/components/SliderBar.vue";
        import ProductForm from "@/components/product/ProductForm.vue";
        import ProductService from "@/services/product.service";
        export default {
            components: {
             ProductForm,
             SliderBar
            },
            props: {
                id: { type: String, required: true },
            },
            data() {
                return {
                    product: null,
                    message: "",
                };
            },
            methods: {
                async getProduct(id) {
                    try {
                        this.product = await ProductService.get(id);
                    } catch (error) {
                        console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                    }
                },
                async updateProduct(data) {
                    try {
                        await ProductService.update(this.product._id, data);
                        this.message = "Sản phẩm đã được cập nhật thành công!!!";
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
            created() {
                this.getProduct(this.id);
                this.message = "";
            },
        };
    </script>