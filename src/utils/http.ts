import { SimpleMap } from "../constants";

export const METHODS = {
  Get: "GET",
  Post: "POST",
};

export const defaultResponseType = "json";

export class HTTPManager {
  constructor() { }

  public async Get<T = unknown>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(METHODS.Get, url); // Configure the request: GET method, specified URL
      xhr.responseType = defaultResponseType; // Tell XHR to parse the response as JSON automatically

      xhr.onload = function() {
        // xhr.status is the HTTP status code (e.g., 200, 404, 500)
        if (xhr.status >= 200 && xhr.status < 300) {
          // If the request was successful (status 2xx)
          resolve(xhr.response as T); // xhr.response contains the parsed JSON data
        } else {
          // If there was an HTTP error (e.g., 404, 500)
          reject(new Error(`HTTP error! Status: ${xhr.status} - ${xhr.statusText}`));
        }
      };

      xhr.onerror = function() {
        // Handles network errors (e.g., no internet connection, DNS issues)
        reject(new Error("Network error or request failed"));
      };

      xhr.send(); // Send the request
    });
  }

  public async Post<T = unknown>(url: string, dataToSend: SimpleMap<unknown>): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(METHODS.Post, url); // Changed to POST method
      xhr.setRequestHeader("Content-Type", "application/json"); // Set Content-Type header for JSON data
      xhr.responseType = defaultResponseType; // Expecting JSON response

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(`HTTP error! Status: ${xhr.status} - ${xhr.statusText}`));
        }
      };

      xhr.onerror = function() {
        reject(new Error("Network error or request failed"));
      };

      xhr.send(JSON.stringify(dataToSend)); // Send the data, stringified to JSON
    });
  }
}