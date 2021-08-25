import Header from "../components/Header";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="sticky top-0 shadow-md">
        <Header />
      </div>
      <main className="bg-gray-100">
        <div className="contianer mx-auto">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
