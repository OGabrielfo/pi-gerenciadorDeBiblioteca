import "@/app/globals.css";
import NavbarPH from "../components/navbarPH";

export const metadata = {
  title: "Gerenciador de Biblioteca",
  description: "Gerenciador de Bilioteca desenvolvido para a disciplina de PI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      {children}
    </html>
  );
}
/*<NavbarPH /> */