export const addTimeSlot = (data) => {
    return {
        type: 'ADD_TIMESLOT',
        data,
    }
}

export const updateTimeSlot = (data) => {
    return {
        type: 'UPDATE_TIMESLOT',
        data,
    }
}
