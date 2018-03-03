import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class CreateBucket extends React.Component{

  state = {
    loading: false
  }

  createBucket = (e) => {

    this.setState({loading: true});

    axios.post('/bucket', {bucketName: this.props.bucketId}, {})
    .then(res => {
      this.setState({loading: false});
      window.location.reload();
    })
    .catch(res => {
      this.setState({loading: false});
    });
  }

  render() {
    return (
      
      <Card style={styles.card}>        
        <CardText>
          {this.state.loading && 
            <div style={styles.loading}>
              <px-spinner />
            </div>
          }

          {!this.state.loading && 
            <div>
              <h1 style={styles.heading}>Welcome to Blobstore!!</h1>
              <p>Looks like there are no buckets associated with your account.</p>
              <p>Let's create one.</p>
              <RaisedButton 
                label="Create Bucket" 
                primary={true}
                onClick={this.createBucket}/>
            </div>
          }
        </CardText>
      </Card>
    );
  }
} 

const styles = {
  card: {
    margin: '1em auto',
    minWidth: '50%',
    maxWidth: '50em',
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: '3em',
  },
  loading: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}

export default CreateBucket;