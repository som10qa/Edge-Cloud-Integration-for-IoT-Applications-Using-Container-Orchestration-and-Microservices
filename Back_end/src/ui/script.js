document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("dataForm");
    
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const lightIntensity = document.getElementById("lightIntensity").value;
      const co2 = document.getElementById("co2").value;
      const humidity = document.getElementById("humidity").value;
      
      const data = {
        light_intensity: Number(lightIntensity),
        co2: Number(co2),
        humidity: Number(humidity)
      };
      
      // Send data to the cloud Pub-Sub service
      fetch("http://<GCP_PUBSUB_ENDPOINT>:4000/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          alert("Failed to send data.");
        }
      })
      .catch(error => console.error("Error publishing data:", error));
    });
    
    // Subscribe to real-time updates from the Pub-Sub service via SSE
    const eventSource = new EventSource("http://<GCP_PUBSUB_ENDPOINT>:4000/subscribe");
    eventSource.onmessage = function(event) {
      const messagesDiv = document.getElementById("messages");
      let newMessage = document.createElement("p");
      newMessage.textContent = "Update: " + event.data;
      messagesDiv.appendChild(newMessage);
    };
  });  