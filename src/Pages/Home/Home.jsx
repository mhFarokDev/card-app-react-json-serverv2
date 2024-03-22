import React, { useEffect, useState } from 'react'
import { CardBody, CardHeader, Container } from 'react-bootstrap'

import "./Home.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'
const Home = () => {

    const [dev, setDev] = useState([])
    console.log(dev);
    useEffect(()=>{
        axios.get("http://localhost:5050/developers?_limit=4").then(res => {
            setDev(res.data)
        })
    },[])
  return (
    <>
        <div className="home-page">
            <Container>
                <div className="main-body">

                    <div className="left-sec">
                        <img src="https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710892800&semt=ais" alt="" />
                    </div>
                    <div className="right-sec">
                        <h1>We Develop the Best Application in the World!</h1>
                        <p>Our team takes pride in crafting the most exceptional application globally. With unparalleled dedication and expertise, we ensure our product stands out for its innovation, functionality, and user experience. From concept to execution, we prioritize excellence, resulting in an application that exceeds expectations and redefines industry standards. Join us on this journey as we continue to revolutionize the digital landscape with our unparalleled commitment to excellence.</p>
                        <button className='btn btn-outline-dark'>Contact</button>
                    </div>
                </div>
            </Container>


            <div className="dev-sec">
                <Container>
                    <div className="main-dev-sec">
                        <h1>Meet Our Team</h1>
                        <p>Get to know the talented individuals behind our success. Discover the passion, expertise, and creativity driving our innovative projects forward.</p>
                        <div className="dev-boxs">


                            {
                                dev.map((data, index) =>
                                <div className="card" key={index}>
                                    <CardHeader>
                                        <img src={data.photo} alt="" />
                                    </CardHeader>
                                    <CardBody>
                                        <h5>Name : {data.name}</h5>
                                        <hr />
                                        <h6>Age : {data.age}</h6>
                                        <h6>Skill : {data.skill}</h6>
                                    </CardBody>
                                </div>
                                )
                            }
                                
                            
                            

                        </div>
                        <div className="btn">
                        <Link to="/developers" >All Developers</Link>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    </>
  )
}

export default Home