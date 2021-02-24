import React from "react";
import Head from "next/head";

const GoogleAnalytics = () => {
  return (
    <>
      {console.log(process.env.NODE_ENV === "production" && process.browser)}
      {console.log(process.env.NEXT_PUBLIC_GA_ID)}
      {process.env.NODE_ENV === "production" && process.browser ? (
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          ></script>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());

                gtag("config", "${process.env.NEXT_PUBLIC_GA_ID}");`,
            }}
          />
        </Head>
      ) : null}
    </>
  );
};

export default GoogleAnalytics;
