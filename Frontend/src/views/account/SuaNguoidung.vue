    <template>
        <SliderBar/>
        <div v-if="account" class="page">
            <h4 style="text-align: center; font-family: 'Courier New', Courier, monospace; font-weight: bolder; font-size:30px; margin-bottom: 20px;">HIỆU CHỈNH NGƯỜI DÙNG</h4>
                <AccountForm
                    :account="account"
                    @submit:account="updateAccount"
                    @delete:account="deleteAccount"
            />
            <p style="text-align: center;color: blue; margin-top: 10px; margin-bottom: 10px;">{{ message }}</p>
        </div>
    </template>
    <script>
        import SliderBar from "@/components/SliderBar.vue";
        import AccountForm from "@/components/account/AccountForm.vue";
        import AccountService from "@/services/account.service";
        export default {
            components: {
             AccountForm,
             SliderBar
            },
            props: {
                id: { type: String, required: true },
            },
            data() {
                return {
                    account: null,
                    message: "",
                };
            },
            methods: {
                async getAccount(id) {
                    try {
                        this.account = await AccountService.get(id);
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
                async updateAccount(data) {
                    try {
                        await AccountService.update(this.account._id, data);
                        this.message = "Người dùng đã được cập nhật thành công!!!";
                    } catch (error) {
                        console.log(error);
                    }
                },
                async deleteAccount() {
                    if (confirm("Bạn muốn xóa người dùng này?")) {
                        try {
                            await AccountService.delete(this.account._id);
                            this.$router.push({ name: "account" });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
            },
            created() {
                this.getAccount(this.id);
                this.message = "";
            },
        };
    </script>