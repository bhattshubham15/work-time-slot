import { toast } from "react-toastify";

const RootReducer = (state = {}, action) => {
    let savedData = localStorage.getItem('timeSlotData');
    savedData = JSON.parse(savedData);
    if (action.type == 'ADD_TIMESLOT') {
        if (savedData && typeof savedData == 'object') {
            savedData.push(action.data)
            localStorage.setItem('timeSlotData', JSON.stringify(savedData));
        } else {
            localStorage.setItem('timeSlotData', JSON.stringify([action.data]));
        }
        toast.success('Added a task in timeslot');
    }
    if (action.type == 'UPDATE_TIMESLOT') {
        if (savedData) {
            savedData.forEach((element, index) => {
                if (element.slotId === action.data.slotId) {
                    savedData[index].firstName = action.data.firstName;
                    savedData[index].lastName = action.data.lastName;
                    savedData[index].phoneNumber = action.data.phoneNumber;
                }
            });
            localStorage.setItem('timeSlotData', JSON.stringify(savedData));
        }
        toast.success('Updated a task in timeslot');
    }
    return state;
}

export default RootReducer;
