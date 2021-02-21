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
        ) : pattern.channel ? (
          pattern.channel
        ) : (
          <div>Click edit to add</div>
        )}
      </td>
      <td>
        <GoEye color="#5bc0de" className="icon" />
      </td>
      <td>
        {currentEditRow ? (
          <FiCheck
            color="green"
            className="icon"
            onClick={() => handleStopEdit(index)}
          />
        ) : (
          <FaPen
            color="#5bc0de"
            className="icon"
            onClick={() => handleEdit(index)}
          />
        )}

        <FiTrash
          color="red"
          style={{ marginLeft: "0.8rem" }}
          className="icon"
          onClick={() => handleDeleteItem(pattern.id)}
        />
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
  );
}
