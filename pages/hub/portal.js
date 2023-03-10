import Head from "next/head";
import axios from 'axios';
import moment from 'moment';

import { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/HubLayout";
import Navbar from "../../components/HubNavbar";

export default function HubDashboard() {
  /* Auth */
  const { user, setUser } = useAuth();

  /* Player Data */
  const [hubData, setHubData] = useState(null);

    useEffect(() => {
        axios.get('/api/hub/tribe_manager').then(function (response) {
            setHubData(response.data);
        }).catch(function (error) {
            setHubData(null);
        })
    },[]);

    const rankings = false;

  return (
    user && (
      <>
        <Head>
          <title>Bloody ARK Hub</title>
          <meta name="description" content="Generated by create next app" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
            integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div class="flex flex-col bg-opacity-50 h-screen">
        <Navbar/>
                <div class="pt-16 w-full h-full">
                <iframe id="bloodyPortal" src="https://portal.bloody-ark.com" class="w-full justify-center items-center scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 h-full flex flex-grow">
                
                </iframe>
            </div>
        </div>
      </>
    )
  );
}
