import React, { useState } from 'react';
import './App.css';


const defaultParticipants = [
    {
        'state': 1
    },
    {
        'state': 0
    },
    {
        'state': -1
    },
    {
        'state': -1
    },
]

function onClick(e, participants, setParticipants, setPointer) {
    let gaze = {
        "x": e.clientX,
        "y": e.clientY
    }
    setPointer({...gaze})
    return calcAllPoses(participants, gaze, setParticipants)
}

function calcAllPoses(participants, gaze, setParticipants) {
    // TODO: get gaze information from head pose
    let numParticipants = participants.length
    let iw = window.innerWidth
    let focused = Math.floor(gaze['x'] / (iw / numParticipants))
    let ret = []

    for (const [i, p] of participants.entries()) {
        // Create a copy of participant
        let ret_p = JSON.parse(JSON.stringify(p))

        // Change state based on gaze focus
        if (i < focused) {
            ret_p['state'] = 1
        }
        else if (i === focused) {
            ret_p['state'] = 0
        }
        else {
            ret_p['state'] = -1
        }

        ret.push(ret_p)
    }

    console.log("gaze:"+JSON.stringify(gaze))
    console.log(ret)
    setParticipants(ret)
    return ret
}

function App() {
    const [participants, setParticipants] = useState(defaultParticipants)
    const [pointer, setPointer] = useState({"x": 0, "y": 0})
    return (
        <div className="App">
            <div className="participants">
                {participants.map((p, i) => {
                    return (
                        <div key={i} className="participant" style={{"width": (100 / participants.length) + "%"}}>
                            {p.state} 
                        </div>
                    )
                })}
            </div>
            <div className="click-area" onClick={ (e) => {onClick(e, participants, setParticipants, setPointer)}}>
                <div id="pointer" style={{"left": pointer.x + "px", "top": pointer.y + "px"}}/>
            </div>
        </div>
    );
}

export default App;
