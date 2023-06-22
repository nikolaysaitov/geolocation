import React, { useState, useEffect } from "react";

function Location() {
  const [location, setLocation] = useState("");

  const sendLocationToServer = (position) => {
    const url = "https://pim.impermebel.ru/apiyhrth";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ location: position }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const currentPosition = `${latitude}, ${longitude}`;
        setLocation(currentPosition);
        sendLocationToServer(currentPosition);
      },
      (error) => {
        console.error(error.message);
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLocation();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>Current Location: {location}</p>
    </div>
  );
}

export default Location;
