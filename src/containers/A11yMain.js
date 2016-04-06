import React, { Component } from 'react';
import { SummaryTable, DetailedPanel } from '../components';
import { Alert, Panel, Input, ButtonInput, Modal, Button, ProgressBar } from 'react-bootstrap';
import Async from 'async';
import map from 'lodash.map';
import { saveAs } from 'browser-filesaver';
import * as Convert from '../utils/convertData';

export default class A11yMain extends Component {
  constructor() {
    super();

    this.state = {
      scanType: 0,
      isFetching: false,
      reportData: [],
      progressed: 1,
      totalProgress: 0,
      showModal: false,
    };

    this.preventDefault = this.preventDefault.bind(this);
    this.scanURLs = this.scanURLs.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.export = this.export.bind(this);
  }

  preventDefault(event) {
    event.preventDefault();
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  export() {
    const rawData = this.state.reportData;
    const select = document.getElementById('file-type-select');
    const options = select.options;

    if (select.selectedIndex === -1) {
      alert('Please select one or more file types to export as.');
    } else {
      map(options, (option) => {
        if (option.selected) {
          switch (option.value) {
            case 'json':
              saveAs(Convert.toJSON(rawData), 'report.json');
              break;
            case 'csv':
              Convert.toCSV();
              break;
            case 'html':
              Convert.toHTML();
              break;
            case 'excel':
              Convert.toExcel();
              break;
            default:
              alert('Error: unknown file type');
          }
        }
      });

      this.setState({ showModal: false });
    }
  }

  scanURLs() {
    const scanType = Number(document.getElementById('scan-type').value);
    const apiKey = document.getElementById('api-key').value;
    const urlList = document.getElementById('url-list').value.split('\n').filter((url) =>
      url.trim() !== ''
    );
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

    if (apiKey.length !== 11) {
      alert('API key must be 11 characters long');
      return;
    }

    this.setState({ isFetching: true, totalProgress });

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
      this.setState({
        scanType,
        isFetching: false,
        reportData: results,
        totalProgress: 0,
        progressed: 1,
      });
    });
  }

  render() {
    return (
      <div className="main">
        <Alert bsStyle="info">
          This tool leverages the <a href="http://wave.webaim.org/api/" target="_blank">WAVE API</a> developed
          by <a href="http://webaim.org/" target="_blank">WebAIM</a>.
          Please visit their websites to learn more about web accessibility and to purchase API credits.
        </Alert>
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
            <div className="button-container" aria-live="polite">
              <ButtonInput value="Scan URLs" onClick={this.scanURLs} />
              {this.state.reportData.length !== 0 &&
                <ButtonInput value="Export Report" onClick={this.openModal} />
              }
              <Modal show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Export Report Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <Input
                      id="file-type-select"
                      type="select"
                      label="Select File Format(s)"
                      placeholder="file format"
                      multiple
                    >
                      <option value="json">JSON</option>
                      <option value="csv">CSV</option>
                      <option value="html">HTML</option>
                      <option value="excel">Excel Spreadsheet</option>
                    </Input>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button bsStyle="primary" onClick={this.export}>Export Data</Button>
                  <Button onClick={this.closeModal}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </form>
          {this.state.isFetching ?
            <ProgressBar
              active
              striped
              bsStyle="success"
              label="%(percent)s%"
              max={this.state.totalProgress}
              aria-valuemax={this.state.totalProgress}
              now={this.state.progressed}
              aria-valuenow={this.state.progressed}
            />
            : null
          }
        </Panel>
        {(this.state.scanType === 1 && this.state.reportData.length !== 0) &&
          <SummaryTable data={this.state.reportData} />
        }
        {(this.state.scanType === 2 && this.state.reportData.length !== 0) &&
          <DetailedPanel data={this.state.reportData} />
        }
      </div>
    );
  }
}
