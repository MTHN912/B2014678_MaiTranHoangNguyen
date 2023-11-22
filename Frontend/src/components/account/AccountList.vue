
<template>
    <div class="container pl-5">
        
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Họ Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(account, index) in accounts"
                      
                   >
                    
                    <th scope="row"> {{ index + 1 }}</th>
                    <td> {{ account.username }}</td>
                    <td> {{ account.email }}</td>
                    <td>
                        <router-link :to="{
                            name: 'account.edit',
                            params: { id: account._id },
                        }">
                            <button class="mt-2 btn btn-outline-info">
                                <i class="fas fa-edit"></i></button>
                        </router-link>

                        <button type="button" class="ml-2 btn btn-outline-danger" @click="deleteAccount(account._id)">
                            <i class="fas fa-xmark"></i>
                        </button>


                    </td>
                </tr>


            </tbody>
        </table>
    </div>

</template>


<script>
import AccountService from "@/services/account.service";

export default {


    props: {
        searchText: "",
        accounts: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex", "delete:account"],

    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        accountStrings() {
            return this.accounts.map((contact) => {
                const { name, email, address, phone } = contact;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredAccounts() {
            if (!this.searchText) return this.accounts;
            return this.accounts.filter((_account, index) =>
                this.accountStrings[index].includes(this.searchText)
            );
        },
        activeAccount() {
            if (this.activeIndex < 0) return null;
            return this.filteredAccounts[this.activeIndex];
        },
        filteredAccountsCount() {
            return this.filteredAccounts.length;
        },
    },

    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },

        async deleteAccount(id) {
                    if (confirm("Bạn muốn xóa người dùng này?")) {
                        try {
                            await AccountService.delete(id);
                            location.reload();
                            await this.$router.push({ name: "account" });
                        } catch (error) {
                            console.log(error);
                        }
                    }

                },


    }




};
</script>