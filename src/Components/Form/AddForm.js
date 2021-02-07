import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addTimeSlot } from '../../Action/FormActions';
import { updateTimeSlot } from '../../Action/FormActions';

class AddForm extends Component {
    constructor(props) {
        super();
        this.forUpdate = false;
    }

    state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        errors: {},
        touched: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
    }

    componentDidMount() {
        let occupiedSlots = localStorage.getItem("occupiedSlots");
        let getOccupiedData;
        if (occupiedSlots) {
            occupiedSlots = JSON.parse(occupiedSlots);
            if (occupiedSlots.includes(this.props.slotId)) {
                this.forUpdate = true;
                let occupiedSlotData = localStorage.getItem('timeSlotData');
                occupiedSlotData = JSON.parse(occupiedSlotData);
                getOccupiedData = occupiedSlotData.filter((item, index) => {
                    return item.slotId === this.props.slotId;
                })
                this.setState({
                    firstName: getOccupiedData[0].firstName,
                    lastName: getOccupiedData[0].lastName,
                    phoneNumber: getOccupiedData[0].phoneNumber,
                })
            }
        }
    }

    handleValidation = () => {
        let { firstName, lastName, phoneNumber } = this.state;
        let errors = {};
        let formIsValid = true;
        if (!firstName) {
            formIsValid = false;
            errors["firstName"] = "Cannot be empty!";
        }
        if (firstName && typeof firstName !== "undefined") {
            if (!firstName.match(/^[a-zA-Z]+$/)) { // regex for only alphabets
                formIsValid = false;
                errors["firstName"] = "Firstname should have only letters without space.";
            }
        }
        if (!lastName) {
            formIsValid = false;
            errors["lastName"] = "Cannot be empty!";
        }
        if (lastName && typeof lastName !== "undefined") {
            if (!lastName.match(/^[a-zA-Z]+$/)) { // regex for only alphabets
                formIsValid = false;
                errors["lastName"] = "Lastname should have only letters without space.";
            }
        }
        if (!phoneNumber) {
            formIsValid = false;
            errors["phoneNumber"] = "Cannot be empty!";
        }
        if (phoneNumber && typeof phoneNumber !== "undefined") {
            if (!phoneNumber.match(/^[0-9]{10}$/)) { // regex for only numbers
                formIsValid = false;
                errors["phoneNumber"] = "Enter valid mobile number.";
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    handlechange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
        this.handleValidation();
    }

    handleBlur = (e) => {
        let { touched } = this.state;
        if (e.target.id && touched[e.target.id] != true) {
            touched[e.target.id] = true;
            this.setState({
                touched
            });
        }
        this.handleValidation();
    }

    handlesubmit = (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                slotId: this.props.slotId,
            }
            if (this.forUpdate) {
                this.props.updateTimeSlot(data);
            } else {
                this.props.addTimeSlot(data);
            }
            this.setState({
                firstName: '',
                lastName: '',
                phoneNumber: '',
            });
            this.props.history.push("/");
        } else {
            console.error('error');
        }
    }

    redirectHome = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <form id="addSlotForm" onSubmit={this.handlesubmit} className="container form-add" autoComplete="off">
                    <legend><h4>Fill the below details</h4></legend>
                    <div className="form-group">
                        <div>
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" value={this.state.firstName} onChange={this.handlechange} onBlur={this.handleBlur} />
                            <span className="add-form-error">
                                {this.state.touched.firstName && this.state.errors.firstName}
                            </span>
                        </div>
                        <div>
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.handlechange} onBlur={this.handleBlur} />
                            <span className="add-form-error">
                                {this.state.touched.lastName && this.state.errors.lastName}
                            </span>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="phoneNumber" value={this.state.phoneNumber} onChange={this.handlechange} onBlur={this.handleBlur} />
                            <span className="add-form-error">
                                {this.state.touched.phoneNumber && this.state.errors.phoneNumber}
                            </span>
                        </div>
                    </div>
                    <div className="btn-block">
                        {this.forUpdate ? <button type="submit" className="btn btn-primary">Update</button> : <button type="submit" className="btn btn-primary">Save</button>}
                        <button className="btn btn-danger" onClick={this.redirectHome}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.slotId;
    return {
        slotId: id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTimeSlot: (data) => dispatch(addTimeSlot(data)),
        updateTimeSlot: (data) => dispatch(updateTimeSlot(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
