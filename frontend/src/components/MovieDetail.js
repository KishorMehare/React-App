// import React from 'react';
// import { useParams } from 'react-router';
// import { useState, useEffect } from "react";
// // import moviedata from "./components/movieData";
// function MovieDetail() {
//     const param = useParams();
//     const movieId = param.movieId;
//     console.log("useparram",param);
//     const [thisMovie, setMovies]=useState([]);
//     // console.log(MoviesData);
//     // const thisMovie = moviesData.find(prod => prod.id === MovieId)
//     const [loading, setLoading]= useState(false);
//     useEffect(()=>{
//         setLoading(true)
//         fetch(`http://localhost:3300/movie/${movieId}`)
//             .then(res=>res.json())
//             .then(json=>{
//                 setMovies(json)
//                 setLoading(false)
//             })
//     },[movieId])
//     console.log(thisMovie);
// //   
//     // const {movieId} = useParams()
//     // const thisMovie = moviesData.find(prod => prod.id === movieId)
    
//     return (
//         <div>
//             <h1>{thisMovie.title}</h1>
//             <p>Price: ${thisMovie.category}</p>
//             <p>{thisMovie.id}</p>
//         </div>
//     )
// }

// export default MovieDetail

import React from 'react';
import { useParams } from 'react-router';
// import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import styles from "./Details.css";

const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3300/movie/${params.movieId}`)
      .then((res) => res.json())
      .then((json) => {
        setMovie(json)
      });

  }, [params.movieId]);
  return (
    
        <div className={styles.detailsContainer}>
            
            <div className={styles.detailsWrapper}>
                <div>
                    {/* <p>{movie?.id}</p> */}
                    
                    <h2>{movie?.title}</h2>
                    <img
                        className={styles.detailsImage}
                        src={movie?.posterURL}
                        alt={movie?.title}
                        />
                    {/* <p>{movie?.description}</p> */}
                    <p>Category: {movie?.category}</p>
                </div>
            <div>
          
        </div>
      </div>
    </div>
    
  );
};

export default MovieDetail;