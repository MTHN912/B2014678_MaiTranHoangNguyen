    <template>
        <Form
        @submit="submitBrand"
        :validation-schema="brandFormSchema"
        style="width: 500px; height: 300px;; margin-left: 550px;border: 1px solid #9C9C9C;
  background-color: #EAEAEA;"
        >
            <div class="form-group">
                <label for="nameBrand" style="margin-left: 10px; color: #17a2b8;" >Tên danh mục</label>
                <Field
                    name="nameBrand"
                    type="text"
                    class="form-control"
                    style="width: 480px; margin-left: 10px;"
                    v-model="brandLocal.nameBrand"
                />
                <ErrorMessage name="nameBrand" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="descriptionBrand" style="margin-left: 10px; color: #17a2b8;" >Mô tả</label>
                <Field
                    name="descriptionBrand"
                    type="descriptionBrand"
                    class="form-control"
                    style="height: 70px; width: 480px; margin-left: 10px;"
                    v-model="brandLocal.descriptionBrand"
                />
                <ErrorMessage name="descriptionBrand" class="error-feedback" />
            </div>
             
            <div class="form-group">
                <button class="btn btn-primary" style="margin-left: 10px;">Lưu</button>
                <button
                    v-if="brandLocal._id"
                    type="button"
                    class="ml-2 btn btn-danger"
                    @click="deleteBrand"
                >
                Xóa
                </button>
            </div>
        </Form>
    </template>


    <script>
        import * as yup from "yup";
        import { Form, Field, ErrorMessage } from "vee-validate";
        export default {
            components: {
                Form,
                Field,
                ErrorMessage,
            },
            emits: ["submit:brand", "delete:brand"],
            props: {
                brand: { type: Object, required: true }
            },
            data() {
                const brandFormSchema = yup.object().shape({
                    nameBrand: yup
                        .string()
                        .required("Tên danh mục phải có giá trị.")
                        .min(5, "Tên danh mục phải ít nhất 5 ký tự.")
                        .max(50, "Tên danh mục có nhiều nhất 50 ký tự."),
                    descriptionBrand: yup
                        .string()
                        .required("Mô tả phải có giá trị.")
                        .min(5, "Mô phải ít nhất 10 ký tự.")
                        .max(50, "Mô tả tối đa 50 ký tự."),
                 
                });
                return {
                // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
                // contactLocal để liên kết với các input trên form
                brandLocal: this.brand,
                brandFormSchema,
                };
            },
            methods: {
                submitBrand() {
                    this.$emit("submit:brand", this.brandLocal);
                },
                deleteBrand() {
                    this.$emit("delete:brand", this.brandLocal.id);
                },
            },
        };
    </script>
    <style scoped>
        @import "@/assets/form.css";
    </style>