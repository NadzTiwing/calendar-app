import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import { useState } from 'react';

const Navbar = (props) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filter = (status) => {
        if(status === "all") {
            props.setEvents(evts => evts=props.events);
            return;
        }

        let filteredEvents = props.events.filter((event) => event.status === status);
        props.setEvents(evts => evts=filteredEvents);
    }

    const search = () => {
        let filteredEvents = props.events.filter((event) => {
            let query = searchQuery.toLowerCase();
            let desc = event.label.toLowerCase();
             
            return desc.includes(query);
        });
        props.setEvents(evts => evts=filteredEvents);
    }

    return(
        <nav className="nav-bar">
            <a id="app-title" href="/">Calendar App</a>
            {props.events && props.isEdit ? "" :
            <InputGroup className="mb-3" id="search-bar">
                <Form.Control 
                aria-label="search input"
                value={searchQuery}
                onChange={(evt) => setSearchQuery(query => query = evt.target.value)}
                 />
                <SplitButton
                variant="purple"
                title="Search"
                id="segmented-button-dropdown-2"
                alignRight
                onClick={()=>search()}
                >
                <Dropdown.Item href="#" onClick={()=>filter('all')}>Show All</Dropdown.Item>
                <Dropdown.Item href="#" onClick={()=>filter('pending')}>Show Pending</Dropdown.Item>
                <Dropdown.Item href="#" onClick={()=>filter('ongoing')}>Show Ongoing</Dropdown.Item>
                <Dropdown.Item href="#" onClick={()=>filter('done')}>Show Done</Dropdown.Item>
                </SplitButton>
            </InputGroup>
            }
        </nav>
    );
}

export default Navbar;