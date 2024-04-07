import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { useState } from 'react';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
function App() {
  const [selectedCategory, setSelectedCategory]=useState('animation');
  return (
    <div className="App">
      <Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      <Routes>
        <Route path="/movie/:movieId" exact element={<MovieDetail />}/>         
      </Routes>
      <MovieList selectedCategory={selectedCategory}/>
    </div>
  );
}

export default App;
