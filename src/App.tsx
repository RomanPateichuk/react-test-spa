import React from 'react';

import s from './App.module.css';
import {Main} from "./components/Main/Main";
import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/Header/Header";


function App() {

    return (
        <div className={s.app}>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default App;
