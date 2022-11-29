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

const InputEvent = () => {
    const params = useParams();
    const [label, setLabel] = useState("");
    const [status, setStatus] = useState("");
    const today = new Date();
    const [eventDate, setEventDate] = useState(today);
    const navigate = useNavigate();
    const isCreate = params.id === "new" ? true:false;
    const [startDate, setStartDate] = useState(new Date());
    
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


    const updateEvent = () => {
        let evtDate = formatDate(eventDate, "mm/dd/yyyy");

        if(isCreate) { //add new event
            fetch(`${server}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({label, status, date:evtDate})
            })
            .then(response => response.json())
            .then(data => {
                navigate("/");
            })
            .catch( err => {
                alert("Oops, something wrong happened, please try again");
                console.log("Error in adding new event: " +err);
            });
        } else { //update specific event
            fetch(`${server}/events/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({label, status, date:evtDate})
            })
            .then(response => response.json())
            .then(data => {
                navigate("/");
            })
            .catch( err => {
                alert("Oops, something wrong happened, please try again");
                console.log("Error in updating the event: " +err);
            });
        }
    }

    const deleteEvent = () => {
        if(confirm("Are you sure you want to delete this event? ")) {
            let evtDate = formatDate(eventDate, "mm/dd/yyyy");
            if(!isCreate) { 
                fetch(`${server}/events/${params.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({label, status, date:evtDate})
                })
                .then(response => response.json())
                .then(data => {
                    navigate("/");
                })
                .catch( err => {
                    alert("Oops, something wrong happened, please try again");
                    console.log("Error in deleting the event: " +err);
                });
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
                            <Form.Select aria-label="status selection" value={status} onChange={(evt)=>setStatus(status=>status=evt.target.value)}>
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
                        <Button variant="purple" id="update-btn" onClick={updateEvent}> { isCreate ? "ADD" : "UPDATE"}  </Button>
                        { !isCreate && 
                            <Button variant="danger" id="delete-btn"  onClick={deleteEvent}> DELETE </Button>
                        }
                    </div>
                    </Card.Body>
                </Card>
                <Button variant="purple" id="back-btn"> <Link to="/" >Back</Link></Button>
            </div>
        </>
    );
}

export default InputEvent;