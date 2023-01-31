import React, { useState } from "react";
import "./styles.css";

function App() {
  const [state, setState] = useState({
    input: "",
    checked: false,
    data: "",
    error: false,
    errorMessage: "",
  });

  const handleChange = (e) => {
    setState({ ...state, input: e.target.value });
  };

  const handleCheck = (e) => {
    setState({ ...state, checked: e.target.checked });
  };

  const handleClick = async () => {
    try {
      let response = await fetch(
        `https://api.github.com/users/${state.input}/repos`,
        {
          Accept: "application/vnd.github+json",
        }
      )
      response = await response.json();
      if (response.message) {
        setState({ ...state, error: true, errorMessage: response.message });
      }else{    
        setState({ ...state, data: response });
      }
    } catch (err) {
      setState({ ...state, error: true, errorMessage: err.message });
    }
  };

  return (
    <div className="App">
      <div className="input">
        <label htmlFor="username">Github username: </label>
        <input onChange={handleChange} id="username" type="text" />
        <label htmlFor="fork">Include forks: </label>
        <input onChange={handleCheck} id="fork" type="checkbox" />
        <button disabled={state.input.length === 0} onClick={handleClick}>
          Submit
        </button>
      </div>
      <section>
        <header>
          <div className="col">Name</div>
          <div className="col">Language</div>
          <div className="col">Description</div>
          <div className="col">Size</div>
        </header>
        {state.error
          ? ""
          : state.data
          ? state.checked
            ? state.data.map((elem) => (
                <div key={elem.id}>
                  <div className="col">{elem.full_name}</div>
                  <div className="col">{elem.language}</div>
                  <div className="col">{elem.description}</div>
                  <div className="col">{elem.size}</div>
                </div>
              ))
            : state.data
                .filter((elem) => {
                  return elem.fork !== true;
                })
                .map((elem) => (
                  <div key={elem.id}>
                    <div className="col">{elem.full_name}</div>
                    <div className="col">{elem.language}</div>
                    <div className="col">{elem.description}</div>
                    <div className="col">{elem.size}</div>
                  </div>
                ))
          : ""}
      </section>
      {state.error ? <div className="error">{state.errorMessage}</div> : ""}
    </div>
  );
}

export default App;
