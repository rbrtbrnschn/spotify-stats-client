import React,{ useEffect, useState} from 'react';
import Cookies from "js-cookie"
import Login from "./pages/login"
import Home from "./pages/home"
import Profile from "./pages/profile"
import Navbar from "./modules/navbar"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Docs from "./pages/docs"

function App() {
  const [state,setState] = useState({})

  useEffect(()=>{
    const cookies = Cookies.get()
    setState({...state,cookies: {...state.cookies, cookies }})
    // Cookies.get("spotify_access_token")
    // eslint-disable-next-line
  },[])
  return (
    <div className="App">
      <Router>
        <Navbar />
      <Switch>

        <Route exact path="/" render={(props)=><Home {...props}/>} />
        <Route exact path="/login" render={(props)=><Login {...props}/>} />
        <Route exact path="/profile" render={(props)=><Profile {...props}/>} />
        <Route exact path="/docs" render={(props)=> <Docs {...props} />} />
      </Switch>

      </Router>
    </div>
  );
}

export default App;
