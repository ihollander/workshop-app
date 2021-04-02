import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "../components/global-styles";
import Home from "../pages/home";
import FourOhFour from "../pages/four-oh-four";
import Exercise from "../pages/exercise";
import { ThemeProvider } from "../theme";

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
            <Exercise exercises={exercises} projectTitle={projectTitle} />
          </Route>
          <Route path="*">
            <FourOhFour />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
