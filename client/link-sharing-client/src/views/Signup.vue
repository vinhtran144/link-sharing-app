<script setup>
    import { ref, reactive } from 'vue';
    import solidBtn from '@/components/buttons/solidBtn.vue'
    import errorMsg from '@/components/popupMsg/errorMsg.vue'
    import { useMutation } from '@vue/apollo-composable';
    import { CHECK_EMAIL } from '@/requestUtils/mutation'

    // Ref and methods for dealing with sign up error dialog
    const viewError = ref(false);
    const errText = ref('');
    const handleClose = () => {
        viewError.value = false;
        errText.value = ''; //clearing for next error message
    }

    const rules = reactive({
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 characters',
    });

    // Login forms variables
    const userEmail = ref('');
    const newPassword = ref('');
    const dupPassword = ref('');

    const { mutate: checkEmail, onDone } = useMutation(CHECK_EMAIL,
    () => ({
        variables: {
            email: userEmail.value
        },
            
    }));

    onDone((res)=>{
        console.log(res);
    })

    // checkEmail()

    // async function checkEmail() {
    //     if ( !userEmail.value ) return;
    //     try{
    //         console.log(userEmail.value);
    //         const respone = await mutate({
    //             variables: {
    //                 email: userEmail.value
    //             }
    //         })
    //         console.log(respone);

    //     } catch(err){
    //         console.log(err)
    //     }
    // }

    async function signupUser() {
        // checking for errors, exiting the function if it doesn't satisfy the error
        // the components will handle error reporting, so this function doesn't have to do much
        if ( !userEmail.value ) return;
        if ( !newPassword.value ) return;
        if ( newPassword.value < 8 ) return;
        if ( !dupPassword.value ) return;
        if ( dupPassword.value < 8 ) return;

        if (newPassword.value != dupPassword.value) {
            errText.value = "The password you entered didn't match";
            viewError.value = true;
            // Clearing the password fields
            newPassword.value = '';
            dupPassword.value = '';
        }

        // Validate that email is available here
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
                           <solidBtn 
                               buttonText="Check email"
                               @buttonCLicked="checkEmail"
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