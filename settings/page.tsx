import AdminSidebar from "../../components/admin/AdminSidebar";

export default function Settings() {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ padding: "20px", flex: 1 }}>
        <h1>Settings</h1>
        <p>Manage your Admin Panel settings here.</p>

        <div style={{ marginTop: "20px" }}>
          <label>
            Admin Name: <input type="text" defaultValue="Anil Chauhan" />
          </label>
          <br /><br />
          <label>
            Site Theme: 
            <select defaultValue="Light">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </label>
          <br /><br />
          <button style={{ padding: "5px 10px" }}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}
