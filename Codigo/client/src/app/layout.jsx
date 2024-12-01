import "./globals.css";
import Header from "@/component/header/page";
import Footer from "@/component/footer/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
