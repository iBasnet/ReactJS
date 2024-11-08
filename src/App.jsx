import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {

  function toggleClass() {
    const navHeader = document.querySelector('header');
    navHeader.classList.toggle('active');

    const boxIcon = document.querySelector('i');
    boxIcon.classList.toggle('bx-x');
  }

  return (
    <header>
      <nav>
        <div className="logo">
          <h1>EÐ</h1>
        </div>
        <ul>
          <li className="active">Home</li>
          <li>Products</li>
          <li>Services</li>
          <li>Social</li>
          <li>Contact</li>
        </ul>
        <div className="hamburger" onClick={toggleClass}>
          <i className='bx bx-menu bx-lg'></i>
        </div>
        <div className="btn-group">
          <a href="">Sign up</a>
          <button><a href="">Log in</a></button>
        </div>
      </nav>
    </header>
  );
}