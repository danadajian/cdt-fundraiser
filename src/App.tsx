import React, {useState} from 'react';
import './App.css';
import {State} from "./types";
import {TzedakahTable} from "./components/TzedakahTable";
import {PaymentSection} from "./components/PaymentSection";

const App = () => {
    const [state, setState] = useState({
        selectedBoxes: [],
        boxesTaken: [1, 3, 7, 69]
    } as State);

    return (
        <div className="App">
            <h1>Tzedakah Boxes</h1>
            <div style={{display: 'flex'}}>
                <TzedakahTable state={state} setState={setState}/>
                <PaymentSection state={state}/>
            </div>
        </div>
    );
}

export default App;
