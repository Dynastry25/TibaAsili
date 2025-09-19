import React, { useState, useEffect } from 'react';
import { getAppointments } from '../../services/appointments';

const CalendarView = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments('month');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const calendar = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendar.push({ day: null, appointments: [] });
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const dayAppointments = appointments.filter(app => app.date === dateStr);
      calendar.push({ day, appointments: dayAppointments });
    }
    
    return calendar;
  };

  if (loading) return <div>Loading calendar...</div>;

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <h2>Appointment Calendar</h2>
        <div className="calendar-navigation">
          <button onClick={() => navigateMonth('prev')} className="btn-nav">
            &larr; Previous
          </button>
          <span className="current-month">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => navigateMonth('next')} className="btn-nav">
            Next &rarr;
          </button>
        </div>
      </div>
      
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday-header">{day}</div>
          ))}
        </div>
        
        <div className="calendar-days">
          {generateCalendar().map((cell, index) => (
            <div key={index} className={`calendar-day ${cell.day ? '' : 'empty'}`}>
              {cell.day && (
                <>
                  <div className="day-number">{cell.day}</div>
                  <div className="day-appointments">
                    {cell.appointments.slice(0, 2).map(app => (
                      <div key={app.id} className={`appointment-badge ${app.status}`}>
                        {app.time} - {app.patientName}
                      </div>
                    ))}
                    {cell.appointments.length > 2 && (
                      <div className="more-appointments">
                        +{cell.appointments.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;