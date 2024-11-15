import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../util/api";

function Categaries({ category, setCategory }) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data.categories);
      // console.log("Categories: ", data);
    } catch (error) {
      console.error("Failed to Get the Home Data:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap justify-start gap-3 items-start mt-5">
      <Button
        variant={!category ? "contained" : "outlined"}
        sx={{
          p: 1,
          px: 2,
        }}
        onClick={() => setCategory(null)}
      >
        All
      </Button>
      {categories?.map((el, i) => (
        <Button
          key={i}
          variant={category === el._id ? "contained" : "outlined"}
          sx={{
            p: 1,
            px: 2,
          }}
          onClick={() => setCategory(el._id)}
        >
          {el.name}
        </Button>
      ))}
    </div>
  );
}

export default Categaries;
