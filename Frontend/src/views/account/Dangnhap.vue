<template>
    <div v-if="account" >
        <h3 class="text-center text-info">ĐĂNG NHẬP</h3>
            <AccountForm
                :account="account"
                @submit:account="loginAccount"
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
                async loginAccount(emitPayload) {
                    const exitsAcc = await AccountService.checkExitsAcc(emitPayload.email);

                 
                    if(exitsAcc) {
                           //console.log(emitPayload); 
                           
                        const account = await AccountService.login(emitPayload.email, emitPayload.username, emitPayload.password)
                        //console.log(account);
                        if(account) {
                            this.$cookies.set('user', account);
                            console.log(this.$cookies.get('user'));
                            
                        
                            await this.$router.push({name: 'user'});
                            location.reload();
                        }     
  
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

<style>
 @import "../../assets/user/login.css";
</style> 