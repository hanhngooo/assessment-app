import React from "react";
import { GoEye } from "react-icons/go";
import { FaPen } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

export default function Table({ patterns, selectedItems }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Text Pattern</th>
            <th>Channel</th>
            <th>View Examples</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patterns &&
            patterns.map((pattern) => (
              <tr key={pattern.id}>
                <td>{pattern.textPattern}</td>
                <td>{pattern.channel}</td>
                <td>
                  <GoEye />
                </td>
                <td>
                  <FaPen />
                  <FiTrash />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
