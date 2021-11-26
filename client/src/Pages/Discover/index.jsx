import "./index.css";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import Location from "../../Components/Location";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

export default function Discover() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");

  const searchTag = (event) => {
    let userInput = event.target.value;
    if (!userInput) {
      setInput("");
    } else {
      setInput("Showing search results for: " + userInput);
    }
    let value = userInput.charAt(0).toUpperCase() + userInput.slice(1);
    let result = [];
    result = allData.filter((data) => {
      return data.location.search(value) !== -1;
    });
    setFilteredData(result);
  };

  useEffect(() => {
    axios("/photos/all")
      .then((response) => {
        setAllData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error getting data: " + error);
      });
  }, []);

  return (
    <div>
      <div class="page">
        <div class="discover_container">
          <label class="title">Search Locations:</label>
          <input
            type="text"
            placeholder="Search Locations"
            onChange={(event) => searchTag(event)}
          />
          <div class="search"></div>
        </div>
        <div class="search_results">
          <br />
          {<b>{input}</b>}
        </div>
        <div class="container">
          {filteredData.map((value, index) => (
            <div class="card">
              <div class="face1">
                <div class="content" key={value.id}>
                  <Image
                    class="cloud_photo"
                    cloudName="cyber_photos"
                    publicId={value.publicId}
                  />
                </div>
              </div>
              <div class="face2">
                <div class="content">
                  <p>#{value.hashtag}</p>
                  <p>Taken at: {value.location}</p>
                  <a href={"/profile/" + value.author}> @{value.author}</a>
                  <br />
                  <Popup
                    trigger={<button className="button">View More</button>}
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="modal">
                        <button className="close" onClick={close}>
                          &times;
                        </button>
                        <div className="modal-content">
                          {" "}
                          <Location
                            name={value.name}
                            hashtag={value.hashtag}
                            location={value.location}
                            coordinates={value.coordinates}
                            caption={value.caption}
                            description={value.description}
                            publicId={value.publicId}
                          />
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
