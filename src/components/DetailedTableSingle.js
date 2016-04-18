import React, { PropTypes } from 'react';
import { Table, Button, OverlayTrigger, Popover, Glyphicon } from 'react-bootstrap';
import map from 'lodash.map';
import he from 'he';
import waveDocs from '../wave_docs/wave_docs.json';

const DetailedTableSingle = ({ itemType, idIndex, caption, data, thStyle }) => (
  <Table className="results-table" fill striped bordered condensed hover responsive tabIndex="0">
    <caption className="sr-only">{caption}</caption>
    <thead>
      {data.count > 0 &&
        <tr>
          <th className={thStyle} scope="col">{itemType !== undefined ? itemType : 'ITEM'}</th>
          <th className={thStyle} scope="col">COUNT</th>
          <th className={thStyle} scope="col">DESCRIPTION</th>
        </tr>
      }
    </thead>
    <tbody>
      {map(data.items, (item) =>
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.count}</td>
          <td>
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="right"
              overlay={
                <Popover title={waveDocs[item.id].data.title}>
                  <p><strong>What It Means</strong></p>
                  <p>{he.decode(`${waveDocs[item.id].data.summary}`)}</p>
                  <p><strong>Why It Matters</strong></p>
                  <p>{he.decode(`${waveDocs[item.id].data.purpose}`)}</p>
                  <p><strong>How to Fix It</strong></p>
                  <p>{he.decode(`${waveDocs[item.id].data.actions}`)}</p>
                  <p><strong>The Algorithm... in English</strong></p>
                  <p>{he.decode(`${waveDocs[item.id].data.details}`)}</p>
                  <p><strong>Standards and Guidelines</strong></p>
                  <ul>
                    {map(waveDocs[item.id].data.guidelines, (guideline) =>
                      <li key={`${item.id}`}><a href={guideline.link} target="_blank">{guideline.name}</a></li>
                    )}
                  </ul>
                </Popover>
              }
            >
              <a className="guideline-link">
                <Glyphicon glyph="info-sign" /> {item.description}
              </a>
            </OverlayTrigger>
          </td>
        </tr>
      )}
    </tbody>
  </Table>
);

DetailedTableSingle.propTypes = {
  itemType: PropTypes.string,
  idIndex: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  caption: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
  thStyle: PropTypes.string.isRequired,
};

export default DetailedTableSingle;
