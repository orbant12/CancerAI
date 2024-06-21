"use client"

import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../Context/UserAuthContext";
import { fetchSingleAssistantData } from "@/services/api";
import { SlArrowRightCircle } from "react-icons/sl";
import "../page.css";

const Assistant_Dashboard: FC = () => {
  const { currentuser } = useAuth();
  const [userData, setUserData] = useState<any>({}); // Adjust type as per your response structure

  const fetchUserData = async () => {
    try {
      const response = await fetchSingleAssistantData({
        userId: currentuser?.uid,
      });
      setUserData(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (currentuser?.uid) {
      fetchUserData();
    }
  }, [currentuser?.uid]);

  return (
    <div className="dashboard_container">
      <div className="board_welcome">
        <div
          style={{
            padding: 10,
            borderRadius: 100,
            border: "5px solid black",
            height: 150,
            width: 150,
          }}
        />
        <div>
          <h3>Hi {userData.fullname}!</h3>
          <h5>You have 12 notifications</h5>
          <h6 style={{ position: "absolute", right: 30, top: 120, opacity: 0.3 }}>
            {currentuser?.uid}
          </h6>
        </div>
      </div>
      <div className="board_icon_menu">
        <IconMenu_Item title={"Job Requests"} iconComponent={() => <SlArrowRightCircle size={30} />} />
        <IconMenu_Item title={"Active Sessions"} iconComponent={() => <SlArrowRightCircle size={30} />} />
        <IconMenu_Item title={"Job Requests"} iconComponent={() => <SlArrowRightCircle size={30} />} />
        <IconMenu_Item title={"Job Requests"} iconComponent={() => <SlArrowRightCircle size={30} />} />
      </div>
      <div className="home-services">
        {/* TITLE */}
        <div className="services-title">
          <h6>Your Services</h6>
          <h2>Dashboard</h2>
        </div>
        {/* ROW 1 */}
        <div className="services-row">
          {/* Box 1 */}
          <Dashboard_Item desc={"Assess your risk for cardiovascular diseases"} title={"Job Requests"} />
          {/* Box 2 */}
          <Dashboard_Item desc={"Assess your risk for cardiovascular diseases"} title={"Active Sessions"} />
          {/* Box 3 */}
          <Dashboard_Item desc={"Assess your risk for cardiovascular diseases"} title={"Cardiovascular Risk"} />
        </div>
      </div>
    </div>
  );
};

export default Assistant_Dashboard;

const IconMenu_Item: FC<{ iconComponent: () => React.ReactNode; title: string }> = ({ iconComponent, title }) => {
  return (
    <div style={{ flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      {iconComponent()}
      <h3>{title}</h3>
    </div>
  );
};

const Dashboard_Item: FC<{ title: string; notification?: number; desc: string }> = ({ title, notification, desc }) => {
  return (
    <div className="service-box">
      <div className="service-box-title">
        <h4>{title}</h4>
      </div>
      <h6>{desc}</h6>
      <div className="service-box-btn">See More</div>
    </div>
  );
};
