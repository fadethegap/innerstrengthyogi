import "../styles/globals.css";
import Head from "next/head";
import NavBar from "../components/NavBar";
import UserProvider from "../context/user";
import ClassesProvider from "../context/classes";
// import UserProvider from "../context/user_old";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <ClassesProvider>
          <Head>
            <title>Om Is Home</title>
            <meta
              name="description"
              content="Created with love by John Kovach"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <NavBar />
          <Component {...pageProps} />
        </ClassesProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
