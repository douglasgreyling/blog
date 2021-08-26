import Header from "../components/Header";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 shadow-md bg-gray-800 text-white">
        <div className="container mx-auto md:px-52 px-10">
          <Header />
        </div>
      </div>

      <main className="bg-gray-100 pt-10 flex-auto">
        <div className="container mx-auto md:px-52 px-10 overflow-hidden">
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  );
}

export default MyApp;
