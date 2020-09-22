import React from 'react';
import {connect} from 'react-redux';
import {Card, CardMedia} from 'material-ui';
import iconThumbUp from '../../../images/thumb_up.png'
import iconClose from '../../../images/close.png'
import {isMobile} from 'react-device-detect';

import Modal from 'react-awesome-modal';

const closeBtnEdgeDis = isMobile ? -2 : -10;


const styles = {
  movieObj: {
    // height: 165,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    // marginBottom: '2%'

  },
  card: {
    cursor: 'pointer',
    // height: 134,
    overflow: 'inherit',
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
    top: 8,
    borderRadius: 4
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
    bottom: 80,
    borderRadius: 3,

  },
  model: {
    // top: 200,
    // left: 200,
    // right: 200,
    // bottom: 200,
    // height: 400,
    // width: 600,
    // transform             : 'translate(-50%, -50%)',

  },
  iframe: {
    width: '100%',
    height: '100%'
  },
  closeBtn: {
    position: 'absolute',
    top: closeBtnEdgeDis,
    right: closeBtnEdgeDis,
    background: 'transparent',
    border: 'none'
  }
};

class MovieCardComponent extends React.Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the movie card
    this.state = {
      isMouseOver: false,
      isShowPopup: false
    };
  }

  // componentWillMount() {
  //   ReactModal.setAppElement('body');
  // }

  renderQualityTag = (str) => {
    if (str !== '')
      return (
        <p style={styles.textImgQuality}> {str} </p>
      )

  };

  closeModel = () => {
    console.log('closeModel(): ')
    this.setState({
      isShowPopup: false
    });
  };

  renderModel = (videoUrl) => {
    if (this.state.isShowPopup) {
      console.log('showIframe(): ' + this.state.isShowPopup);
      return (
        <Modal
          style={styles.model}
          visible={this.state.isShowPopup}
          width="400"
          height="300"
          effect="fadeInUp"
          // onClickAway={() => this.closeModel()}
        >
          <button style={styles.closeBtn}
                  onClick={this.closeModel}
          >
            <img style={{width: 16, height: 16}} src={iconClose}/>
          </button>
          <iframe
            style={styles.iframe}
            title="Modal Embed"
            className={"video"}
            src={videoUrl}
            allowFullScreen
          >
          </iframe>
          >
        </Modal>
      )
    }
  };

  render() {
    console.log('render(): ' + this.state.isShowPopup)

    const {movieObject} = this.props;
    // The CardTitle.subtitle won't render if it's null
    const title = movieObject[2].length > 28 ? movieObject[2].slice(0, 26) + '...' : movieObject[2];

    return (
      <div style={styles.movieObj}>
        {this.renderModel(movieObject[0])}

        <Card
          style={styles.card}
          onMouseOver={() => this.setState({isMouseOver: true})}
          onMouseLeave={() => this.setState({isMouseOver: false})}
          onClick={() => {
            this.setState({
              isShowPopup: true
            });
          }}
        >
          {this.renderQualityTag(movieObject[4])}
          <p style={styles.textImgDuration}> {movieObject[3]} </p>
          <img style={styles.bgImage} src={movieObject[1]}/>

        </Card>
        <div>
          <p style={{fontSize: 18, height: 37, fontWeight: 'bold'}}> {title} </p>
          <div>
            <p style={{'textAlign': 'center', fontSize: 14,}}>
              {'观看次数  ' + movieObject[5] + ' '}
              <a> <img style={{width: 20, height: 20, marginBottom: 5}} src={iconThumbUp}/> </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  () => ({}),
)(MovieCardComponent);
