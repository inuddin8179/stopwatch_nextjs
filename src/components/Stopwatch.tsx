import React, { useReducer, useEffect } from 'react';

interface State {
    isRunning: boolean;
    seconds: number;
}

type Action =
    | { type: 'START' }
    | { type: 'STOP' }
    | { type: 'RESET' }
    | { type: 'TICK' };

const initialState: State = {
    isRunning: false,
    seconds: 0,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'START':
            return { ...state, isRunning: true };
        case 'STOP':
            return { ...state, isRunning: false };
        case 'RESET':
            return { isRunning: false, seconds: 0 };
        case 'TICK':
            return { ...state, seconds: state.seconds + 1 };
        default:
            return state;
    }
};

const Stopwatch: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (state.isRunning) {
            interval = setInterval(() => {
                dispatch({ type: 'TICK' });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [state.isRunning]);

    return (
        <div>
            <h1>Stopwatch</h1>
            <div style={{ fontSize: '2rem' }}>
                {Math.floor(state.seconds / 60)}:
                {(state.seconds % 60).toString().padStart(2, '0')}
            </div>
            <button onClick={() => dispatch({ type: 'START' })} disabled={state.isRunning}>
                Start
            </button>
            <button onClick={() => dispatch({ type: 'STOP' })} disabled={!state.isRunning}>
                Stop
            </button>
            <button onClick={() => dispatch({ type: 'RESET' })}>
                Reset
            </button>
        </div>
    );
};

export default Stopwatch;
