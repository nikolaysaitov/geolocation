import React, { useEffect, useState } from "react";
import { useGeolocation } from "react-use";

const SendMessage = ({ chatId, position }) => {
    const [response, setResponse] = useState(null);
  
    useEffect(() => {
      if (position) {
        fetch(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`, {
          method: "POST",
          body: JSON.stringify({ chat_id: -962941088, text: `Latitude: ${position.latitude}, Longitude: ${position.longitude}` }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => setResponse(data))
          .catch((error) => console.error(error));
      }
    }, [chatId, position]);
  
  
    
  
    return (
      <div>
        {response && response.ok && (
          <p>Сообщение успешно отправлено!</p>
        )}
        {response && !response.ok && (
          <p>Произошла ошибка при отправке сообщения.</p>
        )}
      </div>
    );
  };

  export default SendMessage;