import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class UploadFiles extends React.Component {

  state = {
    loading: false,
    loadingText: '',
    error: false,
    errorMessage: '',
    input: undefined,
  }

  uploadFile = (data) => {

    for(let i=0; i<data.length; i++) {
      this.setState({
        loading: true,
        loadingText: `Uploading ${data[i].name}`
      })

      const formData = new FormData();
      formData.append('file', data[i], data[i].name);
      formData.append('bucket', this.props.bucket)

      axios.post('/blob', formData)
      .then(res => {
        location.reload();
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: true,
          errorMessage: err.response.data
        });
      });
    }
  }

  render() {
    return (
      <section style={styles.container}>

        {this.state.loading && 
          <div style={styles.loading}>
            <div style={{textAlign: 'center'}}>
              <px-spinner />
              <p>{this.state.loadingText}</p>
            </div>
          </div>
        }

        {this.state.error && 
          <px-alert-message
            visible
            type='important'
            action='acknowledge'
            message-title='Error!'
            message={this.state.errorMessage}
            auto-dismiss='0'>
          </px-alert-message>
        }

        <h2 style={{marginTop: 0, color: '#424242'}}>Upload Files</h2>

        <input 
          multiple
          type='file'
          onChange={e => this.setState({input: e.target.files})}></input>

        <RaisedButton 
          style={{marginTop: '1em'}}
          label="Upload" 
          primary={true}
          onClick = {e => this.uploadFile(this.state.input)} />

        <p style={{color: '#424242'}}>
          <strong>Note:</strong> Uploading a file of the same name will replace the existing file.
        </p>

      </section>
    )
  }
}

const styles = {
  container: {
    padding: '2em',
    background: 'inherit',
    maxWidth: '15em',
    borderRight: '1px solid #e0e0e0',
  },
  loading: {
    background: 'white',
    opacity: 0.8,
    display: 'flex',
    position: 'fixed',
    top:0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}


export default UploadFiles;