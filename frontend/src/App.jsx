import React from "react";
import BudgetApp from "./BudgetApp";
import TodoApp from "./TodoApp";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Ethan Hyatt's Simple Webpage</h2>
      <button style={{marginRight: '40px', marginTop: '20px'}} onClick={() =>
          navigate("/budget")}>Go to Budget App</button>
      <button onClick={() =>
          navigate("/todo")}>Go to To-do App</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/budget">Budget App</Link>
          </li>
          <li>
            <Link to="/todo">To-do App</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget" element={<BudgetApp />} />
        <Route path="/todo" element={<TodoApp />} />
      </Routes>
    </Router>
  );
}

export default App;
