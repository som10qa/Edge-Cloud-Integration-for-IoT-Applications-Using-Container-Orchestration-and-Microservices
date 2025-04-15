package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Notification struct {
	Message string `json:"message"`
}

func notifyHandler(w http.ResponseWriter, r *http.Request) {
	var n Notification
	if err := json.NewDecoder(r.Body).Decode(&n); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Printf("Notification received: %s", n.Message)
	response := map[string]string{"status": "success", "info": "Notification sent"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/notify", notifyHandler)
	log.Println("Notification service running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}