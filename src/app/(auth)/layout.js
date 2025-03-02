import Modal from "@/components/modal/modal";
import "../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">{children}</body>
    </html>
  );
}
