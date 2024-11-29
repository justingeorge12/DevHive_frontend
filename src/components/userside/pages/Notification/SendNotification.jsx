
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function SendNotification() {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");
    const socket = new WebSocket(`ws://localhost:8001/ws/notifications/?token=${token}`);

    socket.onopen = () => {
      console.log("WebSocket is connected");
    };

    socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log("Notification received", data);
        setNotification((prev) => [...prev, data.message]);
        
        toast(data.message, {
          icon: '🔔',
          style: {background: '#333', color: '#fff',},
        });
        
      } catch (err) {
        console.error("Error parsing message", err);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
      console.log("The connection refuses");
    };
  }, []);

  return (
    null
  );
}

export default SendNotification;
