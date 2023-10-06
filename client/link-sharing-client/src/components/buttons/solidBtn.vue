<script setup>
    const props = defineProps({
        isLoading: {
            type: Boolean,
            default: false
        },
        buttonText: {
            type: String
        }
    });
    const emit = defineEmits(['buttonCLicked']);

    const handleClick = () => {
        emit('buttonCLicked');
    }
</script>

<template>
    <!-- Using v-hover with v-slot to customized how the buttons will look -->
    <v-hover v-slot:default="{ isHovering, props }">
        <v-btn
        @click="handleClick"
        type="submit"
        v-bind="props"
        block class="py-6 bg-primary"
        :class="isHovering ? 'py-6 bg-primary-lighten-1 text-surface': 'py-6 bg-primary'"
        >
            {{ buttonText }}
        </v-btn>

    </v-hover>
</template>