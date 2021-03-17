import React, {useEffect, useState} from 'react';
import './App.css';
import {TzedakahTable} from "./components/TzedakahTable";
import {PaymentSection} from "./components/PaymentSection";
import {INITIAL_STATE} from "./constants";
import {getLatestBoxesTaken} from "./handlers/getLatestBoxesTaken";
import Logo from './images/mission-possible-logo.png';

const App = () => {
    const [state, setState] = useState(INITIAL_STATE);

    useEffect(() => getLatestBoxesTaken(state, setState), []);

    return <div className={'App'}>
        <img className={'Logo'} src={Logo} alt={'Logo'}/>
        <TzedakahTable state={state} setState={setState}/>
        <PaymentSection state={state} setState={setState}/>
    </div>;
}

export default App;
