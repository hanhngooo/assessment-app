import React, { useState } from "react";
import { GoEye } from "react-icons/go";
import { FaPen } from "react-icons/fa";
import { FiTrash, FiCheck } from "react-icons/fi";

const row = (
  pattern,
  index,
  handleDeleteItem,
  handleEdit,
  editIndex,
  handleStopEdit,
  handleChange,
  selectedChannel
) => {
  const currentEditRow = editIndex === index;
  return (
    <tr key={index}>
      <td>{pattern.textPattern}</td>
      <td>
        {currentEditRow ? (
          <select value={selectedChannel} onChange={handleChange}>
            <option value="Agent Channels">Agent Channels</option>
            <option value="Caller Channels">Caller Channels</option>
            <option value="Both Channels">Both Channels</option>
          </select>
        ) : (
          pattern.channel
        )}
      </td>
      <td>
        <GoEye />
      </td>
      <td>
        {currentEditRow ? (
          <FiCheck onClick={() => handleStopEdit(index)} />
        ) : (
          <FaPen onClick={() => handleEdit(index)} />
        )}

        <FiTrash onClick={() => handleDeleteItem(pattern.id)} />
      </td>
    </tr>
  );
};

export default function Table({
  patterns,
  handleDeleteItem,
  handleEdit,
  editIndex,
  handleStopEdit,
  handleChange,
  selectedChannel,
}) {
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
            patterns.map((pattern, index) =>
              row(
                pattern,
                index,
                handleDeleteItem,
                handleEdit,
                editIndex,
                handleStopEdit,
                handleChange,
                selectedChannel
              )
            )}
        </tbody>
      </table>
    </div>
  );
}
