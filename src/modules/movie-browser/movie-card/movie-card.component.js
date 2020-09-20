import React from 'react';
import {connect} from 'react-redux';
import {Card, CardTitle, CardMedia} from 'material-ui';
import {openMovieModal} from '../movie-modal/movie-modal.actions';

// These are inline styles
// You can pass styles as objects using this convention
const styles = {
  cardMedia: {
    maxHeight: 394,
    overflow: 'hidden'
  },
  movieObj: {
    height: 165,
    margin: 5,
    marginBottom: 10
  },
  card: {
    cursor: 'pointer',
    height: 136,
    overflow: 'hidden',
    marginBottom: 5

  },
  bgImage: {
    width: '100%'
  }
};

class MovieCardComponent extends React.Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the movie card
    this.state = {
      isMouseOver: false
    };
  }

  render() {
    const {movieObject, openMovieModal} = this.props;
    // The CardTitle.subtitle won't render if it's null
    const title = movieObject[2].length > 28 ? movieObject[2].slice(0, 26) + '...' : movieObject[2];

    return (
      <div style={styles.movieObj}>
        <Card
          style={styles.card}
          onMouseOver={() => this.setState({isMouseOver: true})}
          onMouseLeave={() => this.setState({isMouseOver: false})}
          onClick={() => {
          }}
        >
          <img style={styles.bgImage} src={movieObject[1]}/>

        </Card>
        <div>
          <p style={{fontSize: 18, height: 43, fontWeight: 'bold'}}> {title} </p>
          <p style={{'text-align': 'center', fontSize: 14,}}> {'观看次数 ' + movieObject[5]} </p>

        </div>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  {openMovieModal}
)(MovieCardComponent);
