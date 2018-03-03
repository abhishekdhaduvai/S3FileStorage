import React from 'react';
import KeyValue from '../web-components/KeyValue';
import CreateBucket from './CreateBucket';
import DisplayFiles from './DisplayFiles';
import UploadFiles from './UploadFiles';
import axios from 'axios';

class Dashboard extends React.Component {

  state = {
    user: undefined,
    bucket: false,
    loading: true,
    contents: [],
    regex: /[^a-zA-Z0-9.]/g
  }

  componentDidMount() {
    const { regex } = this.state;
    this.setState({user: this.props.userinfo});
    if(this.props.userinfo) {
      axios.post('/getBucket', {bucketName: this.props.userinfo.email.replace(regex, '')})
      .then(res => {
        this.setState({
          contents: res.data.Contents,
          bucket: this.props.userinfo.email.replace(regex, ''),
          loading: false,
        })
      })
      .catch(err => {
        this.setState({
          bucket: false,
          loading: false,
        })
      })
    }
  }

  deleteFile = (filename) => {
    this.setState({
      loading: true,
      loadingText: `Deleting ${filename}`
    });
    axios.delete(`/blob/${filename}`, {
      data: { bucket: this.state.bucket }
    }).then(res => {
      let temp = this.state.contents.filter(file => file.Key !== filename);      
      this.setState({
        loading: false,
        contents: temp,
        done: true,
        doneMessage: res.data,
      });
    })
    .catch(err => {
      this.setState({
        loading: false,
      })
    })
  }

  downloadFile = (filename) => {
    window.location = `/blob?filename=${filename}&bucket=${this.state.bucket}`
  }

  render(){
    const { user, bucket, regex, loading } = this.state;
    return (
      <div style={styles.container}>
      
        <section style={styles.heading}>
          <div>Blobstore</div>
        </section>

        {this.state.loading && 
          <div style={styles.loading}>
            <px-spinner />
          </div>
        }

        {(!bucket && !loading) && 
          <CreateBucket bucketId={this.props.userinfo.email.replace(regex, '')} />
        }

        {(bucket && !loading) && 
          <div style={{display: 'flex', flex: 1}}>
            <UploadFiles bucket={bucket}/>
            <DisplayFiles 
              contents={this.state.contents} 
              downloadFile={this.downloadFile}
              deleteFile={this.deleteFile} />
          </div>
        }

      </div> 
    )
  }
}

const styles = {
  container: {
    flex: 1,
    background: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    padding: '1em',
    background: 'rgb(17, 31, 39)',
    fontSize: '2em',
    fontWeight: 'bold',
    color: 'rgb(182, 195, 204)'
  },
  loading: {
    display: 'flex',
    position: 'fixed',
    height: '100%',
    width: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}

export default Dashboard;