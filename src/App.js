import "./App.css";
import AppContext from "./contexts/AppContext";
import React, { Suspense, lazy } from 'react';
import Header from "./components/Header/Header";
import styled, { createGlobalStyle } from "styled-components";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Lists from "./pages/Lists";
const ListDetail = lazy(() => import( /* webpackChunkName: "ListDetail" */ './pages/ListDetail'))
const ListForm = lazy(() => import( /* webpackChunkName: "ListForm" */ './pages/ListForm'))
// import ListDetail from "./pages/ListDetail";
// import ListForm from "./pages/ListForm";




const GlobalStyle = createGlobalStyle `
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div `
  text-align: center;
`;

function App() {
    return (
        <React.Fragment>
        <GlobalStyle /> 
        <AppWrapper>
        <Header />
        <AppContext>
        <Router >
        <Suspense fallback={ <div> En cours de chargement... </div> } >
        <Routes>
            <Route path="/" element={<Lists />} />
            <Route path='/list/:listId' element={<ListDetail />} />
            <Route path='/list/:listId/new' element={<ListForm />} />
          </Routes>
          </Suspense>
          </Router>
          </AppContext>
        </AppWrapper> 
        </React.Fragment>
    );
}

export default App;