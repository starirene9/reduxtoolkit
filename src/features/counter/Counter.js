import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, incrementByAmount, reset} from "./counterSlice";
import {useState} from "react";

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState(0);
    const addValue = Number(incrementAmount) || 0; // 숫자인지 확실하게 하는 것임
    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    }

    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>
            <input
                type="text"
                value={incrementAmount} // 0
                onChange={(e) => setIncrementAmount(e.target.value)}/>
            <div>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>
                    Add Amount
                </button>
                <button onClick={resetAll}>
                    Reset
                </button>
            </div>
        </section>
    );
};

export default Counter;