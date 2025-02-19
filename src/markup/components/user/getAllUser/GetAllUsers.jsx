import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../service/user.service";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // 3. Set loading state

      try {
        const data = await getAllUsers(); // 1. Call the service
        setUsers(data.data); // Set the users in state
      } catch (err) {
        setError(err.message); // 2. Handle errors
        console.error("Component Error:", err);
      } finally {
        setLoading(false); // 3. Set loading to false
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5 font-sans">
      {/* 4. Display data */}
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul className="list-disc pl-5">
        {users?.map((user) => (
          <li key={user.user_id} className="mb-2">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUsers;
