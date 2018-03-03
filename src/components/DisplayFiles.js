import React from 'react';
import UTCToLocal from '../web-components/UTCToLocal';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class DisplayFiles extends React.Component {

  state = {
    loading: false,
    loadingText: '',
    error: false,
    errorMessage: ''
  }

  render() {
    return (
      <section style={styles.list}>

        {this.state.loading && 
          <div style={styles.loading}>
            <div style={{textAlign: 'center'}}>
              <px-spinner />
              <p>{this.state.loadingText}</p>
            </div>
          </div>
        }

        <h2 style={{marginTop: 0, color: '#424242'}}>Uploaded Files</h2>
        {
          this.props.contents && (
            <Table
              selectable={false}>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>File Name</TableHeaderColumn>
                  <TableHeaderColumn>Last Modified</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}>
                {this.props.contents.map(file => (
                  <TableRow key={file.Key}>
                    <TableRowColumn>
                      <a 
                        href='javascript:void(0)' 
                        onClick={e => this.props.downloadFile(file.Key)}>
                        {file.Key}
                      </a>
                    </TableRowColumn>
                    <TableRowColumn>
                      <a>
                        <UTCToLocal dateTime={file.LastModified} />
                      </a>
                    </TableRowColumn>
                    <TableRowColumn>
                      <a href='javascript:void(0)' onClick={e => this.props.deleteFile(file.Key)}>Delete</a>
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        }
      </section>
    )
  }
}

const styles = {
  list: {
    padding: '2em',
    background: 'inherit',
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

export default DisplayFiles;