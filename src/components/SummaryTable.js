import React, { PropTypes } from 'react';
import { Panel, Table } from 'react-bootstrap';
import map from 'lodash.map';

const SummaryTable = ({ data }) => (
  <Panel header={<h2>Scan Results</h2>}>
    <Table fill striped bordered condensed hover responsive>
      <thead>
        <tr>
          <th scope="col">Site URL</th>
          <th scope="col" className="th-errors">Errors</th>
          <th scope="col" className="th-alerts">Alerts</th>
          <th scope="col" className="th-features">Features</th>
          <th scope="col" className="th-structure">Structure</th>
          <th scope="col" className="th-html5">HTML5 and ARIA</th>
          <th scope="col" className="th-contrast">Contrast</th>
        </tr>
      </thead>
      <tbody>
        {map(data, (item) =>
          <tr key={data.indexOf(item)}>
            <td>
              <a href={`//${item.entry}`} target="_blank">
                <span className="row-err">{item.error}</span> {` ${item.entry}`}
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

SummaryTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SummaryTable;
