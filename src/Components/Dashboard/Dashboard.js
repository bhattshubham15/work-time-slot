import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
    render() {
        const timeSlot = [
            { slotId: 1, time: '9 am - 10 am' },
            { slotId: 2, time: '10 am - 11 am' },
            { slotId: 3, time: '11 am - 12 pm' },
            { slotId: 4, time: '12 pm - 1 pm' },
            { slotId: 5, time: '1 pm - 2 pm' },
            { slotId: 6, time: '2 pm - 3 pm' },
            { slotId: 7, time: '3 pm - 4 pm' },
            { slotId: 8, time: '4 pm - 5 pm' },
            { slotId: 9, time: '5 pm - 6 pm' },
        ];
        let savedData = localStorage.getItem("timeSlotData");
        let slotIdArray;
        if (savedData) {
            savedData = JSON.parse(savedData);
            slotIdArray = savedData.map((item, index) => {
                return item.slotId;
            });
            localStorage.setItem("occupiedSlots", JSON.stringify(slotIdArray));
        }
        const timeSlotList = timeSlot.map(timeslot => {
            return (
                <div className={"post card " + (slotIdArray && slotIdArray.includes(JSON.stringify(timeslot.slotId)) ? "red" : "")} key={timeslot.slotId}>
                    <div className="card-content">
                        <Link to={'/' + timeslot.slotId}>
                            <span className="card-title black-text">
                                {timeslot.time}
                            </span>
                        </Link>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="container home">
                    {timeSlotList}
                </div>
            </div>
        )
    }
}
