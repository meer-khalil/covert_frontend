import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Card from "./Card";
import Pagination from "../Blog/Pagination";
import api from "../../util/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Properteis = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  // for pagination
  const [page, setPage] = useState(
    localStorage.getItem("sold_page") ? +localStorage.getItem("sold_page") : 1
  );
  const [pages, setPages] = useState(1);

  const getPropertiesData = async () => {
    let url = `/properties/sold`;
    try {
      const { data } = await api.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          page,
        },
      });

      const { properties, resultPerPage, filteredPropertiesCount } = data;
      const pages = Math.ceil(filteredPropertiesCount / resultPerPage);
      setPages(pages);
      setProperties(properties);
      console.log("properties: ", properties);
      localStorage.setItem("sold_page", page);
      navigate(`/properties/sold?page=${page}`);
    } catch (error) {
      toast("Error");
    }
  };

  useEffect(() => {
    getPropertiesData();
  }, [page]);

  return (
    <div className=" mt-5 mx-5">
      {
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-6 relative">
            {properties?.map((property) => (
              <Card property={property} key={property?._id} />
            ))}
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <Pagination page={page} pages={pages} changePage={setPage} />
          </Box>
        </div>
      }
    </div>
  );
};

export default Properteis;
