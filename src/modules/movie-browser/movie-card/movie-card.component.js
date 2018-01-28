import React from 'react';
import {Card, CardTitle, CardMedia} from 'material-ui';

const styles = {
  cardTitle: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
};

class MovieCardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false
    };
  }

  render() {
    const {movie} = this.props;
    const subtitle = this.state.isMouseOver ? movie.overview : null;

    return (
      <Card
        onMouseOver={() => this.setState({isMouseOver: true})}
        onMouseLeave={() => this.setState({isMouseOver: false})}
      >
        <CardTitle style={styles.cardTitle} title={movie.title} />
        <CardMedia
          overlay={
            <CardTitle
              title={movie.title} 
              subtitle={subtitle} 
            />
          }
        >
          <img src={movie.poster_path} />
        </CardMedia>
      </Card>
    );
  }
}

export default MovieCardComponent;