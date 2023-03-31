import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import App from './_app'
import { useState } from 'react'
import Navbar from './navbar'


function Home() {
  const[active,setactive]=useState(false);
  
  const handleClick =()=>{
    setactive(!active);
    
  };
  return (
    <div className='Main'>
    

      
    <div class='login-box'>
      
    
  <form>
    <div class="user-box"> 
    
      <input type="text" name="" required=""></input> 
    
      
      <label><h2>Name</h2></label>
     
    </div>
    <div class="user-box">  
      <input type="text" name="" required=""></input>
      <label><h2>Organization</h2></label>
    </div>
  
    
      <button  id ="button" style={{
        backgroundColor : active ? 'green': '',
      }}onClick={handleClick}>
        
        {active ? "Generating api access key... " :"Generate api access key"}
        </button>
   
  </form>
</div>
</div>


  )
}
export default Home;
