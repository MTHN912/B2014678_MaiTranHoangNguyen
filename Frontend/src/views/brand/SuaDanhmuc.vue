    <template>
        <SliderBar/>
        <div v-if="brand" class="page">
            <h4 style="text-align: center; font-family: 'Courier New', Courier, monospace; font-weight: bolder; font-size:30px; margin-bottom: 20px;">HIỆU CHỈNH DANH MỤC</h4>
                <BrandForm
                    :brand="brand"
                    @submit:brand="updateBrand"
                    @delete:brand="deleteBrand"
            />
            <p style="text-align: center;color: blue; margin-top: 10px; margin-bottom: 10px;">{{ message }}</p>
        </div>
    </template>
    <script>
        import SliderBar from "@/components/SliderBar.vue";
        import BrandForm from "@/components/brand/BrandForm.vue";
        import BrandService from "@/services/brand.service";
        export default {
            components: {
             BrandForm,
             SliderBar
            },
            props: {
                id: { type: String, required: true },
            },
            data() {
                return {
                    brand: null,
                    message: "",
                };
            },
            methods: {
                async getBrand(id) {
                    try {
                        this.brand = await BrandService.get(id);
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
                async updateBrand(data) {
                    try {
                        await BrandService.update(this.brand._id, data);
                        this.message = "Danh mục được cập nhật thành công!!!";
                    } catch (error) {
                        console.log(error);
                    }
                },
                async deleteBrand() {
                    if (confirm("Bạn muốn xóa Danh mục này?")) {
                        try {
                            await BrandService.delete(this.brand._id);
                            this.$router.push({ name: "brand" });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
            },
            created() {
                this.getBrand(this.id);
                this.message = "";
            },
        };
    </script>