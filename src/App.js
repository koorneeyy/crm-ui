import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUAV from "./components/addUAV.component";
import UAV from "./components/uav.component";
import UAVsList from "./components/tutorials-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/all"} className="navbar-brand">
            
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/all"} className="nav-link">
                Засоби
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Додавання
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<UAVsList/>} />
            <Route path="/all" element={<UAVsList/>} />
            <Route path="/add" element={<AddUAV/>} />
            <Route path="/all/:id" element={<UAV/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
