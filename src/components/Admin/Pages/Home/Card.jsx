import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

const Card = ({ card, index, cardsData, setCardsData }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCard = (e) => {
    let temp;
    if (e.target.name === "title") {
      temp = cardsData;
      temp[index].title = title;
      setTitle(e.target.value);
    } else {
      temp = cardsData;
      temp[index].description = description;
      setDescription(e.target.value);
    }

    setCardsData(temp);
  };

  useEffect(() => {
    console.log('Card: ', card);
    console.log('CardData: ', cardsData);
    setTitle(card?.title)
    setDescription(card?.description)
  }, [])

  return (
    <div className=" mt-5">

      <h4 className=" text-lg mb-3 font-bold">Card 0{index + 1}</h4>

      <div>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={title}
          onChange={(e) => {
            let temp = cardsData;
            temp[index].title = e.target.value;
            setCardsData(temp)
            setTitle(e.target.value)
          }}
          fullWidth
          autoComplete="off"
          inputProps={{ style: { fontSize: 15 } }}
          InputLabelProps={{
            style: { fontSize: 15, color: "GrayText" },
          }}
          sx={{ marginTop: "10px" }}
        />
      </div>

      <div className="mt-3">
        {/* <label className=" font-bold">Description</label> */}
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={description}
          onChange={(e) => {
            let temp = cardsData;
            temp[index].description = e.target.value;
            setCardsData(temp)
            setDescription(e.target.value)
          }}
          fullWidth
          autoComplete="off"
          inputProps={{ style: { fontSize: 15 } }}
          InputLabelProps={{
            style: { fontSize: 15, color: "GrayText" },
          }}
          multiline
          rows={3}
        />
      </div>
    </div>
  );
};

export default Card;
