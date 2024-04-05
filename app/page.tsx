
import "./css/home.css"


export default function Home() {
  return (
    <div className="home-page">
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
    </div>
  );
}
