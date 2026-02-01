export default function Users() {
  const users = [
    { id: 1, name: "Rahul", email: "rahul@test.com" },
    { id: 2, name: "Amit", email: "amit@test.com" },
    { id: 3, name: "Suresh", email: "suresh@test.com" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users Management</h1>

      <table
        border={1}
        cellPadding={10}
        style={{ marginTop: "20px", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
