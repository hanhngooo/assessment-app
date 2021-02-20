import React from "react";
import { GoEye } from "react-icons/go";
import { FaPen } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

export default function Table({ patterns, handleDeleteItem }) {
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
            patterns.map((pattern, index) => (
              <tr key={index}>
                <td>{pattern.textPattern}</td>
                <td>{pattern.channel}</td>
                <td>
                  <GoEye />
                </td>
                <td>
                  <FaPen />
                  <button onClick={() => handleDeleteItem(pattern)}>
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
