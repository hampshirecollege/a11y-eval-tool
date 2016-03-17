import React, { Component, PropTypes } from 'react';
import { Panel, Table } from 'react-bootstrap';
import map from 'lodash.map';

export default class SummaryTable extends Component {
  render() {
    return (
      <Panel collapsible defaultExpanded header={<h2>Summary Report</h2>}>
        <Table id="sum-table" fill striped bordered condensed hover responsive on>
          <thead>
            <tr>
              <th scope="col" className="no-sort">Site URL</th>
              <th scope="col"
                data-sort-method="number"
                className="th-errors"
              >
                Errors
              </th>
              <th scope="col"
                data-sort-method="number"
                className="th-alerts"
              >
                Alerts
              </th>
              <th scope="col"
                data-sort-method="number"
                className="th-features"
              >
                Features
              </th>
              <th scope="col"
                data-sort-method="number"
                className="th-structure"
              >
                Structure
              </th>
              <th scope="col"
                data-sort-method="number"
                className="th-html5"
              >
                HTML5 and ARIA
              </th>
              <th scope="col"
                data-sort-method="number"
                className="th-contrast"
              >
                Contrast
              </th>
            </tr>
          </thead>
          <tbody>
            {map(this.props.data, (item) =>
              <tr key={this.props.data.indexOf(item)}>
                <td scope="row">
                  <a href={`//${item.entry}`} target="_blank">
                    {item.error &&
                      <span className="row-err">{item.error}</span>
                    }
                    {` ${item.entry}`}
                  </a>
                </td>
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
