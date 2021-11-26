import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/Navbar";
import SignUp from "./Pages/SignUp";
import Map from "./Pages/Map";
import Login from "./Pages/Login";
import ImageUpload from "./Pages/ImageUpload";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Discover from "./Pages/Discover";
import Inspiration from "./Pages/Inspiration";
import Hashtag from "./Pages/Hashtag";

export default function App() {
  return (
    <div>
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/pages/login" component={Login} />
            <Route path="/pages/signup" component={SignUp} />
            <Route path="/pages/map" component={Map} />
            <Route path="/pages/imageupload" component={ImageUpload} />
            <Route path="/pages/inspiration" component={Inspiration} />
            <Route path="/pages/profile/:userId" component={Profile} />
            <Route path="/pages/profile" component={Profile} />
            <Route path="/pages/discover" component={Discover} />
            <Route
              path="/pages/Architecture"
              render={() => <Hashtag searchValue={`architecture`} />}
            />
            <Route
              path="/pages/Colourful"
              render={() => <Hashtag searchValue={`colourful`} />}
            />
            <Route
              path="/pages/Greenery"
              render={() => <Hashtag searchValue={`greenery`} />}
            />
            <Route
              path="/Vibes"
              render={() => <Hashtag searchValue={`vibes`} />}
            />
            <Route
              path="/pages/Tourist"
              render={() => <Hashtag searchValue={`tourist`} />}
            />
            <Route
              path="/pages/Rooftop"
              render={() => <Hashtag searchValue={`rooftop`} />}
            />
            <Route
              path="/pages/Sunset"
              render={() => <Hashtag searchValue={`sunset`} />}
            />
            <Route
              path="/pages/Lights"
              render={() => <Hashtag searchValue={`lights`} />}
            />
            <Route
              path="/pages/Location"
              render={() => <Hashtag searchValue={`location`} />}
            />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
