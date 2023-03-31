import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import App from "./_app";
import { useState } from "react";
import Navbar from "./navbar";

function Home() {
  const [active, setactive] = useState(false);
  const [Name, setName] = useState("");
  const [Organization, setOrganization] = useState("");
  const [Email, setEmail] = useState("");

  return (
    <div className="login-box">
      <form>
        <div class="user-box">
          <label>
            <h2>Name</h2>
          </label>
          <input type="text" name="name" value={Name}/>
        </div>
        <div class="user-box">
          <input type="text" name="organization" required=""></input>
          <label>
            <h2>Organization</h2>
          </label>
        </div>
        <div class="user-box">
          <input type="text" name="email" required=""></input>
          <label>
            <h2>Email</h2>
          </label>
        </div>

        <button
          id="button"
          style={{
            backgroundColor: active ? "green" : "",
          }}
        >
          {active ? "Generating api access key... " : "Generate api access key"}
        </button>
      </form>
    </div>
  );
}
export default Home;
