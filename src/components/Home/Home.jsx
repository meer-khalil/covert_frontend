import Hero from "./Hero";
import BelowHero from "./BelowHero";
import Process from "./Process";
import PastDetails from "./PastDetails";
import Devider from "./Devider";

import api from "../../util/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [home, setHome] = useState(null);
  const [properties, setProperties] = useState([]);

  const fetchHomeData = async () => {
    try {
      const { data } = await api.get("/pages/home");
      setHome(data);

      // console.log('Home Data: ', data);
    } catch (error) {
      console.error("Failed to Get the Home Data:", error.message);
    }
  };

  const getPastDeals = async () => {
    let url = `/properties/past-deals`;

    try {
      const { data } = await api.get(url);
      const { properties } = data;
      setProperties(properties);
    } catch (error) {
      console.log("Error While fetching Home Properties: ", error.message);
    }
  };

  useEffect(() => {
    fetchHomeData();
    getPastDeals();
  }, []);

  return (
    <div className="relative">
      <Hero />
      <BelowHero commingSoon={home?.commingSoon} />
      <Process cards={home?.cardsData} />
      <PastDetails properties={properties} />
      <Devider />
    </div>
  );
}
