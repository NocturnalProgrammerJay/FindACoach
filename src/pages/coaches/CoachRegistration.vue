<template>
    <section>
        <base-card>
            <h2>Register as a coach now!</h2>
            <coach-form @save-dat=saveData></coach-form> <!--passes a method to child, child emits the function which is basically the propagate back up to the parent to invoke the method-->
        </base-card>
    </section>
</template>

<script>
    import CoachForm from '../../components/coaches/CoachForm.vue'

    export default {
        components: {
            CoachForm
        },
        methods: {
            saveData(data){ 
                this.$store.dispatch('coaches/registerCoach', data)// dispatch calls actions
                this.$router.replace('/coaches')
            }
        }
    }
</script>