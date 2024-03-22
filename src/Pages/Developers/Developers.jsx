import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { CiEdit, CiTrash  } from "react-icons/ci";
import { LuEye } from "react-icons/lu";
import "./developer.scss"
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import VIewPopup from '../../components/Popup/VIewPopup';
import { IoSearchOutline } from "react-icons/io5";

const Developers = () => {

    // all developer data
    const [devData, setDevData] = useState([])
    // console.log(devData);
    // dev popup status
    const [popShow, setPopShow] = useState(false)
    // single view data store
    const [singleViewData, setSingleViewData] = useState({})

    // pagenation items
    const [pages, setPages] = useState({
        allDevsNum : "",
        pageNat : []
    })

    // search key
    const [searchWord, setSearchWord] = useState("")
    const [serData, setSerData] = useState("")
    const [serEmpty, setSerEmpty] = useState(false)
    const [clsBTN, setClsBTN] = useState(false)



    useEffect(()=>{
        // get devs
        axios.get('http://localhost:5050/developers?_page=1&_limit=5')
        .then(res =>{
            setDevData(res.data)
        })

        
        // pagenation Items and all dev counter
        axios.get('http://localhost:5050/developers')
        .then(res =>{
            const length = res.data.length
            const Paginlength = Array(Math.ceil(length/5)).fill(0)
            setPages({
                allDevsNum : length,
                pageNat : Paginlength
            })
        })
    }, [])
    

    // delete developers
const HandleDevDelete = (id) =>{

        
    Swal.fire({
        title: "Are you sure want to delete?",
        showCancelButton: true,
        confirmButtonText: "Sure",
      }).then((result) => {
        
        if (result.isConfirmed) {
            axios.delete(`http://localhost:5050/developers/${id}`).then(res =>{
                // setDevData(devData.filter(data => data.id !== id))
                // pagenation Items and all dev counter
                axios.get('http://localhost:5050/developers')
                .then(res =>{
                    const length = res.data.length
                    const Paginlength = Array(Math.ceil(length/5)).fill(0)
                    setPages({
                        allDevsNum : length,
                        pageNat : Paginlength
                    })
                })
                axios.get(`http://localhost:5050/developers?_page=${pages.pageNat.length}&_limit=5`).then(res =>{
                    setDevData(res.data)
                })
                Swal.fire("Done", "", "success");
            }).catch(error => {
                Swal.fire("Deleted Warng!", "", "warning");

            })
        }
      });
}
 
    // view single Data
    const HandleViewDev = async (id) =>{
         setSingleViewData(devData.find(data => data.id === id))
         setPopShow(true)
    }


    // pagenation page number
    const Handlepagenation = (num) => {
        axios.get(`http://localhost:5050/developers?_page=${num}&_per_page=5`)
        .then(res => {
            setDevData(res.data.data);
        })
    }


    // search handler
    const HandleSearch = () => {
       
            axios.get(`http://localhost:5050/developers?name=${searchWord}`).then(res =>{
                setSerData(res.data);
                setClsBTN(true)
                
                if (!res.data[0]) {
                    setSerEmpty(true)
                }
        })
        
        
    }

    // search close
    const HandleSearchClose = () =>{
        setSearchWord("")
        setSerData("")
        setSerEmpty(false)
        setClsBTN(false)
    }

    
  return (
    <>

        {popShow && <VIewPopup singleViewData={singleViewData} setPopShow={setPopShow}/>}
    
        <div className="developer-page">
            <Container>
                <div className="text-center h1 py-4">Our Developer</div>
                <div className="header-sec-our-dev">
                    <Link className='btn btn-primary mb-3' to="/add">Create New Developer</Link>
                    <div className="search-box">
                        <input type="text" placeholder='Name Search...' value={searchWord} onChange={(e)=>setSearchWord(e.target.value)}/>
                        <button onClick={HandleSearch}><IoSearchOutline /></button>

                        <div className="show-ser-res">
                            <table className='table'>
                            <tbody>
                                {
                                        clsBTN && <div onClick={HandleSearchClose} className='close'>Close</div>
                                }
                                { serEmpty && <div className='close'>Data Not Found!</div> }
                                
                                
                                {
                                    serData && serData.map((data, index) =>
                                    <tr key={index}>
                                    <td><img src={data.photo} alt="" /></td>
                                    <td>{data.name}</td>
                                    <td><button className='bg-primary' onClick={()=>HandleViewDev(data.id)}><LuEye /></button></td>
                                    
                                </tr>
                                
                                    )
                                    
                                }
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="tablewrap">
                <table className='table table-striped table-dark'>
                    <thead>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Skill</th>
                        <th>Photo</th>
                        <th >Action</th>
                    </thead>

                    <tbody>
                        {
                           devData.map((data, index) => 
                           <tr key={index} className=''>
                           <td>{data.id}</td>
                           <td>{data.name}</td>
                           <td>{data.age}</td>
                           <td>{data.skill}</td>
                           <td><img src={data.photo} alt="" /></td>
                           <td>
                               <Link to={`/edit/${data.id}`} ><button className='bg-success'><CiEdit /></button></Link>
                               <button className='bg-primary' onClick={()=>HandleViewDev(data.id)}><LuEye /></button>
                               <button className='bg-danger' onClick={()=>HandleDevDelete(data.id)}><CiTrash  /></button>
                           </td>
                       </tr>
                           ) 
                        }
                        
                    </tbody>
                </table>
                </div>
                <div className="pagenation">
                    <div className="items">
                        
                        <h4 className='text-white'>Number Of Developers : {pages.allDevsNum}</h4>
                        
                        {
                            pages.pageNat.map((item, index) => (
                                <button key={index} onClick={(()=>Handlepagenation(index+1))}>{index+1}</button>
                              ))
                        }
                    </div>
                </div>
            </Container>
        </div>
    </>
  )
}

export default Developers