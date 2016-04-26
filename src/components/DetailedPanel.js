/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { Panel, Tabs, Tab } from 'react-bootstrap';
import map from 'lodash.map';

/**
 * Internal dependencies
 */
import { DetailedTableSingle, DetailedTableAll } from '../components';

const propTypes = {
  // data: WAVE accessibility report type 2 data
  data: PropTypes.array.isRequired,
};

export default class DetailedPanel extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }

  /**
   * Renders react-bootstrap Tab component for item type
   * @param  {string} tabType - type of tab (e.g. error)
   * @param  {number} eventKey
   * @param  {string} title - tab title
   * @param  {caption} caption - caption for table, screen reader only
   * @param  {object} item - URL item object
   * @param  {number} index - index of item in array
   * @param  {object} data - items object (e.g. error items)
   * @return {component} react-bootstrap Tab component
   */
  renderTab(tabType, eventKey, title, caption, item, index, data) {
    return (
      <Tab
        tabClassName={`tab-${tabType}`}
        eventKey={eventKey}
        title={`${title} ${data.count}`}
        disabled={data.count === 0}
      >
        <DetailedTableSingle
          siteIndex={index}
          caption={`${caption} ${item.entry}`}
          data={data}
          thStyle={`th-${tabType}`}
        />
      </Tab>
    );
  }

  render() {
    return (
      <Panel aria-live="polite" header={<h2>Detailed Reports</h2>}>
        {map(this.props.data, (item, index) =>
          <Panel key={index} header={<h3><a href={`//${item.entry}`} target="_blank">{item.entry}</a></h3>}>
            {item.error === '' ?
              <Tabs id={`${item.entry}-tabs`} defaultActiveKey={1} animation={false}>
                {this.renderTab('error', 1, 'Errors:', 'Errors for', item, index, item.data.categories.error)}
                {this.renderTab('alert', 2, 'Alerts:', 'Alerts for', item, index, item.data.categories.alert)}
                {this.renderTab('feature', 3, 'Features:', 'Features for', item, index, item.data.categories.feature)}
                {this.renderTab('structure', 4, 'Structure:', 'Structure items for', item, index,
                  item.data.categories.structure
                )}
                {this.renderTab('html5', 5, 'HTML5 and ARIA:', 'HTML5 and ARIA items for', item, index,
                  item.data.categories.html5
                )}
                {this.renderTab('contrast', 6, 'Contrast:', 'Contrast items for', item, index,
                  item.data.categories.contrast
                )}
                <Tab
                  tabClassName="tab-all"
                  eventKey={7}
                  title="View All"
                >
                  <DetailedTableAll
                    siteIndex={index}
                    entry={item.entry}
                    data={item.data}
                  />
                </Tab>
              </Tabs>
              : <span className="row-err">{item.error} unable to scan {item.entry}, check that the URL is correct.
              </span>
            }
          </Panel>
        )}
      </Panel>
    );
  }
}

DetailedPanel.propTypes = propTypes;
