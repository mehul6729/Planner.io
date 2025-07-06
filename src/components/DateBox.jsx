import React from "react";

function DateBox() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("en-US", { month: "short" });
  const year = currentDate.getFullYear();
  const weekday = currentDate.toLocaleString("en-US", { weekday: "long" });

  return (
    <div className="w-full bg-[#2B2B2B] rounded-sm px-4 ">
      <div className="flex items-center justify-between text-[#A1A3AB]">
        <div className="flex items-center">
          <h1 className="text-[3rem] mr-4">{day}</h1>
          <div className="text-[1rem]">
            <p>{month}</p>
            <p>{year}</p>
          </div>
        </div>
        <div>
          <p>{weekday}</p>
        </div>
      </div>
    </div>
  );
}

export default DateBox;
