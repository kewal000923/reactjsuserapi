import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import UserList from "./Pages/User/UserList";
import SingleUser from "./Pages/User/SingleUser";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<UserList/>} />
            <Route path="/user/:id" element={<SingleUser/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
