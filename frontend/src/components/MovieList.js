import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

const MovieList = ({selectedCategory}) => {
    const [movies, setMovies]=useState([]);
    const [loading, setLoading]= useState(false);
    useEffect(()=>{
        setLoading(true)
        fetch(`http://localhost:3300/movies/category/${selectedCategory}`)
            .then(res=>res.json())
            .then(json=>{
                setMovies(json)
                setLoading(false)
            })
    },[selectedCategory])

    const ShimmerCard = () =>( 
        <div className="loading-card">
            <div className="image loading-shimmer"></div>
            <div className="title loading-shimmer"
            style={{marginTop: "1rem", height:"1rem"}}>
            </div>
            <div 
                className="title loading-shimmer"
                style={{ marginTop: "0.5rem", height:"1rem", width:"80%"}}></div>
        </div>
     );
    if(loading){
        return(
            // <div className="loading">Loading ...</div>
            <div className="products">
            {Array(6).fill().map((item, index)=>(
                <ShimmerCard key={index}/>
            ))}
            </div>
        )
    }
    
    return <div id="movies" >{
        movies.map(movie=>(
            <MovieCard key={movie.id} movies={movie} />
        ))
    }</div>

};
export default MovieList;