<script>
export default {
    props: {
        projects: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(project, index) in projects" :key="project._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ project.name }}
        </li>
    </ul>
</template>