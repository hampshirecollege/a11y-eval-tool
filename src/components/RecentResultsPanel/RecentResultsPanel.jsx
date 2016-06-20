/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { Panel, Table } from 'react-bootstrap';
import map from 'lodash.map';

/**
 * Internal dependencies
 */

const propTypes = {
  // recentResults: recent report results saved in localStorage
  recentResults: PropTypes.array.isRequired,
};

/**
 * Component
 */
function RecentResultsPanel({ recentResults }) {
  return (
    <div>
      <Panel collapsible header="Recent results">
        <Table fill striped bordered hover responsive>
          <caption className="sr-only">Recent results</caption>
          <thead>
            <tr>
              <th scope="col">REPORT TIMESTAMP</th>
              <th scope="col">REPORT TYPE</th>
              <th scope="col">URL COUNT</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {map(recentResults, (result, index) =>
              <tr key={index}>
                <th scope="row">
                  {result.timestamp}
                </th>
                <td>{result.scanType}</td>
                <td>count</td>
                <td>button</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Panel>
    </div>
  );
}

RecentResultsPanel.propTypes = propTypes;

export default RecentResultsPanel;
