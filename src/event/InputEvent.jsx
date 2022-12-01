import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Button, Card } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";
import './../styles/EventInput.scss';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { server } from '../config';
import { formatDate } from './../util/date';
import { connect } from "react-redux";
import { addEvent, deleteEvent, updateEvent } from '../util/redux/reducer';

const mapStateToProps = (state) => {
    return {
        events: state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvent: (id) => dispatch(getEvent(id)),
        addEvent: (obj) => dispatch(addEvent(obj)),
        updateEvent: (obj) => dispatch(updateEvent(obj)),
        deleteEvent: (obj) => dispatch(deleteEvent(obj))
    }
}

const InputEvent = (props) => {
    const params = useParams();
    const [label, setLabel] = useState("");
    const [status, setStatus] = useState("pending");
    const today = new Date();
    const [eventDate, setEventDate] = useState(today);
    const navigate = useNavigate();
    const isCreate = params.id === "new" ? true:false;
    
    useEffect(()=> {
        if(!isCreate) {
            fetch(`${server}/events/${params.id}`)
            .then(response => response.json())
            .then(data => {
              setLabel(data.label);
              setStatus(data.status);
              setEventDate(new Date(data.date));
            });
        }
    }, [params]);


    const saveChanges = () => {
        let evtDate = formatDate(eventDate, "mm/dd/yyyy");
        if(!label) {
            alert("Please enter a description of that event.");
            return;
        }
        if(isCreate) { //add new event 
            props.addEvent({
                label: label, 
                status: status, 
                date: evtDate
            });
            navigate("/");
        } else { //update specific event
            props.updateEvent({
                id: params.id,
                label: label,
                status: status,
                date: evtDate
            });
            navigate("/");
        }
    }

    const removeEvent = () => {
        if(confirm("Are you sure you want to delete this event? ")) {
            let evtDate = formatDate(eventDate, "mm/dd/yyyy");
            if(!isCreate) { 
                props.deleteEvent({
                    id: params.id,
                    label: label,
                    status: status,
                    date: evtDate
                });
                navigate("/");
            }
        }
    }

    return(
        <>
        <Navbar isEdit={true}/>
            <div className="content">
                <Card className="event-card">
                    <Card.Body className="event-card-body">
                    <FloatingLabel controlId="floatingTextarea2" label="Event Description">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        value={label}
                        onChange={(evt)=>setLabel(label => label=evt.target.value)}
                        />
                    </FloatingLabel>
                    <div className="details">
                        <FloatingLabel controlId="status-selection" label="Status:" className="status-selection">
                            <Form.Select aria-label="status selection" value={status} onChange={(evt)=>setStatus(status=> status=evt.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="done">Done</option>
                            </Form.Select>
                        </FloatingLabel>
                        
                        <div className="date-picker">
                            <label> Date of the Event: </label>
                            <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} />
                            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                        </div>
                    </div>
                    <div className="option-btn">
                        <Button variant="purple" id="update-btn" onClick={saveChanges}> { isCreate ? "ADD" : "UPDATE"}  </Button>
                        { !isCreate && 
                            <Button variant="danger" id="delete-btn"  onClick={removeEvent}> DELETE </Button>
                        }
                    </div>
                    </Card.Body>
                </Card>
                <Button variant="purple" id="back-btn"> <Link to="/" >Back</Link></Button>
            </div>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(InputEvent);