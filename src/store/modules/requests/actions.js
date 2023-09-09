export default {
    async contactCoach(context, payload){
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        }
        const response = await fetch(`https://glass-flux-340805-default-rtdb.firebaseio.com/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        })

        const responseData = await response.json()

        if(!response.ok){
            throw new Error(responseData.message || 'Failed to send request')
        }

        newRequest.id = responseData.name
        newRequest.coachId = payload.coachId

        context.commit('addRequest', newRequest)
    },
    async fetchRequests(context){
        const coachId = context.rootGetters.userId
        const response = await fetch(`https://glass-flux-340805-default-rtdb.firebaseio.com/requests/${coachId}.json`)

        if (!response.ok){
            throw new Error(responseData.message || 'Failed to fetch request.')
        }

        const requests = []

        for (const key in  responseData){
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            }
            requests.push(request)
        }

        context.commit('setRequests', requests)
    }
}