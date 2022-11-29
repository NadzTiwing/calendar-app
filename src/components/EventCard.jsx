import { Card, Badge  } from 'react-bootstrap';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from "react-router-dom";

const EventCard = (props) => {
    return (
        <Card className="event-card">
            <Card.Body className="event-card-body">
                <Link className="edit-btn" to={`/event/${props.id}`}><BsFillPencilFill/></Link>
                <Card.Text className="desc">
                    {props.event}
                </Card.Text>
                <div className="details">
                    <Badge pill bg="primary" className="status">{props.status}</Badge>
                    <span className="date">{props.date}</span>
                </div>
            </Card.Body>
        </Card>
    );
}

export default EventCard;