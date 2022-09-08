import React, {useEffect, useState} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';

const EditComment = (props) => {
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // Comment State
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [coinIdentity, setCoinIdentity] = useState("")

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

    //Method to actually update the pet with the information a user has filled in
    const updateComment = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/comment/' + id, {
            name,    // this is shortcut syntax for name: name,
            comment,

        })
            .then(res => {
                console.log(res);
                navigate(`/coins/${coinIdentity}`);
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