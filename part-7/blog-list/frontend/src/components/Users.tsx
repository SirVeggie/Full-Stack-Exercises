import { useEffect, useState } from "react";
import { UserType } from "shared";
import { getAllUsers } from "../services/users";

export function Users() {
  const [users, setUsers] = useState([] as UserType[]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (
        <div key={(user as any).id}>
          <p>{user.name} ({user.username}) has created {user.blogs.length} blogs</p>
        </div>
      ))}
    </div>
  );
}

