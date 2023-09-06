export default {
    registerCoach(state, payload){ // called from actions commit
        state.coaches.push(payload)
    }
}