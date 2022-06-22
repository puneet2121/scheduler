import React from "react";
import 'components/Appointment/styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVEING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDITING = "EDITING"
const ERROR_SAVE = " ERROR_SAVE";
const ERROR_DELETE = " ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview).then(() => transition(SHOW)).catch(error => transition(ERROR_SAVE,true))
    
  }
  function deleting(name,interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING)
    props.cancelInterview(props.id,interview).then(() => transition(EMPTY)).catch(error => transition(ERROR_DELETE,true))
  }
  console.log('props-----',props)
  return (

    <article className="appointment">
      <Header
        time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
      {mode === SAVING && <Status message={'Saving'}/>}
      {mode === DELETING && <Status message= {'Deleting'}/> }
      {mode === CONFIRM && <Confirm onConfirm = {deleting} onCancel={() => back()}/>}
      {mode === EDITING && <Form student={props.interview.student} interviewer={props.interview.interviewer} interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
      {mode === ERROR_SAVE && <Error errormessage={'error while saving'}/>}
      {mode === ERROR_DELETE && <Error errormessage={'Cannot delete the appointment'}/>}
      {mode === SHOW && (
        <Show

          onDelete={() => transition(CONFIRM)}
          onEdit= {() => transition(EDITING)}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      
      )}
      
    </article>
  );
}