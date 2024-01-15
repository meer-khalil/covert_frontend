import Hero from "./Hero";
import BelowHero from "./BelowHero";
import Process from "./Process";
import PastDetails from "./PastDetails";
import Devider from "./Devider";

import api from "../../util/api";
import { useEffect, useState } from "react";
import Layout from "../Layouts/Layout";

export default function Home() {
  const [home, setHome] = useState(null);

  const fetchHomeData = async () => {
    try {
      const { data } = await api.get("/pages/home");
      setHome(data);

      console.log('Home Data: ', data);

    } catch (error) {
      console.error("Failed to Get the Home Data:", error.message);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (

    <Layout>
      <div className="relative">
        <Hero />
        <BelowHero commingSoon={home?.commingSoon} />
        <Process cards={home?.cardsData} />
        <PastDetails />
        <Devider />
      </div>
    </Layout>

  );
}
