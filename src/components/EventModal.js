import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [startDate, setStartDate] = useState(new Date());
  const [isAllDay, setIsAllDay] = useState(false);
  const [repeat, setRepeat] = useState("Does not repeat");
  const [selectedTab, setSelectedTab] = useState("Task");

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      startDate: startDate.valueOf(),
      isAllDay,
      repeat,
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto">
        <header className="flex justify-end items-center bg-gray-300 rounded-t-lg px-4 py-2 border-b">
          <button onClick={() => setShowEventModal(false)}>
            <span className="material-icons-outlined text-gray-600">
              close
            </span>
          </button>
        </header>
        <div className="px-6 py-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-lg font-semibold p-2 focus:outline-none border-none"
            />
          </div>
          <div className="flex items-center mb-4">
            <span className="material-icons-outlined text-gray-800 mr-4">
              schedule
            </span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="text-gray-600 focus:outline-none border-none"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isAllDay}
              onChange={(e) => setIsAllDay(e.target.checked)}
              className="mr-4"
            />
            <span className="text-gray-600">All day</span>
          </div>
          <div className="mb-4">
            <select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="w-full p-2 focus:outline-none border-none text-gray-600"
            >
              <option value="Does not repeat">Does not repeat</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 focus:outline-none border-none"
            />
          </div>
        </div>
        <footer className="flex justify-end px-4 py-2 border-t">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  );
}
