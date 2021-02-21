import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCombobox, useMultipleSelection } from "downshift";
import Table from "./Table";

import { addPatterns, deletePattern, editPattern } from "../store/data/actions";
import { selectPatterns } from "../store/data/selectors";

export default function AddText() {
  const patterns = useSelector(selectPatterns);
  const dispatch = useDispatch();

  const items = [
    "Close Account",
    "Open Account",
    "Password",
    "Shut Account",
    "Sue",
    "Terminate",
    "Update Account",
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

  // add selected patterns handler, put pattern string into object
  const handleAddSelectedItems = () => {
    const selectedFullItems = selectedItems.map((item) => {
      return {
        id: Math.random(),
        textPattern: item,
        channel: "",
      };
    });
    dispatch(addPatterns(selectedFullItems));
  };

  // delete a pattern row
  const handleDeleteItem = (item) => {
    dispatch(deletePattern(item));
  };
  // set state for editIndex
  const [editIndex, setEditIndex] = useState(-1);
  const [selectedChannel, setSelectedChannel] = useState("");
  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleStopEdit = (index) => {
    setEditIndex(-1);
    //save edit
    dispatch(editPattern(selectedChannel, index));
  };
  const handleChange = (e, index) => {
    const { value } = e.target;
    setSelectedChannel(value);
  };
  return (
    <div>
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
        <button className="form-button" onClick={handleAddSelectedItems}>
          Insert
        </button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(items).map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: "#5bc0de" } : {}
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
      <Table
        patterns={patterns}
        handleDeleteItem={handleDeleteItem}
        handleEdit={handleEdit}
        editIndex={editIndex}
        handleStopEdit={handleStopEdit}
        handleChange={handleChange}
        selectedChannel={selectedChannel}
      />
    </div>
  );
}
