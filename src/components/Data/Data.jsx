import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layouts/Layout";
import ZipForm from "./components/ZipForm";
import DataSource from "./components/DataSource";
import Display from "./components/Display";
import { UserContext } from "../../context/UserContext";
import BackButton from "../Common/BackButton";
import LoginDialogBox from "../Buy/LoginDialogBox";

export default function Data() {
  const { zipcodet, categoryt } = useParams();
  console.log("Code: ", zipcodet);
  const { user } = useContext(UserContext);
  const [zipcode, setZipcode] = useState(zipcodet ? zipcodet : "00612");
  const [category, setCategory] = useState(
    categoryt ? categoryt : "Population"
  );

  return (
    <Layout>
      <div className=" my-3 pl-2">
        <BackButton />
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className=" flex-[1]">
          <ZipForm setZipcode={setZipcode} zipcodet={zipcodet} />
          <DataSource category={category} />
        </div>

        <div className="w-full flex-[5]">
          {user ? (
            <Display
              category={category}
              setCategory={setCategory}
              zipcode={zipcode}
            />
          ) : (
            <LoginDialogBox />
          )}
        </div>
      </div>
    </Layout>
  );
}
