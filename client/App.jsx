import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ChirpCard from "./components/ChirpCard.jsx";
import "babel-polyfill";

const App = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chirps, setChirps] = useState([
    {
      id: 1,
      username: "user1",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
    {
      id: 2,
      username: "user2",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
    {
      id: 3,
      username: "user3",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
  ]);

  //TODO: PUll data from backend
  useEffect(() => {
    (async () => {
      let data = await fetch("/api/chirps");
      let chirps = await data.json();
      setChirps(chirps);
      console.log(`CHIRPS ${chirps}`);
    })();
  }, []);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("User Added");
    
    const userData = {
      userid: 1,
      content: message,
      location: "Bham" 
    };

    try {
      const add = await fetch("http://localhost:3000/api/chirps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(add);
    } catch (err) {
      console.error(err);
    }
  };

  //   const newChirp = {
  //     id: uuidv4(),
  //     username: username,
  //     message: message,
  //     created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  //   };

  //   setChirps([...chirps, newChirp]);

  return (
    <>
      <div className="container text-body text-center">
        <div className="row">
          <div className="col-12 p-0">
            <nav>
              <img
                className="banner"
                src="./assets/banner.jpg"
                alt="logo for awesome site yay"
              />
              <h1>Ghibli Chirpr</h1>
            </nav>
          </div>
        </div>
        <div className="row">
          <form action="">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Username"
                aria-label="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <textarea
                className="form-control mb-2"
                aria-label="With textarea"
                placeholder="(500 characters max)"
                value={message}
                onChange={handleMessageChange}
                cols="30"
                rows="10"
              ></textarea>
              <button className="btn btn-dark" onClick={handleChirpSubmit}>
                Chirp It!
              </button>
            </div>
          </form>
          <div className=" chirps mb-4">
            {chirps.map((chirp) => (
              // <ChirpCard
              //   key={chirp.id}
              //   username={chirp.username}
              //   message={chirp.message}
              //   created={chirp.created}
              // />
              <div className="card" key={chirp.id}>
                <div className="card-body">
                  <h5 className="card-title">{chirp.username}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {chirp.created}
                  </h6>
                  <p className="card-text">{chirp.content}</p>
                  <a href="#" className="card-link">
                    Card link
                  </a>
                  <a href="#" className="card-link">
                    Another link
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
