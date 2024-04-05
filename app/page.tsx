
import "./css/home.css"

import React from 'react';
import type { SVGProps } from 'react';

export function MedicalIconIHealthServices(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64" {...props}><path fill="currentColor" d="M21.822 62.675h20.424V42.248h20.429V21.809H42.246V1.383H21.822v20.426H1.388v20.439h20.434z"></path></svg>);
}


export default function Home() {
  return (
    <div className="home-page">
      {/*HERO*/}
      <div className="home-hero">
        <div className="hero-left">
          <h2>Check Your Cancer Risk Today</h2>
          <h5>Lets check and assess your risk for potentially developing or having cancer</h5>
          <div className="hero-option-row">
            <div className="hero-btn">
              <a href="/check-risk">Check Risk</a>
            </div>
            <div className="hero-btn">
              <a href="/about">Learn More</a>
            </div>
          </div>
        </div>

        <div className="hero-right">

        </div>
      </div>
      {/*SERVICES*/}
      <div className="home-services">
        {/*TITLE*/}
        <div className="services-title">
          <h6>
            Our Services
          </h6>
          <h2>
            What We Offer
          </h2>
        </div>
        {/*ROW 1*/}
        <div className="services-row">
          {/*Box 1*/}
          <div className="service-box">
            <div className="service-box-title">
              <MedicalIconIHealthServices />
              <h4>Cardiovascular Risk</h4>
            </div>
            <h6>Assess your risk for cardiovascular diseases</h6>
            <div className="service-box-btn">
              See More
            </div>
          </div>
          {/*Box 2*/}
          <div className="service-box">
            <div className="service-box-title">
              <MedicalIconIHealthServices />
              <h4>Cardiovascular Risk</h4>
            </div>
            <h6>Assess your risk for cardiovascular diseases</h6>
            <div className="service-box-btn">
              See More
            </div>
          </div>
          {/*Box 3*/}
          <div className="service-box">
            <div className="service-box-title">
              <MedicalIconIHealthServices />
              <h4>Cardiovascular Risk</h4>
            </div>
            <h6>Assess your risk for cardiovascular diseases</h6>
            <div className="service-box-btn">
              See More
            </div>
          </div>
        </div>
        {/*ROW 2*/}
        <div className="services-row">
          {/*Box 1*/}
          <div className="service-box">
            <div className="service-box-title">
              <MedicalIconIHealthServices />
              <h4>Cardiovascular Risk</h4>
            </div>
            <h6>Assess your risk for cardiovascular diseases</h6>
            <div className="service-box-btn">
              See More
            </div>
          </div>
          {/*Box 2*/}
          <div className="service-box">
            <div className="service-box-title">
              <MedicalIconIHealthServices />
              <h4>Cardiovascular Risk</h4>
            </div>
            <h6>Assess your risk for cardiovascular diseases</h6>
            <div className="service-box-btn">
              See More
            </div>
          </div>
          {/*Box 3*/}
          <div className="service-box">
            <div className="service-box-title">
              <MedicalIconIHealthServices />
              <h4>Cardiovascular Risk</h4>
            </div>
            <h6>Assess your risk for cardiovascular diseases</h6>
            <div className="service-box-btn">
              See More
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
