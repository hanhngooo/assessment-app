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
    reset,
  } = useMultipleSelection();
  const getFilteredItems = () =>
    items.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
  } = useCombobox({
    inputValue,
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

  // handle select channel change
  const handleChange = (e, index) => {
    const { value } = e.target;
    setSelectedChannel(value);
  };

  const placeholder =
    selectedItems.length > 0
      ? `${selectedItems.length} patterns selected`
      : "Add Text Pattern...";
  return (
    <div className="main">
      <div {...getComboboxProps()}>
        <input
          {...getInputProps(
            getDropdownProps({
              onFocus: () => {
                if (!isOpen) {
                  openMenu();
                }
              },
            }),
            {
              onChange: (e) => setInputValue(e.target.value),
            }
          )}
          type="text"
          placeholder={placeholder}
        />
        <button type="submit" onClick={handleAddSelectedItems}>
          Insert
        </button>
        {selectedItems.length > 0 ? (
          <button
            type="reset"
            onClick={() => {
              reset();
            }}
          >
            X
          </button>
        ) : null}
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(items).map((item, index) => {
            return (
              <li
                style={
                  (highlightedIndex === index
                    ? { backgroundColor: "#5bc0de" }
                    : {},
                  selectedItems.includes(item)
                    ? { backgroundColor: "#5bc0de" }
                    : { backgroundColor: "white" })
                }
                key={`${item}${index}`}
                {...getItemProps({
                  item,
                  index,
                })}
              >
                {item}
              </li>
            );
          })}
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
