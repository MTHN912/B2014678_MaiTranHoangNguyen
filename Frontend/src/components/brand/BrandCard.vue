<script>
    export default {
        props: {
            account: { type: Object, required: true },
        },
    };
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ account.username }}
        </div>
        <div class="p-1">
            <strong>E-mail:</strong>
            {{ account.email }}
        </div>
    </div>
</template>