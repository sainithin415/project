// client/src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CourseList from "./components/Course/CourseList";
import CourseCreate from "./components/Course/CourseCreate";
import CourseUpdate from "./components/Course/CourseUpdate";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/courses" exact component={CourseList} />
          <Route path="/courses/create" component={CourseCreate} />
          <Route path="/courses/:id/update" component={CourseUpdate} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
