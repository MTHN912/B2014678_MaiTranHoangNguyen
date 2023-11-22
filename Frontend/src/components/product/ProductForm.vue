<template>
    <Form @submit="submitProduct" :validation-schema="productFormSchema"
        style="width: 500px; margin-left: 550px; border: 1px solid #9C9C9C; background-color: #EAEAEA;">
        <div class="form-group">
            <label for="nameProduct" class="font" style="margin-left: 10px;">Tên sản phẩm</label>
            <Field name="nameProduct" type="text" class="form-control" v-model="productLocal.nameProduct"
                style="width: 480px; margin-left: 10px;" />
            <ErrorMessage name="nameProduct" class="error-feedback" style="color: red;" />
        </div>

        <div class="form-group">
            <label for="price" class="font" style="margin-left: 10px;">Giá</label>
            <Field name="price" type="number" class="form-control" v-model="productLocal.price"
                style="width: 480px; margin-left: 10px;" />
            <ErrorMessage name="price" class="error-feedback" style="color: red;" />
        </div>

        <div class="form-group">
            <label for="imageProduct" class="font" style="margin-left: 10px;">Hình</label>
            <Field name="imageProduct" type="text" class="form-control" v-model="productLocal.imageProduct"
                style="width: 480px; margin-left: 10px;" />
            <ErrorMessage name="imageProduct" class="error-feedback" style="color: red;" />
        </div>

        <div style="display: none ;" class="form-group">
            <label for="id_brand" class="font" style="margin-left: 10px;">Danh mục</label>
            <Field name="id_brand" type="text" class="form-control" v-model="productLocal.id_brand"
                style="width: 480px; margin-left: 10px;" />
            <ErrorMessage name="id_brand" class="error-feedback" style="color: red;" />
        </div>

        <div class="form-group">
            <label for="id_brand" class="font" style="margin-left: 10px;">Danh mục</label>
            <select name="id_brand" v-model="productLocal.id_brand" class="form-control"
                style="width: 480px; margin-left: 10px;">
                <option v-for="brand in brands" :value="brand._id">{{ brand.nameBrand }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="description" class="font" style="margin-left: 10px;">Mô tả</label>
            <Field name="description" type="description" class="form-control" v-model="productLocal.description"
                style="width: 480px; height: 100px ; margin-left: 10px;" />
            <ErrorMessage name="description" class="error-feedback" style="color: red;" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary" style="margin-left: 10px;">Lưu</button>
            <button v-if="productLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteProduct">
                Xóa
            </button>
        </div>

    </Form>
</template>


<script>
import * as yup from "yup";
import BrandService from "@/services/brand.service";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:product", "delete:product"],
    props: {
        product: { type: Object, required: true }
    },
    data() {
        const productFormSchema = yup.object().shape({
            nameProduct: yup
                .string()
                .required("Tên sản phẩm phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            price: yup
                .number()
                .required("Giá sản phẩm phải có giá trị.")
                .min(2, "Giá phải ít nhất 2 ký tự.")
                .max(100000000, "Giá tối đa 50 ký tự."),
            description: yup
                .string()
                .max(100, "Địa chỉ tối đa 100 ký tự."),
            imageProduct: yup
                .string()
                .required('Hình phải có giá trị')
                .min(2, "Giá phải ít nhất 2 ký tự."),
            id_brand: yup
                .string()
                .required('Danh mục phải có giá trị')
        })
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // contactLocal để liên kết với các input trên form
            productLocal: this.product,
            productFormSchema,
        };
    },
    methods: {
        submitProduct() {
            this.$emit("submit:product", this.productLocal);
        },
        deleteProduct() {
            this.$emit("delete:product", this.productLocal.id);
        },
        async getBrand() {
            this.brands = await BrandService.getAll()
            //   console.log(this.brands);
        }
    },

    mounted() {
        this.getBrand()
    }
};
</script>
<style scoped>@import "../../assets/productForm.css";</style>