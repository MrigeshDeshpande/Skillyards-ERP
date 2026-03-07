export const metadata = {
  title: "Skillyards ERP",
  description: "Skillyards ERP System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}