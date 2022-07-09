import { FC } from 'react';
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

const Document: FC<DocumentProps> = () => (
  <Html>
    <Head />
    <body className="bg-red-300">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
