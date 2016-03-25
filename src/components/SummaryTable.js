import React, { Component, PropTypes } from 'react';
import { Panel, Table } from 'react-bootstrap-15';
import map from 'lodash.map';

export default class SummaryTable extends Component {
  render() {
    return (
      <Panel collapsible defaultExpanded header={<h2>Summary Report</h2>}>
        <Table id="sum-table" fill striped bordered condensed hover responsive on>
          <caption className="sr-only">Summary results</caption>
          <thead>
            <tr>
              <th scope="col" className="no-sort">SITE URL</th>
              <th scope="col"
                data-sort-method="number"
                className="th-errors"
              >
                ERRORS
              </th>
              <th scope="col"
                data-sort-method="number"
                className="th-alerts"
              >
                ALERTS
              </th>
              <th scope="col"
                data-sort-method="number"
                className="th-features"
              >
                FEATURES
              </th>
              <th scope="col"
                data-sort-method="number"
                className="th-structure"
              >
                STRUCTURE
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
                CONTRAST
              </th>
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
