<template>
    <SliderBar/>
    <div v-if="brand" class="page" >
        <h4 style="text-align: center; font-family: 'Courier New', Courier, monospace; font-weight: bolder; font-size:30px; margin-bottom: 20px;">THÊM DANH MỤC</h4>
            <BrandForm
                :brand="brand"
                @submit:brand="createBrand"
                @delete:brand="deleteBrand"
        />
        <p style="text-align: center;color: blue; margin-top: 10px; margin-bottom: 10px;">{{ message }}</p>
    </div>
</template>
<script>
    import SliderBar from "@/components/SliderBar.vue";
    import BrandForm from "@/components/brand/BrandForm.vue";
    import BrandService from "@/services/Brand.service";
    export default {
        components: {
         BrandForm,
         SliderBar
        },
        data() {
            return {
                brand: {},
                message: "",
            };
        },
        methods: {

            async createBrand(data) {
                try {
                    await BrandService.create(data);
                    this.message = "Danh mục đã được thêm thành công!!!";
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
    };
</script>