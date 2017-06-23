import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Alert extends React.Component {
  state = {
    open: false,
    text: '',
    img: '',
  };

  handleOpen = (text, img) => {
    this.setState({ img, text, open: true });
  };

  handleClose = () => {
    this.setState({ img: '', text: '', open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleClose}
        fullWidth={true}
      />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className='dialog-img-container'>
            <img src={this.state.img} className='dialog-img' />
          </div>

          <h3 className='dialog-text'>{this.state.text}</h3>
        </Dialog>
      </div>
    );
  }
}

export default Alert;
