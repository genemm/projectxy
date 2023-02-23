import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./actions/userActions";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./screens/HomeScreen";
import UsernameScreen from "./screens/UsernameScreen";
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen"; 
import Play from "./screens/PlayScreen";
import Welcome from "./screens/WelcomeScreen";
import WaitingLobby from "./screens/WaitingLobby"
import { HomeProvider } from "./context/HomeContext";
import { GameProvider } from "./context/GameContext";
import { SocketProvider } from "./context/SocketContext";
import { MessagesProvider } from "./context/MessagesContext";
import { UserProvider } from "./context/UserContext";
import { PlayScreenContext } from "./context/PlayScreenContext"

const App = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="App">
      <Router>
        <div className="grid-container">
          <header className="row">
            <div>
              <Link to="/">Home</Link>
              <div className="dropdown">
                <Link to="#">
                  Play <i class="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/username">VS Player</Link>
                  </li>
                  <li>
                    <Link to="/play">VS AI</Link>
                  </li>
                </ul>
              </div>

              {/* <Link to="/">Btn3</Link> */}
              {/* <Link to="/">Btn4</Link> */}
              {/* <Link to="/">Btn5</Link> */}

              {userInfo ? (
                <Link to="#signout" onClick={signoutHandler}>
                  SignOut
                </Link>
              ) : (
                <Link to="/signin">SignIn</Link>
              )}
            </div>
          </header>
        </div>

        <main>
          <UserProvider>
            <GameProvider>
              <HomeProvider>
                <MessagesProvider>
                  <SocketProvider>
                    <PlayScreenContext>
                      <Routes>
                        <Route path="/username" element={<UsernameScreen />} />
                        <Route path="/lobby" element={<WaitingLobby />} />
                        <Route path="/play" element={<Play />} />
                      </Routes>
                    </PlayScreenContext>
                  </SocketProvider>
                </MessagesProvider>
              </HomeProvider>
            </GameProvider>
          </UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm/:confirmationCode" element={<Welcome />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
