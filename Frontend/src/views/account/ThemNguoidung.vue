<template>
    <SliderBar/>
    <div v-if="account" class="page" style="height: 500px; " >
        <h4 style="text-align: center; font-family: 'Courier New', Courier, monospace; font-weight: bolder; font-size:30px; margin-bottom: 20px;">THÊM NGƯỜI DÙNG</h4>
            <AccountForm
                :account="account"
                @submit:account="createAccount"
                @delete:account="deleteAccount"
        />
        <p style="text-align: center;color: blue; margin-top: 10px; margin-bottom: 10px;">{{ message }}</p>
    </div>
</template>
<script>
    import SliderBar from "@/components/SliderBar.vue";
    import AccountForm from "@/components/account/AccountForm.vue";
    import AccountService from "@/services/Account.service";
    export default {
        components: {
         AccountForm,
         SliderBar
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
                    this.message = "Người dùng được thêm thành công!!!";
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
    };
</script>