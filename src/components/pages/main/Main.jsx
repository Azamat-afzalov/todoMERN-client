import React from 'react';
import {Link} from 'react-router-dom';
import './Main.css';
const Main = () => {

    return(
        <section className='Main'>
            <h1 className='Main-header'>Plan your tasks</h1>
            <h3 className='Main-title'>Change your life for better</h3>
            <div className='Main-menu'>
                <Link to='/todo' className='Main-menu-box'>
                    Todo
                </Link>
                <Link to='/habit' className='Main-menu-box'>
                    Habit Tracker
                </Link>
                <Link to='todo' className='Main-menu-box'>
                    Todo
                </Link>
                <Link to='todo' className='Main-menu-box'>
                    Todo
                </Link>
            </div>

        </section>
    )
};

export default Main;