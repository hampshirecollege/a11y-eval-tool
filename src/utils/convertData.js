/**
 * External dependencies
 */
import map from 'lodash.map';
import moment from 'moment';

/**
 * Converts summary report data to CSV format
 * @param  {array} data - summary report data
 * @return {blob} blob of converted CSV data
 */
function toCSVSummary(data) {
  let csvData = `"WAVE accessibility summary report: ${moment().format('MMMM Do YYYY, h:mma')}"\nSITE URL,ERRORS,ALERTS,FEATURES,STRUCTURE,HTML5 AND ARIA,CONTRAST\n`;

  map(data, (site) => {
    if (site.error === '') {
      csvData += `${site.entry},${site.data.categories.error.count},${site.data.categories.alert.count},${site.data.categories.feature.count},${site.data.categories.structure.count},${site.data.categories.html5.count},${site.data.categories.contrast.count}\n`;
    }
  });

  const blob = new Blob([csvData], { type: 'text/csv' });

  return blob;
}

/**
 * Converts detailed report data to CSV format
 * @param  {array} data - detailed report data
 * @return {blob} blob of converted CSV data
 */
function toCSVDetailed(data) {
  let csvData = `"WAVE accessibility summary report: ${moment().format('MMMM Do YYYY, h:mma')}"\nSITE URL,ERRORS,ALERTS,FEATURES,STRUCTURE,HTML5 AND ARIA,CONTRAST\n`;

  // TODO: refactor this...don't repeat the same snippet from up above
  map(data, (site) => {
    if (site.error === '') {
      csvData += `${site.entry},${site.data.categories.error.count},${site.data.categories.alert.count},${site.data.categories.feature.count},${site.data.categories.structure.count},${site.data.categories.html5.count},${site.data.categories.contrast.count}\n`;
    }
  });

  csvData += `\n"WAVE accessibility detailed report: ${moment().format('MMMM Do YYYY, h:mma')}"\n\n`;

  map(data, (site) => {
    if (site.error === '') {
      csvData += `URL,ITEM TYPE,ITEM ID,COUNT,DESCRIPTION\n`;
      map(site.data.categories.error.items, (item) => {
        csvData += `${site.entry},Error,${item.id},${item.count},${item.description}\n`;
      });
      map(site.data.categories.alert.items, (item) => {
        csvData += `${site.entry},Alert,${item.id},${item.count},${item.description}\n`;
      });
      map(site.data.categories.feature.items, (item) => {
        csvData += `${site.entry},Feature,${item.id},${item.count},${item.description}\n`;
      });
      map(site.data.categories.structure.items, (item) => {
        csvData += `${site.entry},Structure,${item.id},${item.count},${item.description}\n`;
      });
      map(site.data.categories.html5.items, (item) => {
        csvData += `${site.entry},HTML5 and ARIA,${item.id},${item.count},${item.description}\n`;
      });
      map(site.data.categories.contrast.items, (item) => {
        csvData += `${site.entry},Contrast,${item.id},${item.count},${item.description}\n\n`;
      });
    }
  });

  const blob = new Blob([csvData], { type: 'text/csv' });

  return blob;
}

/**
 * Converts summary report data to HTML format
 * @param  {array} data - summary report data
 * @return {blob} blob of converted HTML data
 */
function toHTMLSummary(data) {
  let htmlData = `<!doctype html>
    <html lang="en">
    <head>
    <meta http-equiv=Content-Type content="text/html">
    <meta charset="utf-8">
    <style>
      table {margin:64px auto;width: 90%}
      table, th, td {border: 1px solid #666;border-collapse: collapse}
      tr:nth-child(even) {background:#f9f9f9}
      tr:nth-child(odd) {background: white}
      tbody tr:hover {background-color:#f5f5f5}
      .th-site {}
      .th-errors {background-color:#f2dede;color:#a94442;}
      .th-alerts {background-color:#fcf8e3;color:#8a6d3b;}
      .th-features {background-color:#dff0d8;color:#3c763d;}
      .th-structure {background-color:#d9edf7;color:#31708f;}
      .th-html5 {background-color:#e8eaf8;color:#656789;}
      .th-contrast {background-color:#ffffff;color:#000000;}
    </style>
    <body>
      <table>
        <caption>WAVE accessibility summary report: ${moment().format('MMMM Do YYYY, h:mma')}</caption>
        <thead>
          <tr>
           <th class="th-site" scope="col" style="height:17.0pt;width:145pt">SITE URL</th>
           <th class="th-errors" scope="col" style="width:79pt">ERRORS</th>
           <th class="th-alerts" scope="col" style="width:79pt">ALERTS</th>
           <th class="th-features" scope="col" style="width:86pt">FEATURES</th>
           <th class="th-structure" scope="col" style="width:93pt">STRUCTURE</th>
           <th class="th-html5" scope="col" style="width:123pt">HTML5 and ARIA</th>
           <th class="th-contrast" scope="col" style="width:87pt">CONTRAST</td>
          </tr>
        </thead>
        <tbody>`;

  map(data, (site) => {
    if (site.error === '') {
      htmlData += `<tr>
        <td scope="row"><a href="http://${site.entry}" target="_blank">${site.entry}</a></td>
        <td>${site.data.categories.error.count}</td>
        <td>${site.data.categories.alert.count}</td>
        <td>${site.data.categories.feature.count}</td>
        <td>${site.data.categories.structure.count}</td>
        <td>${site.data.categories.html5.count}</td>
        <td>${site.data.categories.contrast.count}</td>
      </tr>`;
    }
  });

  htmlData += '</tbody></table>';

  const blob = new Blob([htmlData], { type: 'text/html' });

  return blob;
}

/**
 * Converts detailed report data to HTML format
 * @param  {array} data - detailed report data
 * @return {blob} blob of converted HTML data
 */
function toHTMLDetailed(data) {
  // TODO: refactor this...don't repeat the same snippet from up above
  let htmlData = `<!doctype html>
    <html lang="en">
    <head>
    <meta http-equiv=Content-Type content="text/html">
    <meta charset="utf-8">
    <style>
      table {margin:64px auto;width: 90%}
      table, th, td {border: 1px solid #666;border-collapse: collapse}
      tr.sum:nth-child(even) {background:#f9f9f9}
      tr.sum:nth-child(odd) {background: white}
      tbody tr.sum:hover, tbody tr:hover {background-color:#f5f5f5}
      .th-site {}
      .th-errors {background-color:#f2dede;color:#a94442;}
      .th-alerts {background-color:#fcf8e3;color:#8a6d3b;}
      .th-features {background-color:#dff0d8;color:#3c763d;}
      .th-structure {background-color:#d9edf7;color:#31708f;}
      .th-html5 {background-color:#e8eaf8;color:#656789;}
      .th-contrast {background-color:#ffffff;color:#000000;}
      .errors {background-color:#f2dede;color:#a94442;}
      .alerts {background-color:#fcf8e3;color:#8a6d3b;}
      .features {background-color:#dff0d8;color:#3c763d;}
      .structure {background-color:#d9edf7;color:#31708f;}
      .html5 {background-color:#e8eaf8;color:#656789;}
      .contrast {background-color:#ffffff;color:#000000;}
    </style>
    <body>
      <table>
        <caption>WAVE accessibility summary report: ${moment().format('MMMM Do YYYY, h:mma')}</caption>
        <thead>
          <tr>
           <th class="th-site" scope="col" style="height:17.0pt;width:145pt">SITE URL</th>
           <th class="th-errors" scope="col" style="width:79pt">ERRORS</th>
           <th class="th-alerts" scope="col" style="width:79pt">ALERTS</th>
           <th class="th-features" scope="col" style="width:86pt">FEATURES</th>
           <th class="th-structure" scope="col" style="width:93pt">STRUCTURE</th>
           <th class="th-html5" scope="col" style="width:123pt">HTML5 and ARIA</th>
           <th class="th-contrast" scope="col" style="width:87pt">CONTRAST</td>
          </tr>
        </thead>
        <tbody>`;

  map(data, (site) => {
    if (site.error === '') {
      htmlData += `<tr class="sum">
        <td scope="row"><a href="http://${site.entry}" target="_blank">${site.entry}</a></td>
        <td>${site.data.categories.error.count}</td>
        <td>${site.data.categories.alert.count}</td>
        <td>${site.data.categories.feature.count}</td>
        <td>${site.data.categories.structure.count}</td>
        <td>${site.data.categories.html5.count}</td>
        <td>${site.data.categories.contrast.count}</td>
      </tr>`;
    }
  });

  htmlData += '</tbody></table>\n';

  map(data, (site) => {
    if (site.error === '') {
      htmlData += `<table>
        <caption>WAVE accessibility detailed report for ${site.entry}: ${moment().format('MMMM Do YYYY, h:mma')}</caption>
        <thead>
          <tr>
           <th class="th-site" scope="col" style="height:17.0pt;width:145pt">SITE URL</th>
           <th class="th-errors" scope="col" style="width:79pt">ITEM TYPE</th>
           <th class="th-alerts" scope="col" style="width:79pt">ITEM ID</th>
           <th class="th-features" scope="col" style="width:86pt">COUNT</th>
           <th class="th-structure" scope="col" style="width:93pt">DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>`;

      map(site.data.categories.error.items, (item) => {
        htmlData += `<tr class="errors">
          <td scope="row"><a href="http://${site.entry}" target="_blank">${site.entry}</a></td>
          <td>Error</td>
          <td>${item.id}</td>
          <td>${item.count}</td>
          <td>${item.description}</td></tr>`;
      });
      map(site.data.categories.alert.items, (item) => {
        htmlData += `<tr class="alerts">
          <td scope="row"><a href="http://${site.entry}" target="_blank">${site.entry}</a></td>
          <td>Alert</td>
          <td>${item.id}</td>
          <td>${item.count}</td>
          <td>${item.description}</td></tr>`;
      });
      map(site.data.categories.feature.items, (item) => {
        htmlData += `<tr class="features">
          <td scope="row"><a href="http://${site.entry}" target="_blank">${site.entry}</a></td>
          <td>Feature</td>
          <td>${item.id}</td>
          <td>${item.count}</td>
          <td>${item.description}</td></tr>`;
      });
      map(site.data.categories.structure.items, (item) => {
        htmlData += `<tr class="structure">
          <td scope="row"><a href="http://${site.entry}" target="_blank">${site.entry}</a></td>
          <td>Structure</td>
          <td>${item.id}</td>
          <td>${item.count}</td>
          <td>${item.description}</td></tr>`;
      });
      map(site.data.categories.html5.items, (item) => {
        htmlData += `<tr class="html5">
          <td scope="row"><a href="http://${site.entry}" target="_blank">${site.entry}</a></td>
          <td>HTML5 and ARIA</td>
          <td>${item.id}</td>
          <td>${item.count}</td>
          <td>${item.description}</td></tr>`;
      });
      map(site.data.categories.contrast.items, (item) => {
        htmlData += `<tr class="contrast">
          <td scope="row"><a href="http://${site.entry}" target="_blank">${site.entry}</a></td>
          <td>Contrast</td>
          <td>${item.id}</td>
          <td>${item.count}</td>
          <td>${item.description}</td></tr>`;
      });
    }
  });

  htmlData += '</tbody></table>';

  const blob = new Blob([htmlData], { type: 'text/html' });

  return blob;
}

/**
 * Converts summary or detailed report data to JSON format
 * @param  {array} data - summary or detailed report data
 * @return {blob} blob of converted JSON data
 */
export function toJSON(data) {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

  return blob;
}

/**
 * Converts data to CSV format
 * @param  {array} data - report data
 * @param  {number} scanType - Scan type: 1 for summary or 2 for detailed
 * @return {blob} blob of converted CSV data
 */
export function toCSV(data, scanType) {
  if (scanType === 1) {
    return toCSVSummary(data);
  } else if (scanType === 2) {
    return toCSVDetailed(data);
  }

  return false;
}

/**
 * Converts data to HTML format
 * @param  {array} data - report data
 * @param  {number} scanType - Scan type: 1 for summary or 2 for detailed
 * @return {blob} blob of converted HTML data
 */
export function toHTML(data, scanType) {
  if (scanType === 1) {
    return toHTMLSummary(data);
  } else if (scanType === 2) {
    return toHTMLDetailed(data);
  }

  return false;
}
