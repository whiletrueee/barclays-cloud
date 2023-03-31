import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import App from "./_app";
import { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";

function Home() {
  const [active, setactive] = useState(false);
  const [Name, setName] = useState("");
  const [Organization, setOrganization] = useState("");
  const [Email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);
    const data = {
      name: Name,
      organisation: Organization,
      email: Email,
    };

    try {
      const res = await axios.post(
        "https://orguser.singhharshit.me/api/accessKey",
        data
      );
      setApiKey(res.data.apiKey);
      setactive(true);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="">
      <form>
        <div className="">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="inputbox">
          <label>Organization</label>
          <input
            type="text"
            name="organization"
            value={Organization}
            onChange={(e) => {
              setOrganization(e.target.value);
            }}
          />
        </div>
        <button id="button" onClick={(e) => handleSubmit(e)}>
          {fetching ? "Loading..." : "Submit"}
        </button>
      </form>
      {active ? apiKey : null}
    </div>
  );
}
export default Home;
