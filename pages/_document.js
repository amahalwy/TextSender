import Document, {
  Head as HeadDoc,
  Html,
  Main,
  NextScript,
} from "next/document";
import Head from "next/head";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
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
        ) : (
          <HeadDoc />
        )}

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
