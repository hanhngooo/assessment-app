import { useState } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import Table from "./Table";

import { addPatterns } from "../store/data/actions";

export default function AddText() {
  const items = [
    "Close Account",
    "Open Account",
    "Password",
    "Shut Account",
    "Sue",
    "Terminate",
    "Update Account",
  ];
  const dummyTableItems = [
    {
      id: "1",
      textPattern: "Shut Account",
      channel: "Agent Channels",
    },
    {
      id: "2",
      textPattern: "Open Account",
      channel: "Caller Channels",
    },
    {
      id: "3",
      textPattern: "Closed Cart",
      channel: "Both Channels",
    },
    {
      id: "4",
      textPattern: "Update Account",
      channel: "Caller Channels",
    },
  ];
  const [inputValue, setInputValue] = useState("");
  const {
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection();
  const getFilteredItems = () =>
    items.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    inputValue,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    items: getFilteredItems(),
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          };
      }
      return changes;
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (!selectedItems.includes(selectedItem)) {
            addSelectedItem(selectedItem);
          } else {
            removeSelectedItem(selectedItem);
          }
          break;
        default:
          break;
      }
    },
  });

  return (
    <div>
      <p>input: {inputValue}</p>
      <p>selected: {selectedItems}</p>

      <div {...getComboboxProps()}>
        <input
          {...getInputProps(getDropdownProps(), {
            onChange: (e) => setInputValue(e.target.value),
          })}
          placeholder="Add Text Pattern..."
        />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          &#8595;
        </button>
        <button className="form-button">Insert</button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(items).map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                value={item}
                onChange={() => null}
              />
              <span />
              {item}
            </li>
          ))}
      </ul>
      <Table dummyTableItems={dummyTableItems} selectedItems={selectedItems} />
    </div>
  );
}
