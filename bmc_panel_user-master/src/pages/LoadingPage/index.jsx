import React from "react"
import { Spinner } from 'react-bootstrap'

import './style.css'

export function LoadingPage(){

    return (
            <div className="loading__page">
                <div className="loading__box">
                  <Spinner animation="border" size="lg" className="loading__icon"/>
                  {/* <div className="loading__title">Carregando...</div> */}
                </div>
            </div>
    )
}