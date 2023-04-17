import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom"
import { Home } from "./pages/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


function App() {
    const THEME = createTheme({
        typography:{
            "fontFamily" : `"Nunito" , sans-serif`
        }
    })

    const jwtToken = useSelector((state) => state.user.hostUser.jwtToken);
    
    if(jwtToken){
        return(
            <ThemeProvider theme={THEME}>
                <div className="App">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/new" element={<Home/>}/>
                            <Route path="*" element={<Navigate to="/" replace/>}/>
                        </Routes>
                    </Router>
                </div>
            </ThemeProvider>
        );
        
    }
    else{
        return(
            
            <ThemeProvider theme={THEME}>
                <div className="App">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="*" element={<Navigate to="/" replace/>}/>
                        </Routes>
                    </Router>
                </div>
            </ThemeProvider>
            
        )
    }
}

export default App;
