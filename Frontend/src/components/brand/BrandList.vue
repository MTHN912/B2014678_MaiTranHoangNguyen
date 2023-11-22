
<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên danh mục</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(brand, index) in brands">

                    <th scope="row"> {{ index + 1 }}</th>
                    <td> {{ brand.nameBrand }}</td>
                    <td> {{ brand.descriptionBrand }}</td>
                    <td>
                        <router-link :to="{
                            name: 'brand.edit',
                            params: { id: brand._id },
                        }">
                            <button class="mt-2 btn btn-outline-info">
                                <i class="fas fa-edit"></i></button>
                        </router-link>

                        <button type="button" class="ml-2 btn btn-outline-danger" @click="deleteBrand(brand._id)">
                            <i class="fas fa-xmark"></i>
                        </button>


                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import BrandService from "@/services/brand.service";

export default {


    props: {
        searchText: "",
        brands: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex", "delete:brand"],

    computed: {
        // Chuyển các đối tượng brand thành chuỗi để tiện cho tìm kiếm.
        brandStrings() {
            return this.brands.map((brand) => {
                const { nameBrand, descriptionBrand } = brand;
                return [nameBrand, descriptionBrand].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredBrands() {
            if (!this.searchText) return this.brands;
            return this.brands.filter((_brand, index) =>
                this.brandStrings[index].includes(this.searchText)
            );
        },
        activeBrand() {
            if (this.activeIndex < 0) return null;
            return this.filteredBrands[this.activeIndex];
        },
        filteredBrandsCount() {
            return this.filteredBrands.length;
        },
    },

    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },

        async deleteBrand(id) {
            if (confirm("Bạn muốn xóa danh mục này?")) {
                try {
                    await BrandService.delete(id);
                    location.reload();
                    await this.$router.push({ name: "brand" });
                } catch (error) {
                    console.log(error);
                }
            }

        },


    }




};
</script>