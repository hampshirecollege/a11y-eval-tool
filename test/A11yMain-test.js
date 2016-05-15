/**
 * External dependencies
 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import A11yMain from '../src/containers/A11yMain.jsx';
import { ScanForm, SummaryTable, DetailedPanel } from '../src/components';

describe('<A11yMain />', () => {
  it('renders <ScanForm />', () => {
    const wrapper = shallow(<A11yMain />);

    expect(wrapper.find(ScanForm)).to.have.length(1);
  });

  it('report type 1: does not render <SummaryTable /> if there is no report data', () => {
    const wrapper = shallow(<A11yMain />);

    wrapper.setState({
      scanType: 1,
      reportData: [],
    });

    expect(wrapper.find(SummaryTable)).to.have.length(0);
  });

  it('report type 1: renders <SummaryTable /> if there is report data', () => {
    const wrapper = shallow(<A11yMain />);

    wrapper.setState({
      scanType: 1,
      reportData: ['1', '2', '3'],
    });

    expect(wrapper.find(SummaryTable)).to.have.length(1);
  });
  
    it('report type 2: does not render <DetailedPanel /> if there is no report data', () => {
      const wrapper = shallow(<A11yMain />);

      wrapper.setState({
        scanType: 2,
        reportData: [],
      });

      expect(wrapper.find(DetailedPanel)).to.have.length(0);
    });

    it('report type 2: renders <DetailedPanel /> if there is report data', () => {
      const wrapper = shallow(<A11yMain />);

      wrapper.setState({
        scanType: 2,
        reportData: ['1', '2', '3'],
      });

      expect(wrapper.find(DetailedPanel)).to.have.length(1);
    });
});
