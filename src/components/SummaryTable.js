import React, { Component, PropTypes } from 'react';
import { Panel, Table } from 'react-bootstrap';
import map from 'lodash.map';

export default class SummaryTable extends Component {
  render() {
    return (
      <Panel aria-live="polite" header={<h2>Summary Report</h2>}>
        <Table id="sum-table" fill striped bordered condensed hover responsive on>
          <caption className="sr-only">Summary results</caption>
          <thead>
            <tr>
              <th scope="col">SITE URL</th>
              <th className="th-errors" scope="col">ERRORS</th>
              <th className="th-alerts" scope="col">ALERTS</th>
              <th className="th-features" scope="col">FEATURES</th>
              <th className="th-structure" scope="col">STRUCTURE</th>
              <th className="th-html5" scope="col">HTML5 and ARIA</th>
              <th className="th-contrast" scope="col">CONTRAST</th>
            </tr>
          </thead>
          <tbody>
            {map(this.props.data, (item) =>
              <tr key={this.props.data.indexOf(item)}>
                <th scope="row">
                  <a href={`//${item.entry}`} target="_blank">
                    {item.error &&
                      <span className="row-err">{item.error}</span>
                    }
                    {` ${item.entry}`}
                  </a>
                </th>
                <td>{item.data.categories.error.count}</td>
                <td>{item.data.categories.alert.count}</td>
                <td>{item.data.categories.feature.count}</td>
                <td>{item.data.categories.structure.count}</td>
                <td>{item.data.categories.html5.count}</td>
                <td>{item.data.categories.contrast.count}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

SummaryTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SummaryTable;
