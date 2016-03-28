import React, { PropTypes } from 'react';
import { Panel, Table } from 'react-bootstrap';
import map from 'lodash.map';

const DetailedSubPanel = ({ style, id, header, caption, data }) => (
  <Panel bsStyle={style} id={id} header={header}>
    <Table fill striped bordered condensed hover responsive className="results-table">
      <caption className="sr-only">{caption}</caption>
      <thead>
        {data.count > 0 &&
          <tr>
            <th scope="col">ITEM</th>
            <th scope="col">COUNT</th>
            <th scope="col">DESCRIPTION</th>
          </tr>
        }
      </thead>
      <tbody>
        {map(data.items, (item) =>
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
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
  caption: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
};

export default DetailedSubPanel;
