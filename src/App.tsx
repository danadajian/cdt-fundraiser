import React, {useEffect, useState} from 'react';
import './App.css';
import {TzedakahTable} from "./components/TzedakahTable";
import {PaymentSection} from "./components/PaymentSection";
import {INITIAL_STATE} from "./constants";
import {getLatestBoxesTaken} from "./handlers/getLatestBoxesTaken";

const App = () => {
    const [state, setState] = useState(INITIAL_STATE);

    useEffect(() => getLatestBoxesTaken(state, setState), []);

    return <div className={'App'}>
        <h1>Mission Possible</h1>
        <TzedakahTable state={state} setState={setState}/>
        <PaymentSection state={state} setState={setState}/>
    </div>;
}

export default App;
