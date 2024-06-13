import React from "react";
import "./About.scss";
import { Link } from "react-router-dom";

const About = () => {
  const teams = [
    {
      name: "Nona Dhakal",
      img: "./img/nona.jpeg",
      desc: "ReactJs Developer",
    },
    {
      name: "Riya Pradhan",
      img: "./img/riya.jpeg",
      desc: "UI/UX Designer",
    },
    {
      name: "Sanush Shakya",
      img: "./img/sanush.jpeg",
      desc: "Full Stack Developer",
    },
    {
      name: "Sarvesh Dhakal",
      img: "./img/sarvesh.jpeg",
      desc: "UI/UX Designer",
    },
  ];
  return (
    <div className="about">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src="./img/featured1.png" />
          </div>
          <div className="right">
            <h3>About Us</h3>
            <p>
              In the vibrant and eventful world of Prime College, where
              enthusiasm knows no bounds, a cutting-edge Event Management System
              emerges to orchestrate, streamline, and elevate every facet of
              college events. The Prime College Event Management System
              transcends traditional event coordination, introducing efficiency,
              accessibility, and excitement into the heart of college life. By
              digitising and automating event management processes, it not only
              simplifies administration but also fosters a culture of
              participation and collaboration. With its user-friendly interface,
              data-driven insights, and a commitment to enhancing the college
              event experience, this system stands as a testament to the
              college's dedication to fostering talent, creativity, and
              community engagement.
            </p>
          </div>
        </div>
        <div className="bottom">
          <h3>OUR TEAM</h3>
          <p>BIM Sixth Semester </p>
          <div className="cards">
            {teams.map((team) => (
              <div className="teamCard">
                <img src={team.img} alt="" />
                <span className="name">{team.name}</span>
                <span className="desc">{team.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
