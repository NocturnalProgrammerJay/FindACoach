<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating..." fixed>
            <p>Authenticating..</p>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email" id="email">E-Mail</label>
                    <input type="email" id="email" v-model.trim="email"/>
                </div>
                <p v-if="!formIsValid">Please enter a valid email and password (must be at least 6 characters long).</p>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password"/>
                </div>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
export default{
    data(){
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        }
    },
    computed: {
        submitButtonCaption(){
            if(this.mode === 'login'){
                return 'Login'
            } else {
                return 'Signup'
            }
        },
        switchModeButtonCaption(){
            if(this.mode === 'login'){
                return 'Signup instead'
            } else {
                return 'Login instead'
            }
        },
        handleError(){
            this.error = null
        }
    },
    methods:{
        async submitForm(){
            if(
                this.email === '' ||
                !this.email.includes('@') ||
                this.password.length < 6
            ) {
                this.formIsValid = false
                return
            }

            this.isLoading = true

            const actionPayload = {
                email: this.email,
                password: this.password
            }

            try {
                if( this.mode === 'login'){
                    await this.$store.dispatch('login', actionPayload)
                } else {
                    await this.$store.dispatch('signup', actionPayload)
                }
                const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
                this.$router.replace('/coaches')
            } catch(err){
                this.error = err.message  || 'Failed to authenticate, try later. Check your login data!'
            }

            this.isLoading = false
        },
        switchAuthMode(){
            if (this.mode === 'login'){
                this.mode = 'signup'
            } else {
                this.mode = 'login'
            }
        }
    }
}
</script>


<style scoped>
    form {
    margin: 1rem;
    padding: 1rem;
    }

    .form-control {
    margin: 0.5rem 0;
    }

    label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
    }

    input,
    textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
    }

    input:focus,
    textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
    }

</style>