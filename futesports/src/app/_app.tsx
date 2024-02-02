import '@/styles/globals.css';
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  console.log('props', pageProps)
    
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
export default MyApp;