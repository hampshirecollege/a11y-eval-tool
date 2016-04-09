import map from 'lodash.map';
import moment from 'moment';

export function toJSON(data) {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

  return blob;
}

export function toCSV(data) {
  let csvData = `"WAVE accessibility summary report: ${moment().format('MMMM Do YYYY, h:mma')}"\nSITE URL,ERRORS,ALERTS,FEATURES,STRUCTURE,HTML5 AND ARIA,CONTRAST\n`;

  map(data, (site) => {
    if (site.error === '') {
      csvData += `${site.entry},${site.data.categories.error.count},${site.data.categories.alert.count},${site.data.categories.feature.count},${site.data.categories.structure.count},${site.data.categories.html5.count},${site.data.categories.contrast.count}\n`;
    }
  });

  const blob = new Blob([csvData], { type: 'text/csv' });

  return blob;
}

export function toHTML(data) {
  let htmlData = `<!doctype html>
    <html lang="en">
    <head>
    <meta http-equiv=Content-Type content="text/html">
    <meta charset="utf-8">
    <style>
      table {margin:64px}
      table, th, td {border: 1px solid #ddd;border-collapse: collapse}
      tr:nth-child(even) {background:#f9f9f9}
      tr:nth-child(odd) {background: white}
      tbody tr:hover {background-color:#f5f5f5}
      .th-site {}
      .th-errors {background-color:#f2dede;color:#a94442;}
      .th-alerts {background-color:#fcf8e3;color:#8a6d3b;}
      .th-features {background-color:#dff0d8;color:#3c763d;}
      .th-structure {background-color:#d9edf7;color:#31708f;}
      .th-html5 {background-color:#e8eaf8;color:#656789;}
      .th-contrast {background-color:#666666;color:#ffffff;}
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
        <td><a href="http://${site.entry}" target="_blank">${site.entry}</a></td>
        <td>${site.data.categories.error.count}</td>
        <td>${site.data.categories.alert.count}</td>
        <td>${site.data.categories.feature.count}</td>
        <td>${site.data.categories.structure.count}</td>
        <td>${site.data.categories.html5.count}</td>
        <td>${site.data.categories.contrast.count}</td>
      </tr>\n`;
    }
  });

  htmlData += '</tbody></table>';

  const blob = new Blob([htmlData], { type: 'text/html' });

  return blob;
}
