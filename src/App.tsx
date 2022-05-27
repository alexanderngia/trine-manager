import React from "react";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import "./App.scss";
import Authentication from "./components/views/auth";
import { menuAdmin } from "./constant/sidebar";
import { history } from "./utils/history";

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Authentication />} />
        {React.Children.toArray(
          menuAdmin.map((route) => {
            return <Route path={route.path} element={route?.page} />;
          })
        )}
      </Routes>
    </HistoryRouter>
  );
}

export default App;
