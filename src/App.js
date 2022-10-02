import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./contexts/auth-context";

import "./App.css";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import Home from "./components/Home";
import History from "./components/History";
import Generate from "./components/Generate";
import Bill from "./components/Bill";
import Payment from "./components/Payment";
import Thanks from "./components/Thanks";

function App() {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <div className="App text-center">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/thanks" element={<Thanks />} />

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
