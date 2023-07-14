import React, { useState, useEffect, useRef } from "react";
import interactionPlugin from "@fullcalendar/interaction";
import ptLocale from '@fullcalendar/core/locales/pt';
import "react-datepicker/dist/react-datepicker.css";
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import api from '../../../services/api';
import Modal from 'react-modal';
import Home from "../Home";
import './style.css'

export default function Calendario() {

  Modal.setAppElement('#root');//Confirmação modal  

  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [isCalendarInteractive, setIsCalendarInteractive] = useState(true);
  const [originalEvent, setOriginalEvent] = useState(null);

  const mockConsultas = [
    {
      id: 1,
      title: 'Consulta João',
      start: '2023-07-15T10:00:00',
      background: '#378006'
    },
    {
      id: 2,
      title: 'Consulta Maria',
      start: '2023-07-16T14:00:00',
      background: '#378006'
    },
    {
      id: 3,
      title: 'Consulta João',
      start: '2023-07-15T10:00:00',
      background: '#378006'
    },
    {
      id: 4,
      title: 'Consulta Maria',
      start: '2023-07-16T14:00:00',
      background: '#378006'
    },
  ];

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin, interactionPlugin],
      locale: ptLocale,
      themeSystem: 'bootstrap4',
      businessHours: false,
      defaultView: 'month',
      editable: true,
      header: {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
        right: 'today prev,next',
      },
      events: events,
      eventColor: '#378006',      
      eventDrop: function (info) {
        setCurrentEvent(info.event);
        setModalIsOpen(true);
        setIsCalendarInteractive(false);
        setOriginalEvent(info.oldEvent);
      }
    });
    calendar.render();
  }, [events]);

  useEffect(() => {
    setEvents(mockConsultas);
  }, []);

  const handleConfirm = async () => {
    const newDate = currentEvent.start;

    try {
      const response = await api.post('/api/Profissional/AlterarDataConsulta', newDate, {
        validateStatus: function (status) {
            return (status >= 200 && status < 300) || status > 400 || status < 500;
        }
    });

      if (response.status == 200) 
      {
        setEvents(events.map(event => event.id === currentEvent.id ? { ...event, start: newDate } : event));
      } 
      else 
      {
        console.error('Erro ao atualizar o evento:', response.status);
      }
    } catch (error) {
      console.error('Erro ao atualizar o evento:', error);
    }

    setModalIsOpen(false);
    setIsCalendarInteractive(true);
  };

  const handleCancel = () => {
    const originalDate = originalEvent.start;

    setEvents(events.map(event => event.id === currentEvent.id ? { ...event, start: originalDate } : event));
    setModalIsOpen(false);
    setIsCalendarInteractive(true);
  };

  return (
    <Home>
      <div>
        <h2 className="mb-4 brand-logo">Calendário de Consultas</h2>
        <div className="card">
          <div className="card-body p-0">
            <div id="calendar" ref={calendarRef} style={{ pointerEvents: isCalendarInteractive ? 'auto' : 'none' , display: 'flex'}}></div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCancel}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',  
              bottom: 'auto',
              inset: '20% auto auto 61%',
              display: 'inline-grid',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              borderRadius: '4px',
              padding: '20px'
            }
          }}
        >
          <p>A consulta foi alterada. Você gostaria de salvar as alterações?</p>
          <button onClick={handleConfirm}>Sim</button>
          <button onClick={handleCancel}>Não</button>
        </Modal>
      </div>
    </Home>
  )
}
