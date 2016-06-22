/**
 * External dependencies
 */
import React, { Component } from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Panel from 'react-bootstrap/lib/Panel';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import asyncMap from 'async.map';
import { saveAs } from 'browser-filesaver';
import moment from 'moment';

/**
 * Internal dependencies
 */
import { ScanForm, SummaryTable, DetailedPanel, RecentResultsPanel } from '../components';
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
      recentResults: [],
    };

    this.preventDefault = this.preventDefault.bind(this);
    this.scanURLs = this.scanURLs.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.exportReport = this.exportReport.bind(this);
    this.showRecentResult = this.showRecentResult.bind(this);
    this.removeRecentResult = this.removeRecentResult.bind(this);
  }

  componentWillMount() {
    const recentResults = JSON.parse(window.localStorage.getItem('recentResults'));

    if (recentResults) {
      this.setState({ recentResults });
    }
  }

  /**
   * Loops through URL list and fetches WAVE report data for each URL
   */
  scanURLs() {
    const scanType = Number(document.getElementById('scan-type').value);
    const apiKey = document.getElementById('api-key').value;
    const urlList = document.getElementById('url-list').value
      .split('\n')
      .filter((url) => url.trim() !== '');
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
    const timestamp = moment().format('MMMM Do YYYY, h:mma');
    let progressed = 1;

    if (apiKey.length < 1) {
      alert('API key is required.');
      return;
    }

    this.setState({ isFetching: true, reportData: [], totalProgress });

    asyncMap(urlList, (urlEntry, callback) => {
      let entry = urlEntry;

      entry = entry.replace(/.*?:\/\//g, '').trim();

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
        }).catch((err) => { // unsuccessful JSON response
          console.error(err);
          callback(null, { entry, error: 'Error:', data: errorData });
        });
    }, (err, results) => {
      const recentResults = this.state.recentResults;
      recentResults.push({
        timestamp,
        scanType,
        reportData: results,
      });
      window.localStorage.setItem('recentResults', JSON.stringify(recentResults));
      this.setState({
        scanType,
        isFetching: false,
        reportData: results,
        totalProgress: 0,
        progressed: 1,
        recentResults,
      });
    });
  }

  /**
   * Converts raw data to file types selected and saves files
   */
  exportReport() {
    const rawData = this.state.reportData;
    const scanType = this.state.scanType;
    const select = document.getElementById('file-type-select');
    const fileName = document.getElementById('filename').value;

    if (select.selectedIndex === -1) {
      alert('Please select one or more file types to export as.');
    } else {
      switch (select.value) {
        case 'json':
          saveAs(Convert.toJSON(rawData), `${fileName}.json`);
          break;
        case 'csv':
          saveAs(Convert.toCSV(rawData, scanType), `${fileName}.csv`);
          break;
        case 'html':
          saveAs(Convert.toHTML(rawData, scanType), `${fileName}.html`);
          break;
        default:
          alert('Error: unknown file type');
      }
    }

    this.setState({ showModal: false });
  }

  showRecentResult(resultData, scanType) {
    this.setState({
      scanType,
      isFetching: false,
      reportData: resultData,
      totalProgress: 0,
      progressed: 1,
    });
  }

  removeRecentResult(recentResults, index) {
    recentResults.splice(index, 1);
    this.setState({
      scanType: 0,
      isFetching: false,
      reportData: [],
      recentResults,
    });
    window.localStorage.setItem('recentResults', JSON.stringify(recentResults));
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

  render() {
    return (
      <div className="main">
        <Alert bsStyle="info">
          This tool leverages the
          &nbsp;<a href="http://wave.webaim.org/api/" target="_blank">
          WAVE API</a> developed by
          &nbsp;<a href="http://webaim.org/" target="_blank">WebAIM</a>.
          Please visit their websites to learn more about web accessibility
          and to purchase API credits.
        </Alert>
        {this.state.recentResults.length > 0 &&
          <RecentResultsPanel
            recentResults={this.state.recentResults}
            showRecentResult={this.showRecentResult}
            removeRecentResult={this.removeRecentResult}
          />
        }
        <Panel header={<h2>Scan Info.</h2>}>
          <ScanForm
            dataLength={this.state.reportData.length}
            preventDefault={this.preventDefault}
            scanURLs={this.scanURLs}
            exportReport={this.exportReport}
            showModal={this.state.showModal}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
          {this.state.isFetching ?
            <ProgressBar
              active
              striped
              bsStyle="success"
              label="Scan in progress..."
              srOnly
              max={this.state.totalProgress}
              now={this.state.progressed}
            />
            : null
          }
        </Panel>
        {(this.state.scanType === 1 && this.state.reportData.length !== 0) &&
          <SummaryTable data={this.state.reportData} />
        }
        {(this.state.scanType === 2 && this.state.reportData.length !== 0) &&
          <div>
            <SummaryTable data={this.state.reportData} />
            <DetailedPanel data={this.state.reportData} />
          </div>
        }
      </div>
    );
  }
}
