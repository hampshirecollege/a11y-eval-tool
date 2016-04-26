/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */
import { DetailedTableSingle } from '../components';

const propTypes = {
  // siteIndex: Index of site in URL array
  siteIndex: PropTypes.number.isRequired,
  // entry: URL of the site scanned
  entry: PropTypes.string.isRequired,
  // data: WAVE accessibility report type 2 data for entry
  data: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
};

/**
 * Component
 */
function DetailedTableAll({ siteIndex, entry, data }) {
  return (
    <div className="table-all">
      <DetailedTableSingle
        siteIndex={`all-${siteIndex}`}
        itemType="ERRORS"
        caption={`Errors for ${entry}`}
        data={data.categories.error}
        thStyle="th-errors"
      />
      <DetailedTableSingle
        siteIndex={`all-${siteIndex}`}
        itemType="ALERTS"
        caption={`Alerts for ${entry}`}
        data={data.categories.alert}
        thStyle="th-alerts"
      />
      <DetailedTableSingle
        siteIndex={`all-${siteIndex}`}
        itemType="FEATURES"
        caption={`Features for ${entry}`}
        data={data.categories.feature}
        thStyle="th-features"
      />
      <DetailedTableSingle
        siteIndex={`all-${siteIndex}`}
        itemType="STRUCTURE"
        caption={`Structure items for ${entry}`}
        data={data.categories.structure}
        thStyle="th-structure"
      />
      <DetailedTableSingle
        siteIndex={`all-${siteIndex}`}
        itemType="HTML5 and ARIA"
        caption={`HTML5 and ARIA items for ${entry}`}
        data={data.categories.html5}
        thStyle="th-html5"
      />
      <DetailedTableSingle
        siteIndex={`all-${siteIndex}`}
        itemType="CONTRAST"
        caption={`Contrast items for ${entry}`}
        data={data.categories.contrast}
        thStyle="th-contrast"
      />
    </div>
  );
}

DetailedTableAll.propTypes = propTypes;

export default DetailedTableAll;
