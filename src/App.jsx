import { useState, useEffect } from 'react';
import EventCard from './components/EventCard';
import Navbar from './components/Navbar';
import './styles/App.scss';
import { server } from './config';
import { formatDate } from './util/date';
import { Link } from "react-router-dom";
import { Button  } from 'react-bootstrap';

function App() {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  
  //json-server --watch db.json

  
  useEffect(()=> {
    fetch(`${server}/events`)
    .then(response => response.json())
    .then(data => {
      let evts = data.map( evt => {
          evt.date = formatDate(evt.date, "fulldate");
          return evt;
      });
      setEvents(evts);
      setAllEvents(evts);
    });
  }, [setEvents]);

  return (
    <div className="App">
      <Navbar 
      isEdit={false} 
      events={allEvents}
      setEvents={setEvents}
      />
      {events.length > 0 ? 
      events.map( evt => (  
        <EventCard
          key={evt.id}
          id={evt.id}
          event={evt.label}
          status={evt.status}
          date={evt.date}
        />
      )) : <h4 className='text-center p-4'>NOTHING TO SHOW</h4>}
      <Button variant="violet" id="add-btn"><Link to="/event/new">ADD EVENT</Link></Button>
    </div>
  )
}

export default App
