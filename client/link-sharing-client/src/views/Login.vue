<script setup>
    import { ref, reactive } from 'vue';
    import { login } from '@/requestUtils/restRequest';
    import solidBtn from '@/components/buttons/solidBtn.vue'
    import errorMsg from '@/components/popupMsg/errorMsg.vue'

    const viewStatusDialog = ref(false);

    // if the user login with incorrect credentials, they will be redirected to /login?request=failed
    // taking the URL's parameter to display an error box
    const urlParams = new URLSearchParams(window.location.search);
    const requestStatus = urlParams.get('request')
    if (requestStatus=='failed')
        viewStatusDialog.value = true;
    // function to close dialog when button is clicked
    const handleClose = () => {
        viewStatusDialog.value = false
    }

    const rules = reactive({
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 characters',
    });
    const visible= ref(false); // boolean to keep track of the user's password visibility

    // Login forms variables
    const userEmail = ref('');
    const userPassword = ref('');

    // login user once the button is clicked
    async function loginUser() {
        // checking for errors, exiting the function if it doesn't satisfy the error
        // the components will handle error reporting, so this function doesn't have to do much
        if ( !userEmail.value || !userPassword.value ) return;
        if ( userPassword.value < 8 ) return;
        try {
            await login(userEmail.value, userPassword.value);
        } catch (e) {
            console.log(e);
            // Currently, the function only return axio errors as after login, the server redirects
            // the users to home page, making axio do a 2nd get request to the server
            // Since the server haven't been set up to serve Vue clients builds, it returns 404
        }
    }
</script>

<template>
    <div class="authPage">
        <errorMsg
            :isShown="viewStatusDialog"
            title="Login failed"
            text="The email or password you entered is incorrect"
            @MessageClosed="handleClose"
        />

        <img class="logo" src="../assets/images/logo-devlinks-large.svg" alt="Devlink logo" >
        <div class="authCard" >
            <div class="title  py-10 px-8">
                <v-card-title class="text-h4 text-secondary pa-0">Login</v-card-title>
                <v-card-subtitle class="text-secondary-lighten-1 px-0 pt-2">Add your details below to get back into the app</v-card-subtitle>
            </div>
            <div class="form pb-8 ">
                <v-form @submit.prevent>

                    <v-text-field
                        v-model="userEmail"
                        variant="outlined"
                        :rules="[rules.required]"
                        hint="e.g. alex@email.com"
                        persistent-hint
                        class="px-8 pb-6"
                        label="Email address"
                        color="primary"
                        density="comfortable"
                        prepend-inner-icon="customIcon:email"
                    ></v-text-field>
                    
                    <v-text-field
                        v-model="userPassword"
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
                       
                        <solidBtn 
                            buttonText="Login"
                            @buttonCLicked="loginUser"
                        />
                       
                    </div>
                </v-form>
                    <div class="newAccLink">
                        <v-card-subtitle class="text-secondary-lighten-1 px-0 py-1 pr-1">Don't have an account?</v-card-subtitle>
                        <v-card-subtitle class=" px-0 py-1 "><a href="/signup" class="text-primary text-decoration-none" target="_self">Create an account</a></v-card-subtitle>

                    </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.authPage{
    background: rgb(var(--v-theme-surface));
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.authCard {
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
    .authPage{
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