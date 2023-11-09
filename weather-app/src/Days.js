import { useState } from "react";

function Days({ handleClickDay }) {

  const today = new Date();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const todayAndFourNextDays = [
    daysOfWeek[today.getDay()],
    (today.getDay() + 1) > 6 ? daysOfWeek[(today.getDay() + 1) - 7] : daysOfWeek[today.getDay() + 1],
    (today.getDay() + 2) > 6 ? daysOfWeek[(today.getDay() + 2) - 7] : daysOfWeek[today.getDay() + 2],
    (today.getDay() + 3) > 6 ? daysOfWeek[(today.getDay() + 3) - 7] : daysOfWeek[today.getDay() + 3],
    (today.getDay() + 4) > 6 ? daysOfWeek[(today.getDay() + 4) - 7] : daysOfWeek[today.getDay() + 4],
  ]

  // const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="card-action">
      {todayAndFourNextDays.map((day, index) => (
        <a
          key={index}
          href="#"
          className={index === 0 ? 'clickedDay' : ''}
          onClick={handleClickDay}
          id={index}
        >
          {day}
        </a>
      ))}
    </div>
  );
}

export default Days;