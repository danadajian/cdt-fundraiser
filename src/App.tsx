import React, {useEffect, useState} from 'react';
import './App.css';
import {TzedakahTable} from "./components/TzedakahTable";
import {PaymentSection} from "./components/PaymentSection";
import {INITIAL_STATE} from "./constants";
import {getLatestBoxesTaken} from "./handlers/getLatestBoxesTaken";

const App = () => {
    const [state, setState] = useState(INITIAL_STATE);

    useEffect(() => getLatestBoxesTaken(state, setState), []);

    return (
        <div className="App">
            <h1>Tzedakah Boxes</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                    <TzedakahTable state={state} setState={setState}/>
                </div>
                <div>
                    <PaymentSection state={state} setState={setState}/>
                </div>
            </div>
        </div>
    );
}

export default App;
