import React from 'react';
import {connect} from 'react-redux';
import {Card, CardTitle, CardMedia} from 'material-ui';
// import {openMovieModal} from '../movie-modal/movie-modal.actions';

// These are inline styles
// You can pass styles as objects using this convention
const styles = {
  movieObj: {
    height: 165,
    margin: 5,
    marginBottom: 10
  },
  card: {
    cursor: 'pointer',
    height: 134,
    overflow: 'hidden',
    marginBottom: 5

  },
  bgImage: {
    width: '100%'
  },
  textImgQuality: {
    fontSize: 14,
    color: 'white',
    background: '#46A3FF',
    position: 'absolute',
    padding: 3,
    right: 23,
    top:8,
    borderRadius:4
    // alignSelf: 'flex-end',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  textImgDuration: {
    fontSize: 12,
    color: 'white',
    opacity: '0.8',
    background: '#000000',
    position: 'absolute',
    padding: 3,
    right: 23,
    bottom:30,
    borderRadius:3,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end'
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

  renderQualityTag = (str) => {
    if (str !== '')
      return (
        <p style={styles.textImgQuality}> {str} </p>
      )

  };

  render() {
    const {movieObject} = this.props;
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
          {this.renderQualityTag(movieObject[4])}
          <img style={styles.bgImage} src={movieObject[1]}/>
          <p style={styles.textImgDuration}> {movieObject[3]} </p>

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
)(MovieCardComponent);
