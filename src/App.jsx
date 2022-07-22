import "./App.css";
import Root from "./contexts/Root";
import Router from "./router/Router";

export default function App() {
  return (
    <div className="font-inter">
      <Root>
        <Router></Router>
      </Root>
    </div>
  );
}
