import Head from "next/head";
export default function Custom404() {
    return (
        <>
        <Head>
        <title>Bloody ARK - Servers</title>
        <meta name="description" content="Welcome to BloodyARK, The perfect Ark: Survival Evolved experience. This server was established in 2017 and is still running strong as one of the biggest unofficial ark communities."/>
        <meta name="keywords" content="BloodyARK,ARK,Dinosaurs,PVPVE,Best ARK Server,BloodyHub,BloodyShop,Evolve or Die"/>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div>
        <section className="flex flex-col md:flex-row h-screen items-center">
          <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            <img src="/ark2.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
              flex items-center justify-center">
            <div className="w-full h-100">
              <i className="fa-solid fa-exclamation-triangle text-gray-700 mt-12 focus:ring ring-red-500" style={{fontSize: '50px'}} />
              <h1 className="text-xl md:text-2xl font-bold leading-tight mt-5">Page Not Found</h1>
              <hr className="my-6 border-gray-300 w-full" />
              <p className="mt-8">Oops! Seem's you've got lost! Our shadowmanes will help you find the right page back safe and sound to home. This page is unavailable beacuse it does not exist or was deleted!</p>
            </div>
          </div>
        </section>
      </div>
      </>
    )
  }