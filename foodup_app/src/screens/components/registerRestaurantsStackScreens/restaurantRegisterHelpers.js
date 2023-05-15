import React, { useState, useEffect } from "react";

export default function RestaurantRegisterHelpers() {
  const [registerRestaurantName, setRegisterRestaurantName] = useState("");
  const [registerRestaurantTelephone, setRegisterRestaurantTelephone] = useState("");
  const [registerRestaurantEmail, setRegisterRestaurantEmail] = useState("");
  const [registerRestaurantWebsite, setRegisterRestaurantWebsite] = useState("");
  const [registerRestaurantStreet, setRegisterRestaurantStreet] = useState("");
  const [registerRestaurantZip, setRegisterRestaurantZip] = useState("");
  const [registerRestaurantCity, setRegisterRestaurantCity] = useState("");
  const [registerRestaurantTags, setRegisterRestaurantTags] = useState([]);
  const [registerRestaurantFirstName, setRegisterRestaurantFirstName] = useState("");
  const [registerRestaurantLastName, setRegisterRestaurantLastName] = useState("");

  // Getter methods
  const getRestaurantName = () => registerRestaurantName;
  const getRestaurantTelephone = () => registerRestaurantTelephone;
  const getRestaurantEmail = () => registerRestaurantEmail;
  const getRestaurantWebsite = () => registerRestaurantWebsite;
  const getRestaurantStreet = () => registerRestaurantStreet;
  const getRestaurantZip = () => registerRestaurantZip;
  const getRestaurantCity = () => registerRestaurantCity;
  const getRestaurantTags = () => registerRestaurantTags;
  const getRestaurantFirstName = () => registerRestaurantFirstName;
  const getRestaurantLastName = () => registerRestaurantLastName;
  const getRestaurantDataset = () => {
    return {
      registerRestaurantName,
      registerRestaurantTelephone,
      registerRestaurantEmail,
      registerRestaurantWebsite,
      registerRestaurantStreet,
      registerRestaurantZip,
      registerRestaurantCity,
      registerRestaurantTags,
      registerRestaurantFirstName,
      registerRestaurantLastName,
    };
  };

  // Setter methods
  const setRestaurantName = (newValue) => setRegisterRestaurantName(newValue);
  const setRestaurantTelephone = (newValue) => setRegisterRestaurantTelephone(newValue);
  const setRestaurantEmail = (newValue) => setRegisterRestaurantEmail(newValue);
  const setRestaurantWebsite = (newValue) => setRegisterRestaurantWebsite(newValue);
  const setRestaurantStreet = (newValue) => setRegisterRestaurantStreet(newValue);
  const setRestaurantZip = (newValue) => setRegisterRestaurantZip(newValue);
  const setRestaurantCity = (newValue) => setRegisterRestaurantCity(newValue);
  const setRestaurantTags = (newValue) => setRegisterRestaurantTags(newValue);
  const setRestaurantFirstName = (newValue) => setRegisterRestaurantFirstName(newValue);
  const setRestaurantLastName = (newValue) => setRegisterRestaurantLastName(newValue);
  const setRestaurantDataset = () => {
    setRegisterRestaurantName()
    setRegisterRestaurantTelephone()
    setRegisterRestaurantEmail()
    setRegisterRestaurantWebsite()
    setRegisterRestaurantStreet()
    setRegisterRestaurantZip()
    setRegisterRestaurantCity()
    setRegisterRestaurantTags()
    setRegisterRestaurantFirstName()
    setRegisterRestaurantLastName()
    
  };
  
  return {
    getRestaurantName,
    getRestaurantTelephone,
    getRestaurantEmail,
    getRestaurantWebsite,
    getRestaurantStreet,
    getRestaurantZip,
    getRestaurantCity,
    getRestaurantTags,
    getRestaurantFirstName,
    getRestaurantLastName,
    setRestaurantName,
    setRestaurantTelephone,
    setRestaurantEmail,
    setRestaurantWebsite,
    setRestaurantStreet,
    setRestaurantZip,
    setRestaurantCity,
    setRestaurantTags,
    setRestaurantFirstName,
    setRestaurantLastName,
    getRestaurantDataset,
    setRestaurantDataset
  };
}
