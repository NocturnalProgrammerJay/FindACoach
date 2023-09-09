export default {
    async registerCoach(context, data){
        const userId = context.rootGetters.userId
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        }

        const response = await fetch(`https://glass-flux-340805-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT', // create or overwrite if exist already
            body: JSON.stringify(coachData)
        })

        // const responseData = await response.json()

        if (!response.ok){
            //error...
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        }) //uses the registerCoach in mutations.vue to commit the actual state change
    },

    async loadCoaches(context, payload){
        if(!payload.forceRefresh && !context.getters.shouldUpdate) return 

        const response = await fetch(`https://glass-flux-340805-default-rtdb.firebaseio.com/coaches.json`)
        const responseData = await response.json()

        if(!response.ok){
            throw new Error(responseData.message || 'Failed to fetch!')
        }

        const coaches = []

        for (const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            }
            coaches.push(coach)
        }

        context.commit('setCoaches', coaches)
        context.commit('setFetchTimestamp')
    }
}
