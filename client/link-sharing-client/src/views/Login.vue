<script setup>
    import { ref, reactive } from 'vue';
    const rules = reactive({
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 characters',
    });
    const visible= ref(false);

</script>

<template>
    <div class="page">
        <img class="logo" src="../assets/images/logo-devlinks-large.svg" alt="Devlink logo" >
        <div class="card" >
            <div class="title  py-10 px-8">
                <v-card-title class="text-h4 text-secondary pa-0">Login</v-card-title>
                <v-card-subtitle class="text-secondary-lighten-1 px-0 pt-2">Add your details below to get back into the app</v-card-subtitle>
            </div>
            <div class="form pb-8 ">
                    <v-text-field
                        variant="outlined"
                        :rules="[rules.required]"
                        hint="e.g. alex@email.com"
                        persistent-hint
                        class="px-8 pb-6"
                        label="Email"
                        color="primary"
                        density="comfortable"
                        prepend-inner-icon="customIcon:email"
                    ></v-text-field>
                    
                    <v-text-field
                        variant="outlined"
                        :rules="[rules.required, rules.min]"
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'"
                        @click:append-inner="visible = !visible"
                        hint="At least 8 characters"
                        persistent-hint
                        class="px-8 pb-6"
                        label="Password"
                        color="primary"
                        density="comfortable"
                        prepend-inner-icon="customIcon:password"
                    ></v-text-field>
                    <div class="px-8 pb-6">
                        <v-hover v-slot:default="{ isHovering, props }">
                            <v-btn
                            v-bind="props"
                            block class="py-6 bg-primary"
                            :class="isHovering ? 'py-6 bg-primary-lighten-1 text-surface': 'py-6 bg-primary'"
                            >
                                Login
                            </v-btn>

                        </v-hover>

                    </div>
                    <div class="newAccLink">
                        <v-card-subtitle class="text-secondary-lighten-1 px-0 py-1 pr-1">Don't have an account?</v-card-subtitle>
                        <v-card-subtitle class=" px-0 py-1 "><a href="/signup" class="text-primary text-decoration-none" target="_self">Create an account</a></v-card-subtitle>

                    </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page{
    background: rgb(var(--v-theme-surface));
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.card {
    background: rgb(var(--v-theme-surface));
    width: 100%;
    max-width: 480px;
}
.logo {
    margin-right: auto;
    padding: 0px 32px;
}
.newAccLink {
    display: inline-block;
    text-align: center;
    /* margin: 0 auto; */
    width: 100%;
}
@media (min-width:500px) {
    /* h1{
        font-size: 32px;
    } */
    .page{
        background: rgb(var(--v-theme-background));
    }
    .logo {
        margin-right: 0;
        padding-bottom: 40px;
    }
    .newAccLink{
        display: flex;
        justify-content: center;
    }
}
</style>