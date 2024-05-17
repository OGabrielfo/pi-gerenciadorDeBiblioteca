import styles from "./page.module.css";
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/login', 'replace')
  return (
    <div>
      <h1>Página inicial</h1>
    </div>
  );
}
