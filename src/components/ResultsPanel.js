import React, { PropTypes } from 'react';
import { SummaryTable, DetailedPanel } from '../components';

const ResultsPanel = ({ scanType, data }) => {
  let resultsList;

  if (scanType === '1') {
    resultsList = <SummaryTable data={data} />;
  } else if (scanType === '2') {
    resultsList = <DetailedPanel data={data} />;
  }

  return (
    <div>
      {resultsList}
    </div>
  );
};

ResultsPanel.propTypes = {
  scanType: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default ResultsPanel;
