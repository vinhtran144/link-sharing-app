<script setup>
    import { ref, reactive } from 'vue';
    import { register } from '@/requestUtils/restRequest';
    import solidBtn from '@/components/buttons/solidBtn.vue'
    import errorMsg from '@/components/popupMsg/errorMsg.vue'
    import { useMutation } from '@vue/apollo-composable';
    import { CHECK_EMAIL_VALID } from '@/requestUtils/mutation'

    // Ref and methods for dealing with sign up error dialog
    const viewError = ref(false);
    const errText = ref('');
    const handleClose = () => {
        viewError.value = false;
        errText.value = ''; //clearing for next error message
    }

    // Ref to handle checking whether the email is valid to use
    const emailCheck = ref(true);
    const emailField = ref();

    const { mutate: checkEmail, onDone } = useMutation(CHECK_EMAIL_VALID,
    () => ({
        variables: {
            email: userEmail.value
        },
            
    }));

    onDone((res)=>{
        // runs after mutation is done
        emailCheck.value = res.data.checkEmail;
        emailField.value.validate();
        // manually force the email field to run validate to check if the email is valid
    })

    const rules = reactive({
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 characters',
        valid: () => emailCheck.value || 'Email is already taken'
    });

    // Login forms variables
    const userEmail = ref('');
    const newPassword = ref('');
    const dupPassword = ref('');
    const loading = ref(false);

    async function signupUser() {
        // checking for errors, exiting the function if it doesn't satisfy the error
        // the components will handle error reporting, so this function doesn't have to do much
        if ( !userEmail.value || !newPassword.value || !dupPassword.value) return;
        if ( newPassword.value < 8 || dupPassword.value < 8 ) return;
        if ( !emailCheck ) return; // boolean for whether the email is valid

        if (emailCheck.value == false) {
            errText.value = "The email is already been used";
            viewError.value = true;
            // Clearing the password fields
            newPassword.value = '';
            dupPassword.value = '';
            return;
        }

        if (newPassword.value !== dupPassword.value) {
            errText.value = "Your password did not match";
            viewError.value = true;
            // Clearing the password fields
            newPassword.value = '';
            dupPassword.value = '';
            return;
        }
        // Once every conditions has been checked
        try {
            await register(userEmail.value, newPassword.value);
        } catch (e) {
            console.log(e)
            // Currently, the function only return axio errors as after login as the server redirects
            // the users after login, making axio do a 2nd get request to the server
            // Since the server haven't been set up to serve Vue clients builds, it returns 404
        }


    }

</script>

<template>
    <div class="authPage">
        <errorMsg
            :isShown="viewError"
            title="Signup failed"
            :text="errText"
            @MessageClosed="handleClose"
        />
        <img class="logo" src="../assets/images/logo-devlinks-large.svg" alt="Devlink logo" >
        <div class="authCard" >
            <div class="title  py-10 px-8">
                <v-card-title class="text-h4 text-secondary pa-0">Create account</v-card-title>
                <v-card-subtitle class="text-secondary-lighten-1 px-0 pt-2">Let's get you started sharing your link</v-card-subtitle>
            </div>
            <div class="form pb-8 ">
                <v-form @submit.prevent>

                    <v-text-field
                            v-model="userEmail"
                            variant="outlined"
                            :rules="[rules.required, rules.valid]"
                            hint="e.g. alex@email.com"
                            persistent-hint
                            class="px-8 pb-6"
                            label="Email address"
                            color="primary"
                            density="comfortable"
                            prepend-inner-icon="customIcon:email"
                            @change="checkEmail"
                            ref="emailField"
                        ></v-text-field>
    
                        <v-text-field
                            v-model="newPassword"
                            variant="outlined"
                            :rules="[rules.required, rules.min]"
                            type="password"
                            hint="At least 8 characters"
                            persistent-hint
                            class="px-8 pb-6"
                            label="Create password"
                            color="primary"
                            density="comfortable"
                            prepend-inner-icon="customIcon:password"
                        ></v-text-field>
    
                        <v-text-field
                            v-model="dupPassword"
                            variant="outlined"
                            :rules="[rules.required, rules.min]"
                            type="password"
                            hint="At least 8 characters"
                            persistent-hint
                            class="px-8 pb-6"
                            label="Confirm password"
                            color="primary"
                            density="comfortable"
                            prepend-inner-icon="customIcon:password"
                        ></v-text-field>
                        <div class="px-8 pb-6">
                           
                           <solidBtn 
                               buttonText="Signup"
                               @buttonCLicked="signupUser"
                           />
                           
                       </div>
                </v-form>
                   <div class="loginLink">
                       <v-card-subtitle class="text-secondary-lighten-1 px-0 py-1 pr-1">Already have an account?</v-card-subtitle>
                       <v-card-subtitle class=" px-0 py-1 "><a href="/login" class="text-primary text-decoration-none" target="_self">Login</a></v-card-subtitle>

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
.loginLink {
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
    .loginLink{
        display: flex;
        justify-content: center;
    }
}
</style>