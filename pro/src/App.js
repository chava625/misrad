import "./App.css";
import React, {Component } from "react";
import { Routes, Route } from "react-router-dom";
import Todos from "./components/todos";
import Blogs from "./components/blogs";


class App extends Component {
  state = {  } 
  render() { 
    return (
      <>
          <Routes>
          <Route path="/*" element={< Todos/>} />
          <Route path="blogs" element={<Blogs />} />
        </Routes>
      </>
        );
  }
}
 
export default App;
