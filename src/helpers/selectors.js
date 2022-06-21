
export function getAppointmentsForDay(state, day) {

  let dayObject = state.days.find(item => item.name === day);
  if (!dayObject) {
    return [];
  }
  const filterAppointment = dayObject.appointments.map(id => state.appointments[id]);
  return filterAppointment;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewerObject = state.interviewers[interview.interviewer]
  return {
    student: interview.student,
    interviewer: interviewerObject
  }
}

export function getInterviewersForDay (state,day) {
  console.log('this si state::',state);
  const dayObject = state.days.find(item => item.name === day);
  if (!dayObject) {
    return []
  }
  return dayObject.interviewers.map(id => state.interviewers[id]);
 
}