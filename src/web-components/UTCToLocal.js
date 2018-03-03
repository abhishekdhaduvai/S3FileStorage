import React from 'react';

class UTCToLocal extends React.Component {
  render(){
    const date = new Date(this.props.dateTime);
    return (
      <div>
        {date.toLocaleString()}
      </div>
    )
  }
}

export default UTCToLocal;