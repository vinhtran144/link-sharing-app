<template>
    <div class="page">
        <img class="logo" src="../assets/images/logo-devlinks-large.svg" alt="Devlink logo" >
        <div class="card" style="min-height: 480px;">
            <div class="title">
                <v-card-title class="text-h4 text-secondary">Login</v-card-title>
                <v-card-subtitle class="text-secondary-lighten-1">Add your details below to get back into the app</v-card-subtitle>
            </div>
            <div class="form">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        components: {
        },

        mounted () {
            console.log(this.$vuetify.display.width)
            },
    }
</script>

<style scoped>
.page{
    background: rgb(var(--v-theme-surface));
    min-height: 100dvh;
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: center;
}
/* h1{
    font-size: 24px;
    font-weight: bold;
    color: rgb(var(--v-theme-secondary));
} */
.card {
    background: rgb(var(--v-theme-surface));
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.logo {
    margin-right: auto;
    padding: 40px 0px;
}
@media (min-width:500px) {
    /* h1{
        font-size: 32px;
    } */
    .page{
        background: rgb(var(--v-theme-background));
        justify-content: center;
    }
    .logo {
        margin-right: 0;
        padding-top: 0px;
    }

}
</style>