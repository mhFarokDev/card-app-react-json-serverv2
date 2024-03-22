import React, { useState } from 'react'

import { Container } from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import "./DevEdit.scss"
const DevEdit = () => {
    const data = useParams()
    
    const navigate = useNavigate()
    const [inp, setInp] = useState({
        name : "",
        age : "",
        skill : "",
        photo : ""
    })

    useState(()=>{
        axios.get(`http://localhost:5050/developers?id=${data.id}`).then(res =>{
            const {name, age, skill, photo} = res.data[0];
            setInp({name, age, skill, photo})
        })
    },[])
    

    

    // 

    const HandleInp = (e) =>{
        setInp({
            ...inp,
            [e.target.name] : e.target.value
        })
    }

    const HandelSubmitForm = async (e) =>{
        e.preventDefault()
        
        if (!inp.name || !inp.age || !inp.skill || !inp.photo) {
            Swal.fire({
                title: 'Error!',
                text: 'All Fields are Required!',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        } else {
            await axios.patch(`http://localhost:5050/developers/${data.id}`, inp)
            .then(res =>{
                
                Swal.fire({
                    title: 'Success!',
                    text: 'Developer Updated.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
                  navigate("/developers")
            }).catch(err =>{
                console.log(err);
            })
            
        }
        
    }

    return (
    <>
       <div className="developer-page">
            <Container>
                <div className="text-center h1 py-4">Update Developer</div>
                <Link className='btn btn-primary mb-3' to="/">Back Home</Link>
                <form action="#" className='w-50 m-auto bg-dark p-3' onSubmit={HandelSubmitForm}>
                    <input type="text" name="name" className='form-control mb-3' placeholder='Name' value={inp.name} onChange={HandleInp}/>
                    <input type="text" name="age" className='form-control mb-3' placeholder='Age' value={inp.age} onChange={HandleInp}/>
                    <input type="text" name="skill" className='form-control mb-3' placeholder='Skill' value={inp.skill} onChange={HandleInp}/>
                    {inp.photo && <img src={inp.photo} alt="" />}
                    <input type="text" name="photo" className='form-control mb-3' placeholder='Photo' value={inp.photo} onChange={HandleInp}/>
                    <button className='btn btn-primary' type='submit'>Update</button>
                </form>
                
            </Container>
        </div> 
    </>
  )
}

export default DevEdit