import Head from "next/head";
import axios from 'axios';
import moment from 'moment';
import Layout from '../../components/HubLayout'

import { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";

export default function HubDashboard() {
  /* Auth */
  const { user, setUser } = useAuth();

  /* Player Data */
  const [hubData, setHubData] = useState(null);

    useEffect(() => {
        axios.get('/api/hub/home').then(function (response) {
            setHubData(response.data);
        }).catch(function (error) {
            setHubData(null);
        })
    },[]);

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
            <Layout>
            <div class="">
              <div
                style={{
                  background: "url(/auth2.jpg)",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div
                  className="p-4 items-center bg-gray-800 dark:bg-bgray-bg dark:bg-opacity-60 bg-opacity-60 flex"
                  style={{ backdropFilter: "blur(5px)" }}
                >
                  <img
                    src={user.avatar}
                    alt="image"
                    className="h-14 w-14 rounded-full"
                  />
                  <div className="ml-4">
                    <h2 className="text-gray-100 font-bold text-xl">
                      Welcome, {user.username}!
                    </h2>
                    <p className=" text-gray-200 text-md font-semibold cursor-pointer">
                      Welcome to your home page of Bloody Hub, you can manage
                      your tribe, dinosaurs and more here!
                    </p>
                  </div>
                </div>
              </div>
              <div className="hub_page px-20 py-10">
                <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-bgray-secondary shadow rounded-lg">
                    <div className>
                      <div className="w-full  flex flex-wrap items-center  justify-center  rounded-t-md">
                        <div className="container w-full  transform   duration-200 easy-in-out rounded-t-md">
                          <div className=" h-32 overflow-hidden rounded-t-md">
                            <img
                              className="w-full rounded-t-md"
                              src="/auth2.jpg"
                              alt=""
                            />
                          </div>
                          <div className="flex justify-center px-5  -mt-12">
                            <img
                              className="h-32 w-32 bg-white dark:bg-bgray-secondary p-2 rounded-full object-cover"
                              src={user.avatar}
                              alt={user.username}
                            />
                          </div>
                        </div>
                      </div>
                      <h2 className="text-gray-800 dark:text-gray-50 text-3xl mt-1 font-bold text-center">
                        {user.username}
                      </h2>
                      <div className="flex justify-center my-1 hidden">
                        <p className="text-gray-600 dark:text-gray-50 mt-2 bg-gray-200 dark:bg-bgray-overlay rounded-full py-1 px-4 text-sm text-center font-bold">
                          <i className="fas fa-code" /> Bloody ARK Developer
                        </p>
                      </div>
                      <hr className="mx-5 mt-5 dark:border-gray-600" />
                      <div className="p-5 mb-10">
                        <h1 className="text-2xl font-bold dark:text-gray-50">
                        <i class="fa-solid fa-vector-square"></i> Your Survivor
                        </h1>
                        <p className="text-md text-gray-500 dark:text-gray-200 sm:mb-0 mb-5 mt-5">
                          Survivor Name : {hubData?.player?.username}
                        </p>
                        <p className="text-md text-gray-500 dark:text-gray-200  sm:mb-0 mb-5 mt-1">
                          Player ID : {hubData?.player?.playerId}
                        </p>
                        <p className="text-md text-gray-500 dark:text-gray-200  sm:mb-0 mb-5 mt-1">
                          Steam ID : {user.id}
                        </p>
                        <br />
                        <hr className="dark:border-gray-600 dark:text-gray-200 " />
                        <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-0 mb-2 mt-5">
                          <i className="fa-solid fa-coins text-gray-500 dark:text-gray-200  mr-2" />
                          Bloody Points : {hubData?.extra_data?.points ? hubData?.extra_data?.points : 0}
                        </p>
                        <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-5 mb-5">
                          <i className="fa-solid fa-coins text-gray-500 dark:text-gray-200  mr-2" />
                          Total Points Spent : {hubData?.extra_data?.points_spent ? hubData?.extra_data?.points_spent : 0}
                        </p>
                        <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-0 mb-2">
                          <i className="fa-solid fa-ticket text-gray-500 dark:text-gray-200  mr-2" />
                          Dino Color Tokens : {hubData?.extra_data?.dino_tokens ? hubData?.extra_data?.dino_tokens : 0}
                        </p>
                        <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-0 mb-2">
                          <i className="fa-solid fa-ticket text-gray-500 dark:text-gray-200  mr-2" />
                          Renamer Tokens : {hubData?.extra_data?.player_rename_tokens ? hubData?.extra_data?.player_rename_tokens : 0}
                        </p>
                        <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-0 mb-2 mt-2">
                          <i className="fa-solid fa-shield-halved text-gray-500 dark:text-gray-200 mr-2" />
                          {hubData?.extra_data?.pvp_status ? "PVPVE Status : PvP" : "PVPVE Status : PvE" }
                        </p>
                        <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-0 mb-2 mt-2">
                          <i className="fa-solid fa-object-ungroup text-gray-500 dark:text-gray-200 mr-2" />
                          Groups : {hubData?.extra_data?.groups}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-bgray-secondary shadow rounded-lg relative">
                    <div className="absolute bottom-0 inset-x-0 rounded-b-lg overflow-hidden z-10">
                      <canvas id="playersChart" className="h-10" />
                    </div>
                    <div className="p-5 mb-10">
                      <h1 className="text-2xl font-bold dark:text-gray-50">
                      <i class="fa-solid fa-users"></i> Tribe Information
                      </h1>
                      {hubData?.tribe?.tribeId
                      
                      ?
                      <><img
                        src={"https://ui-avatars.com/api/?name=" + hubData?.tribe?.tribeName + "&color=9ca3af&background=272a35&size=512"}
                        className="h-32 w-32 mt-4 rounded-lg shadow-md "
                      />
                      <p className="text-md text-gray-500 dark:text-gray-300 sm:mb-0 mb-5 mt-5">
                        Tribe Name : {hubData?.tribe?.tribeName}
                      </p>
                      <p className="text-md text-gray-500 dark:text-gray-300  sm:mb-0 mb-5 mt-1">
                        Tribe Owner : {hubData?.tribe?.tribeOwner}
                      </p>
                      <p className="text-md text-gray-500 dark:text-gray-300  sm:mb-0 mb-2 mt-1">
                        Tribe Location : {hubData?.tribe?.tribeLocation}
                      </p>
                      <p className="text-md text-gray-500 dark:text-gray-300  sm:mb-0 mb-2 mt-1">
                        Creation Date : {moment(hubData?.tribe?.tribeCreationDate).format('MMMM Do YYYY, h:mm:ss a')}
                      </p>
                      <p className="text-md text-gray-500 dark:text-gray-300 sm:mb-0 mb-5 mt-1">
                        Tribe Members Count : {hubData?.tribe?.tribeMembers.length}
                      </p>
                      <h1 className="text-2xl font-bold dark:text-gray-50 mt-5 mb-5">
                      <i class="fa-solid fa-users"></i> Tribe Members
                      </h1>
                      {hubData?.tribe?.tribeMembers?.map((member) => {     
                        return (<p className="text-md text-gray-500 dark:text-gray-300  sm:mb-0 mb-5 mt-1">
                        {member.CharacterName}
                        </p>)
                      })}
                      </>
                      :
                      <div
                        className="text-gray-100 px-4 py-3  mt-10"
                        role="alert"
                      >
                        <div className>
                          <div className="my-auto flex justify-center mb-5">
                            <i className="fa-solid fa-users text-5xl text-bred-2" />
                          </div>
                          <div>
                            <p className="font-bold text-2xl text-center text-gray-800 dark:text-gray-100">
                              You're not in a tribe!
                            </p>
                            <p className="text-lg text-gray-400 mt-2 text-center">
                              Sorry, but our shadowmanes can't display your
                              tribe if you're not in a tribe!
                            </p>
                          </div>
                        </div>
                      </div>
                                          }
                    </div>
                  </div>
                  <div className="bg-white dark:bg-bgray-secondary shadow rounded-lg relative">
                    <div className="absolute bottom-0 inset-x-0 rounded-b-lg overflow-hidden z-10">
                      <canvas id="playersChart" className="h-10" />
                    </div>
                    <div className="p-5 mb-10">
                      <h1 className="text-2xl font-bold dark:text-gray-50">
                      <i class="fa-solid fa-gear"></i> Notification Actions
                      </h1>
                      <a href="/api/hub/delete_requests" data-modal-toggle="add-user-modal" class="w-full text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center mt-3">Delete All Requests</a>
                      <a href="/api/hub/delete_invites" data-modal-toggle="add-user-modal" class="w-full text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center mt-3 mb-5">Clear Notifications</a>

                      <h1 className="text-2xl font-bold dark:text-gray-50">
                      <i class="fa-solid fa-inbox"></i> Notifications
                      </h1>
                      {hubData?.notifications?.invites == [] && hubData?.notifications?.join_requests == [] ? <></>
                      : <p className="text-md mt-1 text-gray-500 dark:text-gray-300  sm:mb-0 mb-5 hidden">
                        You currently have no notifications.
                      </p>}

                      {hubData?.notifications?.invites?.map((invite) => {
                              return (
                      <div className="bg-gray-200 dark:bg-bgray-overlay shadow px-4 py-2 rounded-lg mt-5">
                        <h1 className="text-xl font-bold dark:text-gray-50 mb-2">
                          Tribe Invite from {invite.tribe.tribename}
                        </h1>
                        <p className="dark:text-gray-200">
                          You have been invited to the tribe of{" "}
                          <strong>
                          {invite.tribe.tribename}
                          </strong>{" "}
                          on the map of
                          {" "}<strong>
                          {invite.tribe.map}
                          </strong>{" "}
                          . Please type in-game
                          {" "}<strong>
                            /tribe acceptinvite '{invite.tribe.tribename}'
                          </strong>{" "}
                          to join.
                        </p>
                        <a
                          href={`/api/hub/delete_invites`}
                          data-modal-toggle="add-user-modal"
                          className="mt-5 w-1/2 text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                        >
                          <i className="fa-solid fa-times mr-2" />
                          Reject Request
                        </a>
                      </div>)})}


                      {hubData?.notifications?.join_requests?.map((request) => {
                              return (
                      <div className="bg-gray-200 dark:bg-bgray-overlay shadow px-4 py-2 rounded-lg mt-5">
                        <h1 className="text-xl font-bold dark:text-gray-50 mb-2">
                          Join Request by{" "}
                          <strong>
                            {request?.survivor?.playername}
                          </strong>
                        </h1>
                        <p className="dark:text-gray-200">
                          A player named{" "}
                          <strong>
                          {request?.survivor?.playername}
                          </strong>{" "}
                          has requested to join your tribe. Please type in-game{" "}
                          <strong>
                            /tribe acceptreq '{request?.survivor?.playername}'
                          </strong>{" "}
                          to invite them.
                        </p>
                      </div>)})}

                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white items-center justify-between border-b border-gray-200 hidden">
                <div className="mb-1 w-full">
                  <div className="mb-4">
                    <nav className="mb-5" aria-label="Breadcrumb">
                      <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                          <a
                            href="#"
                            className="text-gray-700 hover:text-gray-900 inline-flex items-center"
                          >
                            <svg
                              className="w-5 h-5 mr-2.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            Home
                          </a>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <a
                              href="#"
                              className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
                            >
                              Users
                            </a>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span
                              className="text-gray-400 ml-1 md:ml-2 text-sm font-medium"
                              aria-current="page"
                            >
                              List
                            </span>
                          </div>
                        </li>
                      </ol>
                    </nav>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      All users
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            </Layout>
      </>
    )
  );
}
