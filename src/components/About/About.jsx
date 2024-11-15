import React, { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import Detail from "./Detail";
import Mission from "./Mission";
import Contact from "./Contact";
import api from "../../util/api";
import Container from "../Layouts/Container";

import image from "../../images/PageTitles/AboutPageTitle.webp";

const About = () => {
  const [about, setAbout] = useState(null);

  const fetchAboutData = async () => {
    try {
      const { data } = await api.get("/pages/about");
      setAbout(data);

      // console.log("About Data: ", data);
    } catch (error) {
      console.error("Failed to Get the Home Data:", error.message);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <>
      <PageTitle title="About Us" image={image} />

      <Container>
        <Detail whatWeDo={about?.whatWeDo} />
      </Container>

      <Container>
        <Mission mission={about?.mission} />
      </Container>

      <Contact />
    </>
  );
};

export default About;
