import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/user/" element={<UserList />} />
          <Route path="/user/:id" element={<UserForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
