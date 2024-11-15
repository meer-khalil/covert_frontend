import React from "react";
import { useState } from "react";

import { Divider } from "@mui/material";

// Icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckboxGroup from "./CheckboxGroup";

const check = ["Filter by stat", "Filter by hometype"];

const FilterItem = ({ item, setFilter }) => {
  const [expand, setShowExpand] = useState(item.expand);

  const handleClick = () => {
    setShowExpand((expand) => !expand);
  };

  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;

    if (type === "checkbox") {
      setFilter((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "radio") {
      setFilter((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="mt-4">
      {!check.includes(item.title) && (
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => handleClick(setShowExpand)}
        >
          <p className=" tracking-[2px] font-semibold text-lg">
            {!check.includes(item.title) && item.title}
          </p>

          {expand ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </div>
      )}
      {expand && (
        <>
          {check.includes(item.title) ? (
            // <RadioButtonsGroup name={item.title} items={item.items} handleChange={handleChange} />
            item.component
          ) : (
            <>
              <CheckboxGroup items={item.items} handleChange={handleChange} />
              <Divider />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FilterItem;
