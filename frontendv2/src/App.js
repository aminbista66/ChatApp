import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
