import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

{
  /* <React.StrictMode>
    <Provider store={store} >
   
    <App />
    
    </Provider>
  </React.StrictMode>, */
}
