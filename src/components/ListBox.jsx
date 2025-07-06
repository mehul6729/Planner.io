import React, { useEffect, useRef } from "react";
import DeleteIcon from "./../assets/Icons/DeleteIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  editItem,
  toggleComplete,
} from "../Redux/Slice/PlannerSlice.jsx";

function ListBox() {
  const todoList = useSelector((state) => state.planner.todoList);
  const dispatch = useDispatch();

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const addEmptyItem = () => {
    dispatch(addItem("Add New Task"));
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const deleteItem = (idx) => dispatch(removeItem(idx));
  const handleChange = (e, idx) =>
    dispatch(editItem({ index: idx, value: e.target.value }));
  const handleToggle = (idx) => dispatch(toggleComplete(idx));

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full bg-[#2B2B2B] rounded-sm px-4 max-h-[50vh] min-h-[50vh] overflow-y-scroll mt-8 py-2 no-scrollbar"
      >
        {todoList.map((item, index) => (
          <div
            key={item.id}
            className={` ${
              item.completed ? "bg-[rgba(5,163,1,0.5)]" : "bg-[#656565]"
            } flex items-center gap-4 justify-between w-full my-4 p-4 rounded-sm`}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(index)}
            />
            <input
              value={item.text}
              className={`w-full outline-none text-white ${
                item.completed ? "line-through" : ""
              }`}
              type="text"
              onChange={(e) => handleChange(e, index)}
            />
            <img
              src={DeleteIcon}
              alt="delete"
              className="cursor-pointer"
              onClick={() => deleteItem(index)}
            />
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div className="flex items-center justify-end">
        {" "}
        <div
          className="flex justify-center items-center w-12 h-12 rounded-full bg-[#656565] cursor-pointer mt-2 text-white"
          onClick={addEmptyItem}
        >
          <span>Add</span>
        </div>
      </div>
    </div>
  );
}

export default ListBox;
