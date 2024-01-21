import React from 'react';
import {Button, Container, Navbar} from "react-bootstrap";
import Header from "./components/header/Header";
import Content from "./components/content/Content";

function App() {
  const sections = [
    {title: 'Pradžia', url: '/'},
    {title: 'Straipsniai', url: '/'},
    {title: 'Varžybos', url: '/'},
    {title: 'Kontaktai', url: '/'}
  ]

  return (
      <>
        <Header sections={sections}/>
        <Content/>
      </>

  );
}

export default App;
