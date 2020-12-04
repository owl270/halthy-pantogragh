import React from 'react';
import './style.scss';
import {Spinner} from "react-bootstrap";

const loader = (props) => {

    return props.utils === 'panelLayout'
        ?
        <div className="loader-panel">
            <div className="loader-panel-line"/>
            <Spinner animation="border" size={'sm'} variant={'light'}/>
        </div>
        :
        <div className="loader-pages">
            <Spinner animation="grow" size={'lg'} variant={'secondary'}/>
        </div>
};

export default loader;