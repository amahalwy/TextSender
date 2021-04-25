import React from "react";
import Head from "next/head";
import endpoints from "../config/endpoints";

const GoogleAnalytics: React.FC = () => (
  <>
    {process.env.NODE_ENV === "production" && process.browser && (
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${endpoints.GAid}`}
        ></script>
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());

                gtag("config", "${endpoints.GAid}");`,
          }}
        />
      </Head>
    )}
  </>
);

export default GoogleAnalytics;
