import '../../styles/globals.css';

export const metadata = {
  title: 'CarPort - Your Trusted Car Importer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
