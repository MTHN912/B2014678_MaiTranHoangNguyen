    <template>
        
        <div id="login">
            <div class="container ">
                <div id="login-row" class="row justify-content-center align-items-center">
                    <div id="login-column" class="col-md-6">
                        <div id="login-box" class="col-md-12">
            

                            <Form
                                @submit="submitAccount"
                                :validation-schema="accountFormSchema"
                                >

                                <div class="form-group">
                                    <label for="username" class="text-info">Username:</label><br>
                                    <Field 
                                        type="text" 
                                        name="username" 
                                        id="username" 
                                        class="form-control"  
                                        v-model="accountLocal.username" 
                                    />
                                    <ErrorMessage name="username" class="error-feedback" style="color: red;"/>
                                </div>

                                <div class="form-group">
                                    <label for="email" class="text-info">Email:</label><br>
                                    <Field 
                                        type="text" 
                                        name="email" 
                                        id="email" 
                                        class="form-control"
                                    v-model="accountLocal.email"
                                    />
                                    <ErrorMessage name="email" class="error-feedback" style="color: red;"/>
                                </div>

                                <div class="form-group">
                                    <label for="password" class="text-info">Password:</label><br>
                                    <Field 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    class="form-control"
                                    v-model="accountLocal.password"
                                    />
                                    <ErrorMessage name="password" class="error-feedback" style="color: red;"/>
                                </div>
                                
                                <div class="form-group">
                                    <button class="btn btn-primary">Lưu</button>
                                    <button
                                        v-if="accountLocal._id"
                                        type="button"
                                        class="ml-2 btn btn-danger"
                                        @click="deleteAccount"
                                    >
                                    Xóa
                                    </button>
                                </div>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- </Form> -->



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
    emits: ["submit:account", "delete:account"],
    props: {
        account: { type: Object, required: true }
    },
    data() {
        const accountFormSchema = yup.object().shape({
            username: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup
                .string()
                .required("Password phải có giá trị.")
                .min(2, "Password phải ít nhất 8 ký tự.")
                .max(20, "Password tối đa 20 ký tự."),
        });
        return {
        // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
        // contactLocal để liên kết với các input trên form
        accountLocal: this.account,
        accountFormSchema,
        };
    },
    methods: {
        submitAccount() {
            this.$emit("submit:account", this.accountLocal);
        },
        deleteAccount() {
            this.$emit("delete:account", this.accountLocal.id);
        },
    },
    };
    </script>
    <style scoped>
        @import "../../assets/user/login.css";
    </style>