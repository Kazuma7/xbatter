import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
