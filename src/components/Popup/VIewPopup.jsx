import React, { useRef } from 'react'
import { CardBody, CardHeader } from 'react-bootstrap'
import { RxCross1 } from "react-icons/rx";
import "./ViewPopup.scss"
const VIewPopup = ({singleViewData, setPopShow}) => {
    const popbody = useRef()
    
    return (
    <>
        <div className="view-data-popup" ref={popbody}>
            <div className="card">
                <CardHeader>
                    <h2>Developer</h2>
                    <span onClick={()=>setPopShow(false)}><RxCross1 /></span>
                </CardHeader>
                <CardBody>
                    <div className="left">
                        <img src={singleViewData.photo} alt="" />
                    </div>
                    <div className="right">
                        <h4>Name : {singleViewData.name}</h4>
                        <hr />
                        <h5>Age : {singleViewData.age}</h5>
                        <h5>Skill : {singleViewData.skill}</h5>
                        <hr />
                        <button className='btn btn-outline-success mt-4'>Contact</button>
                    </div>
                </CardBody>
            </div>
        </div>
    </>
  )
}

export default VIewPopup