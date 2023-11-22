<template>
    <div v-if="account" >
        <h3 class="text-center text-info">ĐĂNG KÍ</h3>
            <AccountForm
                :account="account"
                @submit:account="createAccount"
                @delete:account="deleteAccount"
        />
        <p style="text-align: center;color: blue; margin-top: 10px; margin-bottom: 10px;">{{ message }}</p>
    </div>
</template>
<script>
    import AccountForm from "@/components/account/AccountForm.vue";
    import AccountService from "@/services/Account.service";
    export default {
        components: {
         AccountForm,
        },
        data() {
            return {
                account: {},
                message: "",
            };
        },
        methods: {

            async createAccount(data) {
                try {
                    await AccountService.create(data);
                    this.message = "Bạn đã đăng ký thành công!!!";
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteAccount() {
                if (confirm("Bạn muốn xóa tài khoản này?")) {
                    try {
                        await AccountService.delete(this.account._id);
                        this.$router.push({ name: "account" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
    };
</script>