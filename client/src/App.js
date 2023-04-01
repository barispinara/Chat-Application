import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom"


function App() {
    const userToken = JSON.parse(sessionStorage.getItem("user"));

    if(userToken){
        return(
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
    else{
        return(
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </Router>
            </div>
        )
    }
}

export default App;
