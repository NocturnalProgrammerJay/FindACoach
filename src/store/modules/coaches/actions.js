export default {
    registerCoach(context, data){
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        }

        context.commit('registerCoach', coachData) //uses the registerCoach in mutations.vue to commit the actual state change
    }
}
