package main

import (
    "net/http"
)

func main() {
    // Serve static files from the current directory
    fs := http.FileServer(http.Dir("./"))
    http.Handle("/", fs)

    // Handle API requests
    http.HandleFunc("/api/reactions", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.Write([]byte(`[
            {"reactants":["H2","O2"],"products":["H2O"],"description":"Water forms! Bent shape gives polarity."},
            {"reactants":["Na","Cl"],"products":["NaCl"],"description":"Table salt forms!"}
        ]`))
    })

    // Start server on port 8080
    println("Server running at http://localhost:8080")
    http.ListenAndServe(":8080", nil)
}