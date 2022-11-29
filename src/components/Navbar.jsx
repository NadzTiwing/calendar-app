import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import { Button  } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return(
        <nav className="nav-bar">
            <a id="app-title" href="/">Calendar App</a>
            {props.isEdit ? "" :
            <InputGroup className="mb-3" id="search-bar">
                <Form.Control aria-label="Text input with dropdown button" />
                <SplitButton
                variant="purple"
                title="Search"
                id="segmented-button-dropdown-2"
                alignRight
                >
                <Dropdown.Item href="#">Show Pending</Dropdown.Item>
                <Dropdown.Item href="#">Show Ongoing</Dropdown.Item>
                <Dropdown.Item href="#">Show Done</Dropdown.Item>
                </SplitButton>
            </InputGroup>
            }
        </nav>
    );
}

export default Navbar;