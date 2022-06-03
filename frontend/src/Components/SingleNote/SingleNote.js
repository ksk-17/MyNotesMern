import React, { useEffect, useState } from 'react'
import MainTitle from '../MainTitle'
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Loading from "../Loading/Loading"
import { Card, Form,Button } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {updateNoteAction} from '../../actions/notesActions';

const SingleNote = ({match}) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const noteUpdate = useSelector((state)=>state.noteUpdate);
    const {loading,error}=noteUpdate;

    const resetHandler=()=>{
        setCategory("");
        setContent("");
        setTitle("");
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        if(!title || !content || !category) return;
        dispatch(updateNoteAction(id,title,content,category));

        resetHandler();
        navigate('/mynotes');
    }

    const {id}=useParams();

    useEffect(() => {
        const fetching = async()=>{
          const {data}= await axios.get(`/api/notes/${id}`);
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
          setDate(data.updatedAt);
      }

      fetching();
    }, [id,date]);
    
    
    return (
        <MainTitle title="Edit Note">
        <Card>
            <Card.Header>
            Edit your Note
            </Card.Header>
            <Card.Body>
            <Form onSubmit={submitHandler}>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                type="text" value={title} placeholder="Enter the Title"
                onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                type="textarea" value={content} placeholder="Enter the Content"
                onChange={(e)=>setContent(e.target.value)}></Form.Control>
                </Form.Group>

                {content && (
                <Card>
                    <Card.Header>
                    Note Preview
                    </Card.Header>
                    <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                    </Card.Body>
                </Card>
                )}

                <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                type="text" value={category} placeholder="Enter the Category"
                onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                </Form.Group>

                {loading && <Loading />}
                <Button type="submit" variant="primary">
                Update Note
                </Button>
                <Button className="mx-2" variant="danger" onClick={resetHandler}>
                Reset Feilds
                </Button>
            </Form>
            </Card.Body>

            <Card.Footer className="text-muted">
                Creating on - {new Date().toLocaleDateString()}
            </Card.Footer>
        </Card>
        </MainTitle>
    )
}

export default SingleNote