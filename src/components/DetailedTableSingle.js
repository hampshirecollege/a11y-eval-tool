/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { Table, Panel, Glyphicon } from 'react-bootstrap';
import map from 'lodash.map';
import he from 'he';

/**
 * Internal dependencies
 */
import waveDocs from '../wave_docs/wave_docs.json';

const propTypes = {
  // siteIndex: Index of site in URL array
  siteIndex: PropTypes.number.isRequired,
  // itemType: Report item type
  itemType: PropTypes.oneOf(['ERRORS', 'ALERTS', 'FEATURES', 'STRUCTURE', 'HTML5 and ARIA', 'CONTRAST']),
  // caption: Table caption for screen readers
  caption: PropTypes.string.isRequired,
  // data: WAVE accessibility report type 2 data for specific item type
  data: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
  // thStyle: Table heading styles for font and background colors
  thStyle: PropTypes.oneOf([
    'th-errors', 'th-alerts', 'th-features', 'th-structure', 'th-html5', 'th-contrast',
  ]).isRequired,
};

function DetailedTableSingle({ itemType, caption, data, thStyle }) {
  return (
    <Table className="results-table" fill striped bordered responsive tabIndex="0">
      <caption className="sr-only">{caption}</caption>
      <thead>
        {data.count > 0 &&
          <tr>
            <th className={thStyle} scope="col">
              {itemType !== undefined ? itemType : 'ITEM'}
            </th>
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
              <Panel
                className="item-panel"
                collapsible
                defaultExpanded={false}
                header={<span><Glyphicon glyph="info-sign" /> {item.description}</span>}
              >
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
                  {map(waveDocs[item.id].data.guidelines, (guideline, index) =>
                    <li key={`${item.id}-${index}`}>
                      <a href={guideline.link} target="_blank">{guideline.name}</a>
                    </li>
                  )}
                </ul>
              </Panel>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

DetailedTableSingle.propTypes = propTypes;

export default DetailedTableSingle;
