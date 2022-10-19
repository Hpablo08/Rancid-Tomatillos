import React, { Component } from 'react';
import './Details.css';
import { Link } from 'react-router-dom';
import { fetchMovie } from '../api';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
  }
   
  componentDidMount = async () => {
    try {
      console.log('fetching');
      const currentMovie = await fetchMovie(this.props.movieId);
      if (currentMovie.status >= 500) {
        console.log('inside if block');
        throw new Error('something went wrong');
      }
      const data = await currentMovie.json();
      console.log('data', data.movie);
      this.setState({ movie: data.movie });
    } catch (error) {
      console.log(error);
      this.setState({ error: '500 error' });
    }
  };

  render = () => {
    console.log(this.state.movie);
    if (!this.state.movie) {
      return null;
    }
    return (
      <div
        to={`/${this.state.movie.id}`}
        className="current-movie"
        id={this.state.movie.id}
      >
        <Link exact to="/" className="close-btn">
          <button className="close-btn">✕</button>
        </Link>
        <img
          className="inner-poster-img"
          src={this.state.movie.poster_path}
          alt={`poster of ${this.state.movie.title} movie`}
        />
        <div className="movie-body">
          <h2 className="movie-title">{this.state.movie.title}</h2>
          <div className="movie-details">
            <h3 className="movie-rating">
              Rating: {this.state.movie.average_rating.toFixed(2)}/10
            </h3>
            <h3 className="movie-release">
              Released: {this.state.movie.release_date.slice(0, 4)}
            </h3>
            <h3 className="movie-runtime">
              Runtime: {this.state.movie.runtime} minutes
            </h3>
            <h3 className="movie-genre">Genre: {this.state.movie.genres[0]}</h3>
          </div>
          <h3>Summary: </h3>
          <p className="movie-overview">{this.state.movie.overview}</p>
        </div>
      </div>
    );
  };
}

export default Details;
