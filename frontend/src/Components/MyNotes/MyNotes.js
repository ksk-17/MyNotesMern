import React, { useEffect } from 'react'
import MainTitle from '../MainTitle';
import {Link,useNavigate} from 'react-router-dom';
import { Badge, Button,Card, Modal } from 'react-bootstrap';
import "./MyNotes.css";
import { useDispatch, useSelector } from "react-redux"
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from '../Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MyNotes = () => {

  const dispatch = useDispatch();

  const noteList = useSelector(state=>state.noteList);
  const {loading,notes,error}=noteList;

  const userLogin = useSelector(state=>state.userLogin);
  const {userInfo}=userLogin;

  const noteCreate = useSelector((state)=>state.noteCreate);
  let { success:successCreate } = noteCreate;

  const noteUpdate = useSelector((state)=>state.noteUpdate);
  let { success:successUpdate }=noteUpdate;

  const noteDelete = useSelector((state)=>state.noteDelete);
  const {loading:loadingDelete,success:successDelete,error:errorDelete}=noteDelete;

  let navigate = useNavigate();

  const deleteHandler = (id) =>{
    dispatch(deleteNoteAction(id));
  }


 useEffect(() => {
  dispatch(listNotes());
  if(!userInfo){
    navigate('/');
  }
 }, [dispatch,successCreate,successUpdate,successDelete])
 

  return (
    <MainTitle title={`Welcome Back ${userInfo.name}..`}>
      <Link to='/createnote'>
        <Button size="lg"  className="button">
          Create New Note
        </Button>
      </Link>
      {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
      {loadingDelete && <Loading />}
      {successDelete && <ErrorMessage variant='success'>Deleted note Successfully</ErrorMessage>}
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {successCreate && <ErrorMessage variant='success'>Created a note Successfully</ErrorMessage>}
      {loading && <Loading />}
        {
          notes?.reverse().map((note,index)=>(
              <Card className="card" key={index}>
                <Card.Header className="cardheader">
                  <h4 className="cardtitle">{note.title}</h4>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button variant="danger" className="mx-2" onClick={()=>deleteHandler(note._id)}>Delete</Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  <h4>
                    <Badge bg="success">
                      Category - {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {note.content}
                    </p>
                    <footer className="blockquote-footer">
                      Created On {" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0,10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
          ))
        }
    </MainTitle>
  )
}

export default MyNotes;