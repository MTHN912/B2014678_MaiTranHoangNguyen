<script>
export default {
    props: {
        project: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ project.name }}
        </div>
        <div class="p-1">
            <strong>E-mail:</strong>
            {{ project.email }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ project.address }}
        </div>
        <div class="p-1">
            <strong>Điện thoại:</strong>
            {{ project.phone }}
        </div>
        <div class="p-1">
            <strong>Liên hệ yêu thích:&nbsp;</strong>
            <i v-if="project.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>