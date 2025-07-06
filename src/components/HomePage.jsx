import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBackground,
  clearBackground,
} from "../Redux/Slice/PlannerSlice.jsx";
import Logo from "./Logo";
import DateBox from "./DateBox";
import ListBox from "./ListBox";

function HomePage() {
  const bgImage = useSelector((state) => state.planner.bgImage);
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const openCamera = () => fileRef.current?.click();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => dispatch(setBackground(ev.target.result));
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="px-[2rem] py-[2rem] min-h-screen"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-between">
        <Logo />

        <div className="flex gap-4">
          <button onClick={openCamera} className=" text-white cursor-pointer  ">
            Set WallPaper
          </button>

          {bgImage && (
            <button
              onClick={() => dispatch(clearBackground())}
              className=" text-red-700 cursor-pointer"
            >
              ✖ Remove
            </button>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      <div className="flex flex-col justify-center sm:w-[90%] md:w-[50%] mx-auto pt-[1rem]">
        <DateBox />
        <ListBox />
      </div>
    </div>
  );
}

export default HomePage;
