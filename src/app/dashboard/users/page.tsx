import Header from "@/componentes/Header";
import UsersClient from "./UsersClient";

export const runtime = "nodejs";

export default function DashboardUsersPage() {
  return (
    <>
      {/*<Header variant="dashboard" />*/}S
      <main className="mx-auto max-w-6xl px-4 py-10">
        <UsersClient />
      </main>
    </>
  );
}