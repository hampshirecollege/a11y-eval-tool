import React, { Component } from 'react';
import { ResultsPanel } from '../components';
import { Panel, Input, ButtonInput, ProgressBar } from 'react-bootstrap';
import Async from 'async';

export default class A11yMain extends Component {
  constructor() {
    super();

    this.state = {
      scanType: '',
      isFetching: false,
      scanData: [],
      progressed: 1,
      totalProgress: 0,
    };

    this.preventDefault = this.preventDefault.bind(this);
    this.scanURLs = this.scanURLs.bind(this);
  }

  preventDefault(event) {
    event.preventDefault();
  }

  scanURLs() {
    const scanType = document.getElementById('scan-type').value;
    const apiKey = document.getElementById('api-key').value;
    const urlList = document.getElementById('url-list').value.split('\n');
    const totalProgress = urlList.length * 2 - 0.8;
    const errorData = {
      categories: {
        error: { count: 'n/a' },
        alert: { count: 'n/a' },
        contrast: { count: 'n/a' },
        feature: { count: 'n/a' },
        structure: { count: 'n/a' },
        html5: { count: 'n/a' },
      },
    };
    let progressed = 1;

    this.setState({ scanType: '', isFetching: true, scanData: [], totalProgress });

    Async.map(urlList, (urlEntry, callback) => {
      let entry = urlEntry;

      entry = entry.trim();

      fetch(`//wave.webaim.org/api/request?key=${apiKey}&url=${entry}&reporttype=${scanType}`)
        .then((response) => {
          this.setState({ progressed: progressed++ });
          return response.json();
        }).then((data) => {
          this.setState({ progressed: progressed++ });
          if (data.categories) { // successful WAVE scan
            callback(null, { entry, error: '', data });
          } else { // successful JSON response, but not from WAVE scan
            callback(null, { entry, error: 'Error:', data: errorData });
          }
        }).catch(() => { // unsuccessful JSON response
          callback(null, { entry, error: 'Error:', data: errorData });
        });
    }, (err, results) => {
      this.setState({
        scanType,
        isFetching: false,
        scanData: results,
        totalProgress: 0,
        progressed: 1,
      });
    });
  }

  render() {
    return (
      <div className="main">
        <Panel collapsible defaultExpanded header={<h2>Scan Info.</h2>}>
          <form onSubmit={this.preventDefault}>
            <Input type="select" label="Scan Type" id="scan-type" defaultValue="1">
              <optgroup label="Scan Type">
                <option value="1">Summary</option>
                <option value="2">Detailed</option>
              </optgroup>
            </Input>
            <Input
              type="text"
              label="WAVE API Key"
              id="api-key"
              placeholder="Enter WAVE API key"
            />
            <Input
              type="textarea"
              label="URL List"
              id="url-list"
              placeholder="Enter a carriage return separated URL list to scan"
            />
            <ButtonInput value="Scan URLs" onClick={this.scanURLs} />
          </form>
          {this.state.isFetching ?
            <ProgressBar
              active
              striped
              bsStyle="success"
              max={this.state.totalProgress}
              now={this.state.progressed}
            />
            : null
          }
        </Panel>
        <ResultsPanel data={this.state.scanData} scanType={this.state.scanType} />
      </div>
    );
  }
}
