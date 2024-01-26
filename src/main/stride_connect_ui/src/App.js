import React from 'react';
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import {BrowserRouter} from "react-router-dom";


function App() {
    const sections = [
        {title: 'Pradžia', url: '/'},
        {title: 'Straipsniai', url: '/'},
        {title: 'Varžybos', url: '/'},
        {title: 'Apklausos', url: '/polls'}
    ]

    return (
        <BrowserRouter>
            <Header sections={sections}/>
            <Content/>
            <Footer/>
        </BrowserRouter>

    );
}

export default App;
