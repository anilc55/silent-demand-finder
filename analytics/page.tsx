import AdminSidebar from "../../components/admin/AdminSidebar";

export default function Analytics() {
  const data = [
    { month: "Jan", visitors: 1200 },
    { month: "Feb", visitors: 1500 },
    { month: "Mar", visitors: 900 },
    { month: "Apr", visitors: 1700 },
  ];

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ padding: "20px", flex: 1 }}>
        <h1>Analytics Dashboard</h1>
        <table border={1} cellPadding={10} style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Visitors</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.month}</td>
                <td>{item.visitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
