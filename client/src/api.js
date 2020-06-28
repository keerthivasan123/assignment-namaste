import { API } from "./backend";

//Get all Todos
export const getEvents = (date, month, year, defaultTimeZone) => {
  return fetch(`${API}/findByDate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({date, month, year, defaultTimeZone})
  }) 
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => console.log(err));
};

//Register User
export const registerEvent = (id, name, email) => {
  return fetch(`${API}/register/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email})
  }) 
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => console.log(err));
};