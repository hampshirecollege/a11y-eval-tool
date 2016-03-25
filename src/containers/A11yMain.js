import React, { Component } from 'react';
import { SummaryTable, DetailedPanel } from '../components';
import { Panel, Input, ButtonInput, ProgressBar } from 'react-bootstrap-15';
import Async from 'async';

export default class A11yMain extends Component {
  constructor() {
    super();

    this.state = {
      isFetching: false,
      summaryData: [],
      detailedData: [],
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
    const scanType = Number(document.getElementById('scan-type').value);
    const apiKey = document.getElementById('api-key').value;
    const urlList = document.getElementById('url-list').value.split('\n');
    const totalProgress = urlList.length * 2;
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

    this.setState({ isFetching: true, totalProgress });

    if (scanType === 1) {
      this.setState({ summaryData: [] });
    } else if (scanType === 2) {
      this.setState({ detailedData: [] });
    }

    Async.map(urlList, (urlEntry, callback) => {
      let entry = urlEntry;

      entry = entry.trim().replace(/.*?:\/\//g, '');

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
      if (scanType === 1) {
        this.setState({
          isFetching: false,
          summaryData: results,
          totalProgress: 0,
          progressed: 1,
        });
      } else if (scanType === 2) {
        this.setState({
          isFetching: false,
          detailedData: results,
          totalProgress: 0,
          progressed: 1,
        });
      }
    });
  }

  render() {
    return (
      <div className="main">
        <Panel header={<h2>Scan Info.</h2>}>
          <form onSubmit={this.preventDefault}>
            <div className="options-key-container">
              <Input
                type="select"
                className="type-select"
                label="Scan Type"
                id="scan-type"
                defaultValue="1"
              >
                <optgroup label="Scan Type">
                  <option value="1">Summary (1 credit)</option>
                  <option value="2">Detailed (2 credits)</option>
                </optgroup>
              </Input>
              <Input
                className="key-text"
                type="text"
                label="WAVE API Key"
                id="api-key"
                placeholder="Enter WAVE API key"
              />
            </div>
            <Input
              type="textarea"
              spellCheck="false"
              label="URL List"
              id="url-list"
              placeholder="Enter a carriage return separated URL list to scan.
              The protocol (http or https) is not necessary and will be stripped from the results."
            />
            <ButtonInput value="Scan URLs" onClick={this.scanURLs} />
          </form>
          {this.state.isFetching ?
            <ProgressBar
              active
              striped
              bsStyle="success"
              label="%(percent)s%"
              max={this.state.totalProgress}
              now={this.state.progressed}
            />
            : null
          }
        </Panel>
        {this.state.summaryData.length !== 0 &&
          <SummaryTable data={this.state.summaryData} />
        }
        {this.state.detailedData.length !== 0 &&
          <DetailedPanel data={this.state.detailedData} />
        }
      </div>
    );
  }
}
