export default {
    registerCoach(state, payload){ // called from actions commit
        state.coaches.push(payload)
    },
    setCoaches(state, payload){
        state.coaches = payload
    },
    setFetchTimestamp(state){
        state.lastFetch = new Date().getTime()
    }
}