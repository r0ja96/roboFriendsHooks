import React, { Component, useState, useEffect } from 'react';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";
//import {robots} from './robots';
import './App.css';

function App() {

    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [count, setCount] = useState(0);

    /*async componentDidMount(){
          fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(user => this.setState({ robots: user}));
//--------------------------------------------
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        this.setState({ robots: data });


         const p = Promise.all([fetch('https://jsonplaceholder.typicode.com/users'),fetch('https://jsonplaceholder.typicode.com/posts')]);
         const d = await p;
         const data = await d[0].json();
         this.setState({ robots: data});

    }*/

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(user => setRobots(user));
        console.log(count);
    }, [count]);

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(
            searchfield.toLowerCase()
        );
    });

    return !robots.length ?
        <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <button onClick={() => { setCount(count + 1) }}>click me</button>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
}

export default App;