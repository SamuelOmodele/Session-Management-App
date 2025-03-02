import Modal from "@/components/modal/modal";
import { ToastContainer, toast } from "react-toastify";
import "../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
