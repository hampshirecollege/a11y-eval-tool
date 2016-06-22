/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap';
import map from 'lodash.map';

/**
 * Internal dependencies
 */
import styles from './RecentResultsPanel.css';

const propTypes = {
  // recentResults: recent report results saved in localStorage
  recentResults: PropTypes.array.isRequired,
  showRecentResult: PropTypes.func.isRequired,
  removeRecentResult: PropTypes.func.isRequired,
};

/**
 * Component
 */
function RecentResultsPanel({ recentResults, showRecentResult, removeRecentResult }) {
  return (
    <Panel collapsible header="Recent results">
      <Table fill striped bordered responsive>
        <caption className="sr-only">Recent results</caption>
        <thead>
          <tr>
            <th scope="col">REPORT TIMESTAMP</th>
            <th scope="col">REPORT TYPE</th>
            <th scope="col">URL COUNT</th>
            <th scope="col" className={styles.actionsCol}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {map(recentResults, (result, index) =>
            <tr key={index}>
              <th scope="row">
                {result.timestamp}
              </th>
              <td>{result.scanType === 1 ? 'Summary' : 'Detailed'}</td>
              <td>{result.reportData.length}</td>
              <td>
                <Button
                  bsStyle="link"
                  onClick={() => showRecentResult(result.reportData, result.scanType)}
                >
                  <Glyphicon glyph="info-sign" />
                  &nbsp;View Report
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  bsStyle="link"
                  onClick={() => removeRecentResult(recentResults, index)}
                >
                  <Glyphicon glyph="remove" />
                  &nbsp;Remove Report
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Panel>
  );
}

RecentResultsPanel.propTypes = propTypes;

export default RecentResultsPanel;
