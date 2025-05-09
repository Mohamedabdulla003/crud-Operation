import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';


const Usercontext = createContext({
    data: [],
    name: "",
    email:"",
    phone:"",
    setData: () => {},
    setName: () => {},
    setEmail: () => {},
    setPhone: () => {},
    AddtoTable: () => {},
    handleFormSubmit: () => {},
    handleUpdate: () => {},
    handleDelete: () => {},
});

const API = "https://jsonplaceholder.typicode.com/users";

export const useUserContext =() => useContext(Usercontext);

export default function UserContextProvider({ children }) {
    const [data, setData] =useState([]);
    const [name, setName] = useState("");
    const [email,setEmail] =useState("");
    const [phone, setPhone] =useState("");


    const AddtoTable =(newData) => {
        setData((prevData) => [...prevData, newData]);
    };
    let navigate = useNavigate();

    const handleFormSubmit = (e, userData) => {
        e.preventDefault();
        axios
        .post(API, userData)
        .then((response) => {
            console.log(response);
            AddtoTable(response.data);
            navigate("/ListPages");
        })
        .catch((error) => {
            console.log("Error:", error);
        });

        setName("");
        setEmail("");
        setPhone("");
    };

    const handleUpdate = (id, updatedData) => {
        axios
          .put(`${API}/${id}`, updatedData)
          .then((response) => {
            const updatedUser = response.data;
            setData((prevData) =>
              prevData.map((user) => (user.id === id ? updatedUser : user))
            );
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      };
    
      const handleDelete = (id) => {
        axios
          .delete(`${API}/${id}`)
          .then(() => {
            setData((prevData) => prevData.filter((user) => user.id !== id));
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      };
    
      useEffect(() => {
        axios
          .get(API)
          .then((response) => {
            console.log(response);
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, []);
    
      const value = {
        data,
        name,
        email,
        phone,
        setName,
        setData,
        AddtoTable,
        handleFormSubmit,
        setEmail,
        setPhone,
        handleUpdate,
        handleDelete,
      };
    
  return <Usercontext.Provider value={value}>{children}</Usercontext.Provider>;
}
