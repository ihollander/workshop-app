import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./global-styles";
import Home from "./home";
import Exercise from "./exercise";
import Header from "./header";
import FourOhFour from "./four-oh-four";
import { ThemeProvider } from "./theme";

function App({ exercises, projectTitle }) {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider>
        <Switch>
          <Route exact path="/">
            <Home exercises={exercises} projectTitle={projectTitle} />
          </Route>
          <Route exact path="/:exerciseId(\d+)">
            <PageWrapper>
              <Header exercises={exercises} projectTitle={projectTitle} />
              <Exercise exercises={exercises} />
            </PageWrapper>
          </Route>
          <Route path="*">
            <FourOhFour />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

// not sure why (grid-template-rows: auto 1fr) doesn't work...
const PageWrapper = styled.div`
  display: grid;
  grid-template-rows: 70px calc(100vh - 70px);
`;

export default App;
