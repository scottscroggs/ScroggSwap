import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';


// This component contains the Form to add/edit comments. 
// Makes an API call to the Database to get the Name, Comment, and Coin associated with the comment.
// Will submit the updated data back to the Database after user makes changes & submits.

const EditComment = (props) => {
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // Comment information stored in state
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [coinIdentity, setCoinIdentity] = useState("")

    // API call to get the comment data from the database
    useEffect(() => {
        axios.get('http://localhost:8000/api/comment/edit/' + id)
            .then(res => {
                console.log(res.data);
                setName(res.data[0].name);
                setComment(res.data[0].comment);
                setCoinIdentity(res.data[0].coin)
                console.log(name);
                console.log(comment);
                console.log(coinIdentity);
                console.log(id)
            })
            .catch(err => console.log(err));
        }, [])

    // Method to update the comment with the new information
    const updateComment = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/comment/' + id, {
            name,    // this is shortcut syntax for name: name,
            comment,

        })
            .then(res => {
                console.log(res);
                navigate(`/coins/${coinIdentity}`); //re-directs back to the previous Coin Detail page
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    } 
    
    return (
        <div className="flex white">
            <div className="coin-details">
                <h2>Edit Comment</h2>
                <form className="form" onSubmit={updateComment}>
                    <p>
                        <label>Name:</label><br/>
                        <input className="form-control" type="text" value={name} onChange = {(e)=>setName(e.target.value)}/>
                        {errors.name ? <p className="text-danger">{errors.name.message}</p> : null}
                    </p>

                    <p>
                        <label>Comment:</label><br/>
                        <input className="form-control" type="text" value={comment} onChange = {(e)=>setComment(e.target.value)}/>
                        {errors.name ? <p className="text-danger">{errors.comment.message}</p> : null}
                    </p>

                    <p>
                        <input type="hidden" value={id}></input>
                    </p>

                    <input className="btn btn-primary btn-wide" type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}

export default EditComment;