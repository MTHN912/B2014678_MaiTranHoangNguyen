<template>
    <div v-if="project" class="page">
        <h4>Thêm Liên hệ</h4>
        <ProjectForm 
            :project="project" 
            @submit:project="addProject" />
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
            project: {},
            message: "",
        };
    },
    methods: {
       
        async addProject(data) {
            try {
                await ProjectService. create(data);
                this.message = "Liên hệ được tạo thành công.";
            } catch (error) {
                console.log(error);
            }
        },
       
    },
    
};
</script>