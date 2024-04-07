import { Link } from "react-router-dom";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
const MovieCard = ({movies}) => {
  const { id,title, posterURL, imdbId, category, description} = movies;
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <div className="movie">
      <>
      <div className="movie-top" onClick={onOpenModal} style={{ cursor:"pointer"}} >
        <img src={posterURL} className="image"/>
        {/* <Link to={`/movie/${id}`} key={id}>{title}</Link> */}
        <span style={{textTransform: "capitalize"}}>{title}</span>
      </div>
      <Modal id={id} open={open} onClose={onCloseModal} center>

      <div className="row" style={{display:"flex"}}>
        <div className="column" style={{flex:"50%", padding:"10px" }}>
          <img src={posterURL} className="{}"/>
        </div>
        <div className="column" style={{flex:"50%", padding:"10px" }}>
          <h2>{title}</h2>
          <p> Category: {category}</p>
          <p>IMDB Video Code: {imdbId}</p>
          <p>Description: There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
          <a href={`https://imdb.com/title/${imdbId}`} target="_blank"> More Info</a>
        </div>
      </div>
    </Modal>
    </>
    </div>
  );
};

export default MovieCard;