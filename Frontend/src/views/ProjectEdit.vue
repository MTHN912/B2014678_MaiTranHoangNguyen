<template>
    <div v-if="project" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ProjectForm :project="project" @submit:project="updateProject" @delete:project="deleteProject" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ProjectForm from "@/components/ProjectForm.vue";
import ProjectService from "@/services/project.service";
export default {
    components: {
        ProjectForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            project: null,
            message: "",
        };
    },
    methods: {
        async getProject(id) {
            try {
                this.project = await ProjectService.get(id);
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
        async updateProject(data) {
            try {
                await ProjectService.update(this.project._id, data);
                this.message = "Liên hệ được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProject() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await ProjectService.delete(this.project._id);
                    this.$router.push({ name: "projectbook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getProject(this.id);
        this.message = "";
    },
};
</script>