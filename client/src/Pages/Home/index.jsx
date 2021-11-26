import React from "react";
import "./index.css";
import Button from "@material-ui/core/Button";

export default function Home() {
  return (
    <div class="home-wrapper">
      <div class="fullscrenvideo">
        <div class="overlay">
          <img
            class="shuttrlogo"
            src={process.env.PUBLIC_URL + "/images/shuttrlogo.png"}
            alt="shuttr logo"
          ></img>
        </div>
        <video className="videoTag" autoPlay loop muted>
          <source
            src={process.env.PUBLIC_URL + "/images/banner_dark.mp4"}
            type="video/mp4"
          />
        </video>
      </div>
      <div class="cta-wrapper">
        <img
          class="shuttriphone"
          src={process.env.PUBLIC_URL + "/images/shuttr_iphone.png"}
          alt="iphone shuttr"
        ></img>
        <div class="text_home">
          <h2> Find the best spots,</h2>
          <p>See what you're missing out on in your city and discover more.</p>
          <p class="no-account" style={{ color: "white" }}>
            Don't have an account?
          </p>

          <Button
            type="button"
            width="50%"
            variant="contained"
            color="primary"
            href="/signup"
            style={{ backgroundColor: "#51fbee", color: "#000000" }}
          >
            Sign up
          </Button>
        </div>
      </div>
      <div class="grid">
        <div class="grid-left">
          <img
            class="home-img-left"
            src={process.env.PUBLIC_URL + "/images/londonpub.jpg"}
            alt="london pub"
          ></img>
        </div>
        <div class="grid-right">
          <h2> Want to see more?</h2>
          <p style={{ color: "white" }}>
            Join today and see your city like you've not seen it before.
          </p>

          <Button
            type="button"
            width="50%"
            variant="contained"
            color="primary"
            href="/signup"
            style={{ backgroundColor: "#51fbee", color: "#000000" }}
          >
            Find Out More
          </Button>
        </div>
      </div>
    </div>
  );
}
