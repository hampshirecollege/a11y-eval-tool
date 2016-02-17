import React, { PropTypes } from 'react';
import { Panel, Table } from 'react-bootstrap';
import map from 'lodash.map';

const DetailedSubPanel = ({ style, id, header, data }) => (
  <Panel bsStyle={style} id={id} header={header}>
    <Table fill striped bordered condensed hover responsive className="results-table">
      <thead>
        {data.count > 0 &&
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Count</th>
            <th scope="col">Description</th>
          </tr>
        }
      </thead>
      <tbody>
        {map(data.items, (item) =>
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.count}</td>
            <td>{item.description}</td>
          </tr>
        )}
      </tbody>
    </Table>
  </Panel>
);

DetailedSubPanel.propTypes = {
  style: PropTypes.string,
  id: PropTypes.string,
  header: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
};

export default DetailedSubPanel;
