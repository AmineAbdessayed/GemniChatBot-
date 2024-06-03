import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question.");
      return;
    }

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };

      const response = await fetch("http://localhost:5000/gemini", options);
      const data = await response.text();

      setChatHistory(oldChatHistory => [...oldChatHistory,
        { role: "user", parts: value },
        { role: "model", parts: data } // Change 'part' to 'parts'
      ]);

      setValue("");
    } catch (error) {
      console.log(error);
      setError("Something went wrong! Please try again later.");
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  return (
    <div className="app">
      <section className="search-section">
        <p>
          What do you want to know?
          <button className="surprise">Surprise me</button>
        </p>
        <div className="input-container">
          <input
            value={value}
            placeholder="When is Christmas?"
            onChange={(e) => setValue(e.target.value)}
          />
          {!error && <button onClick={getResponse}>Ask me!!</button>}
          {error && <button onClick={clear}>Clear</button>}
        </div>

        {error && <p>{error}</p>}
        <div className="search-result">
          {chatHistory.map((chatItem, _index) => (
            <div key={_index}>
              <p className="answer">
                {chatItem.role}: {chatItem.parts}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
