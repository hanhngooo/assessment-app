import React from "react";

export default function Table({ dummyTableItems, selectedItems }) {
  return (
    <div>
      <table classNam="table">
        <thead>
          <tr>
            <th>Text Pattern</th>
            <th>Channel</th>
            <th>View Examples</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
