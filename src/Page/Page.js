import React from 'react';
import Header from '../Header/Header';
import './Page.css';

export default function Page(props) {
    return (
      <div className="Page">
        <Header userData={ props.userData } logOut={ props.logOut }/>
        { props.children }
      </div>
    )
}
