import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import StartPage from '../pages/StartPage/StartPage';
import PostPage from '../pages/PostPage/PostPage';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <ToastProvider placement="top-center">
      <>
        <Router basename="/">
          <Route exact path="/" component={StartPage} />
          <Route exact path="/posts/:id" component={PostPage} />
        </Router>
      </>
    </ToastProvider>
  );
}

export default App;
