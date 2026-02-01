import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#111",
        color: "#fff",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>

      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <Link href="/dashboard" style={{ color: "#0f0" }}>
              Dashboard
            </Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <Link href="/users" style={{ color: "#0f0" }}>
              Users
            </Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <Link href="/analytics" style={{ color: "#0f0" }}>
              Analytics
            </Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <Link href="/settings" style={{ color: "#0f0" }}>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
