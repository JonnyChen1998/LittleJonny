import React from 'react';
import {Row, Col} from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card.component';
import LoaderComponent from '../../common/loader.component';

const styles = {
  movieColumn: {
    // marginBottom: '1%'
  },
  row: {
    // marginBottom: 50
  }
}

const MovieListComponent = ({movies, isLoading}) => {
  // console.log('MovieListComponent:' + movies);

  // let myObject = JSON.parse(jsonData);
  //
  // let selectMoviesObject = myObject[0];
  // console.log('data:', myObject[0][1]);

  const movieColumns = movies ? movies.map((movieObject, index) => (
    <Col style={styles.movieColumn} key={index} xs={12} sm={4} md={3} lg={3}>
      <MovieCard movieObject={movieObject} />
    </Col>
  )) : null;
  
  return (
    <Row style={styles.row}>
      {movieColumns}
      <LoaderComponent isLoading={isLoading} />
    </Row>
  );
}

export default MovieListComponent;
