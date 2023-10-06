<!-- A v-dialog component that is displayed by itself without needed an activator button, taking a props to 
know if it's activated and emits an event when closed so the parent can toggle the prop-->

<script setup>
    import { toRef } from 'vue';
    import solidBtn from '@/components/buttons/solidBtn.vue'

    const props = defineProps({
        isShown: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Oh snap!'
        },
        text: {
            type: String,
            default: 'Something went wrong!'
        }
    });

    // Since v-model can't take a props, we can only pass a local ref that has the props value
    // Create a local isShownRef ref that keeps tracks of the prop's isShown value
    const isShownRef = toRef(props,'isShown');

    // emits an event for the parent to toggle isShown prop
    const emit = defineEmits(['MessageClosed']);

    const handleClose = () => {
        emit('MessageClosed');
    }
   
</script>

<template>
    <v-dialog
        v-model="isShownRef"
        width="300px"
        class="text-center"
        >
        <v-card>
            <v-icon id="errorIcon" color="primary">mdi-alert</v-icon>
            <v-card-title id="cardTitle">{{ title }}</v-card-title>
            <v-card-text id="cardText">
                <!-- The email or password you entered is incorrect -->
                {{ text }}
            </v-card-text>
            <v-card-actions id="actionBtn">
                <solidBtn 
                        buttonText="dismiss"
                        @buttonCLicked="handleClose"
                        
                    />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
#errorIcon {
    font-size: 80px;
    margin: 0 auto;
    margin-top: 25px;
}
#actionBtn {
    padding: 0;
    background-color: rgb(var(--v-theme-primary));
    transition: 0.3s;
}
#actionBtn:hover {
    background-color: rgb(var(--v-theme-primary-lighten-1));
    
}
#cardTitle{
    padding-bottom: 0px;
}
#cardText{
    padding-top: 0px;
    padding-bottom: 25px;
}
</style>