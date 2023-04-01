import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import App from "./_app";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [active, setactive] = useState(false);
  const [Name, setName] = useState("");
  const [Organization, setOrganization] = useState("");
  const [Email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [fetching, setFetching] = useState(false);
  const notify = () =>
    toast("Api access key generated", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

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
      notify();
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-box">
        <form>
          <div className="label">
            <label id="text">Email :</label>
            <input
              className="input"
              type="text"
              name="email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="label">
            <label id="text">Name :</label>
            <input
              className="input"
              type="text"
              name="name"
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="label">
            <label id="text">Organization :</label>
            <input
              className="input"
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
    </>
  );
}
export default Home;
