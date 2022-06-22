import axios from "axios";

import React,{ useEffect, useState } from "react";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData(props){ 

 const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});
const setDay = day => setState({ ...state, day });
//book interview
function bookInterview(id, interview) {
  console.log(id, interview);
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.put(`/api/appointments/${id}`, appointment).then(() => {
    setState({
      ...state,
      appointments
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
    setState({
      ...state,
      appointments
    })
  })
  
}

useEffect(() => {
  Promise.all([
    axios.get(`/api/days`),
    axios.get(`/api/appointments`),
    axios.get(`/api/interviewers`)
  ]).then((all) => {
    console.log(all)
    setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
}, [])

return {state,setDay,bookInterview,cancelInterview}

}