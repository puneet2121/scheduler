import axios from "axios";

import { useEffect, useState } from "react";
export default function useApplicationData(props){ 

 const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},
});
const setDay = day => setState({ ...state, day });
// Updating spots
const updateSpot = (state,id) => {
  const currentDay =  state.days.find((d) => d.appointments.includes(id))
  const nullAppointments = currentDay.appointments.filter((id) => !state.appointments[id].interview)
  const spotsRemaining = nullAppointments.length
  const newDay = {...currentDay,spots:spotsRemaining}
  const newDays = state.days.map((d) => d.name === state.day ? newDay : d)
  return newDays;
}


//book interview
function bookInterview(id, interview) {
  console.log(id, interview);
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview },
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.put(`/api/appointments/${id}`, appointment).then(() => {
    const newState = {...state,appointments}
    const newDay =updateSpot(newState,id)
    setState({
      ...state,
      appointments,
      days: newDay
    })
  })
}
// delete an interview
function cancelInterview(id,interview) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
    const newState = {...state,appointments}
    const newDay =updateSpot(newState,id)
    setState({
      ...state,
      appointments,
      days:newDay
    })
  })
  
}

useEffect(() => {
  Promise.all([
    axios.get(`/api/days`),
    axios.get(`/api/appointments`),
    axios.get(`/api/interviewers`)
  ]).then((all) => {
    setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
}, [])

return {state,setDay,bookInterview,cancelInterview}

}