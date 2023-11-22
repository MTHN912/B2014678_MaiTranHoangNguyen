<!-- dinh nghi trang hien thi danh sach cac lien he -->

<template>
    <SliderBar/>
    <div >
        <div style="margin-left: 500px; margin-bottom: 10px;" >
            <InputSearch v-model="searchText" style="width: 600px; "/>
        </div>
        <div class="mt-3 ">
            <h4 style="text-align: center; font-size: 30px;margin-top: 20px; margin-bottom: 20px;">
                <i class="fas fa-address-book"></i>
                DANH SÁCH NGƯỜI DÙNG
            </h4>
            <AccountList
                v-if="filteredAccountsCount > 0"
                :accounts="filteredAccounts"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 ml-3 mr-3 row justify-content-center align-items-center">
                <button style="margin-left: 20px;" class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fa-sharp fa-solid fa-rotate-right"></i> Làm mới
                </button>
                <button style="margin-left: 20px;" class="btn btn-sm btn-success" @click="goToAddAccount">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button style="margin-left: 20px;"
                    class="btn btn-sm btn-danger"
                    @click="removeAllAccounts"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
    </div>
</template>


    <script>
        import SliderBar from "@/components/SliderBar.vue";
        import AccountCard from "@/components/account/AccountCard.vue";
        import InputSearch from "@/components/InputSearch.vue";
        import AccountList from "@/components/account/AccountList.vue";
        import AccountService from "@/services/Account.service";
        export default {
            components: {
                AccountCard,
                InputSearch,
                AccountList,
                SliderBar
             },
            data() {
                return {
                    accounts: [],
                    activeIndex: -1,
                    searchText: "",
                };
             },
            watch: {
                // Giám sát các thay đổi của biến searchText.
                // Bỏ chọn phần tử đang được chọn trong danh sách.
                searchText() {
                    this.activeIndex = -1;
                },
            },
            computed: {
                // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
                accountStrings() {
                    return this.accounts.map((account) => {
                        const { username, email, password} = account;
                        return [username, email, password].join("");
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
                async retrieveAccounts() {
                    try {
                        this.accounts = await AccountService.getAll();
                    } catch (error) {
                        console.log(error);
                    }
                },
                refreshList() {
                    this.retrieveAccounts();
                    this.activeIndex = -1;
                },
                async removeAllAccounts() {
                    if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                        try {
                            await AccountService.deleteAll();
                            this.refreshList();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
                goToAddAccount() {
                     this.$router.push({ name: "account.add" });
                },
            },
            mounted() {
                this.refreshList();
            },
        };
    </script>

    <style scoped>
    .page {
        text-align: center;
        
    } 
    @import "../../assets/form.css";
    </style>