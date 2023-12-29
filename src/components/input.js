import { useState } from "react";
import './input.css'

function Input() {
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState("");
    const [data, setData] = useState([]);
    const [settlementIndex, setSettlementIndex] = useState(null);
    const [settlementAmount, setSettlementAmount] = useState("");
    const [total, setTotal] = useState(0);

    // Submit Function, when form is submit, it will add field with informaiton
    function handleSubmit(e) {
        e.preventDefault();

        if (message.trim() !== "" && amount >= 0) {
            const amountInt = parseInt(amount, 10);
            setData([...data, `${message} - ${amountInt}`]);

            setTotal(total + amountInt);


            setMessage("");
            setAmount("");
        }
    }
    // When Clear button is clicked, It will Clear the corresponding Field
    function handleClear(index) {
        const newData = [...data];
        let strWithNumber = data[index];
        let parts = strWithNumber.split('-');
        const clearAmount = parseInt(parts[1].trim(), 10);
        setTotal(total - clearAmount);
        newData.splice(index, 1);
        setData(newData);
        setSettlementIndex(null);
    }
    // Funtion is called when Settle Button is clicked, settlement index is used for conditional rendering
    function handleSettlement(index) {
        setSettlementIndex(index);
    }
    // Function for settlement
    function handleConfirmSettlement() {

        // seperating Amount and Message
        let strWithNumber = data[settlementIndex];
        let parts = strWithNumber.split('-');
        const currentMessage = parts[0].trim();
        const currentAmount = parseInt(parts[1].trim(), 10);

        const settlementAmountint = parseInt(settlementAmount, 10);


        if (currentAmount < settlementAmountint) {
            alert("Your Settlement Amount is Greater then Current Amount. Better to clear it.")
        }
        else if (currentAmount === settlementAmountint) {
            const newData = [...data];
            newData.splice(settlementIndex, 1);
            setData(newData);
            setTotal(total - settlementAmountint);

            setSettlementIndex(null);
            setSettlementAmount("");

        }
        else {
            let newAmount = currentAmount - settlementAmountint;
            data[settlementIndex] = `${currentMessage} - ${newAmount}`;
            setTotal(total - settlementAmountint);
            setSettlementIndex(null);
            setSettlementAmount("");
        }




    }

    return (
        <div>
            <div>
                <nav className="header">

                    <h1 className="title">
                        <img src="/logo.png" className="logo" />
                        KaataBook
                    </h1>
                </nav>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            className="message input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message"
                        />
                        <input
                            type="number"
                            className="amount input"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Type an amount"

                        />
                        <button type="submit" className="submit-button">Add</button>
                    </div>
                </form>

                <div>
                    <h2>Total Amount - {total}</h2>
                    {total === 0 ? <div className="emoji">Your are Rich! &#128522;</div> : <div className="emoji"> Your are Poor! &#128561;</div>}

                </div>
                {/* List items */}
                <div>
                    <ul className="list">
                        {data.map((item, index) => (
                            <li key={index} className="list-item">
                                {item}
                                <button onClick={() => handleClear(index)} className="clear-button">Clear</button>
                                <button onClick={() => handleSettlement(index)} className="settle-button">Settle</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Conditional Rendering */}
                {settlementIndex !== null && (
                    <div>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter the amount"
                            value={settlementAmount}
                            onChange={(e) => {
                                const inputText = e.target.value;
                                // Use a regular expression to check if the input contains only digits
                                if (/^\d+$/.test(inputText)) {
                                    setSettlementAmount(inputText);
                                }


                            }}
                        />

                        <button onClick={handleConfirmSettlement} className="confirm-button">Confirm</button>
                    </div>
                )}

                {/* <div>
                    <h2>Total Amount - {total}</h2>
                </div> */}
            </div>
        </div>
    );
}

export default Input;
