import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import App from "./_app";
import { useEffect, useState } from "react";
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
  const [s3, setS3] = useState("");
  const [glue, setGlue] = useState("");
  const [store_DB, setDBStrore] = useState("");

  const notify = () =>
    toast("✅ API Key Copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const checkStatus = async () => {
    try {
      const res = await axios.get("https://orguser.singhharshit.me/api/status");
      setS3(res.data.s3_status);
      setGlue(res.data.glue);
      setDBStrore(res.data.store_DB);
    } catch (err) {
      console.log(err);
    }
  };

  const callInterval = () => {
    setInterval(() => {
      checkStatus();
    }, 3000);
  };

  useEffect(() => {
    if (active) {
      callInterval();
    }
  }, [active]);

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
      navigator.clipboard.writeText(apiKey);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="master">
      <ToastContainer />
      <div className="login-box">
        <form className="formItems">
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
          <button
            disabled={active}
            id="button"
            onClick={(e) => handleSubmit(e)}
          >
            {fetching && !active
              ? "Generating Key..."
              : active
              ? "User Authenticated"
              : "Generate Key"}
          </button>
        </form>
      </div>
      <div className="login-box">
        <ol className="orderList">
          <li className="listItem">
            S3 Status:{" "}
            {s3 == "uploading"
              ? "Uploading file to S3"
              : s3 == "uploaded"
              ? "File successfully Uploaded to S3"
              : null}
          </li>
          <li>
            Glue Status:
            {glue == "pending"
              ? "waiting for Apache spark to start"
              : glue == "processing"
              ? "Running Apache Spark"
              : glue == "processed"
              ? "Processing Complete"
              : null}
          </li>
          <li>
            Database Status:
            {store_DB == "pending"
              ? "waiting for file"
              : store_DB == "uploaded"
              ? "File uploaded to database"
              : null}
          </li>
        </ol>
      </div>
    </div>
  );
}
export default Home;
