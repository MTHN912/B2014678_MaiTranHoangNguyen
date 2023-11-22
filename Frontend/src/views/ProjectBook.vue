<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
             </h4>
            <ProjectList v-if="filteredProjectsCount > 0" :projects="filteredProjects" v-model:activeIndex="activeIndex" />
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddProject">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllProjects">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeProject">
                <h4>
                    Chi tiết Liên hệ
                    <i class="fas fa-address-card"></i>
                </h4>
                <ProjectCard :project="activeProject" />
                <router-link :to="{
                    name: 'project.edit',
                    params: { id: activeProject._id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import ProjectCard from "@/components/ProjectCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProjectList from "@/components/ProjectList.vue";
import ProjectService from "@/services/project.service";
export default {
    components: {
        ProjectCard,
        InputSearch,
        ProjectList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            projects: [],
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
        // Chuyển các đối tượng project thành chuỗi để tiện cho tìm kiếm.
        projectStrings() {
            return this.projects.map((project) => {
                const { name, email, address, phone } = project;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các project có chứa thông tin cần tìm kiếm.
        filteredProjects() {
            if (!this.searchText) return this.projects;
            return this.projects.filter((_project, index) =>
                this.projectStrings[index].includes(this.searchText)
            );
        },
        activeProject() {
            if (this.activeIndex < 0) return null;
            return this.filteredProjects[this.activeIndex];
        },
        filteredProjectsCount() {
            return this.filteredProjects.length;
        },
    },
    methods: {
        async retrieveProjects() {
            try {
                this.projects = await ProjectService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProjects();
            this.activeIndex = -1;
        },
        async removeAllProjects() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await PrjectService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddProject() {
            this.$router.push({ name: "project.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>