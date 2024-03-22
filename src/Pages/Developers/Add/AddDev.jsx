import React, { useState } from 'react'

import "./AddDev.scss"
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const AddDev = () => {

    const navigate = useNavigate()
    const [inp, setInp] = useState({
        name : "",
        age : "",
        skill : "",
        photo : ""
    })

    const HandleInp = (e) =>{
        setInp({
            ...inp,
            [e.target.name] : e.target.value
        })
    }

    const HandelSubmitForm = (e) =>{
        e.preventDefault()
        
        if (!inp.name || !inp.age || !inp.skill || !inp.photo) {
            Swal.fire({
                title: 'Error!',
                text: 'All Fields are Required!',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        } else {
            
            axios.post(`http://localhost:5050/developers`, inp)
            .then(res =>{
                setInp({
                    name : "",
                    age : "",
                    skill : "",
                    photo : ""
                })
                Swal.fire({
                    title: 'Success!',
                    text: 'Developer added.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
                  navigate("/developers")
            })
            
        }
        
    }

    return (
    <>
       <div className="developer-page mb-5">
            <Container>
                <div className="text-center h1 py-4">Add New Developer</div>
                <Link className='btn btn-primary mb-3' to="/">Back Home</Link>
                <form action="#" className='w-50 m-auto bg-dark p-3' onSubmit={HandelSubmitForm}>
                    <input type="text" name="name" className='form-control mb-3' placeholder='Name' value={inp.name} onChange={HandleInp}/>
                    <input type="text" name="age" className='form-control mb-3' placeholder='Age' value={inp.age} onChange={HandleInp}/>
                    <input type="text" name="skill" className='form-control mb-3' placeholder='Skill' value={inp.skill} onChange={HandleInp}/>
                    <input type="text" name="photo" className='form-control mb-3' placeholder='Photo' value={inp.photo} onChange={HandleInp}/>
                    <button className='btn btn-primary' type='submit'>Add Developer</button>
                </form>
                
            </Container>
        </div> 
    </>
  )
}

export default AddDev