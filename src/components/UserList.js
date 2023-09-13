import React, { useState, useEffect } from "react";
import axios from "axios";

//Imports
import SearchUser from "./SearchUser";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Use axios to fetch data from the specified URL
    axios
      .get(`http://localhost:3001/`)
      .then((response) => {
        // Set the fetched data in the users state
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  //console.log(users);
  return (
    <div>
      <SearchUser data={users} />
    </div>
  );
}

export default UserList;
// {users.map((user) => (
//     <div key={user.id}>
//       <h2>
//         {user.first} {user.last}
//       </h2>
//       <p>Date of Birth: {user.dob}</p>
//       <p>Gender: {user.gender}</p>
//       <p>Email: {user.email}</p>
//       <img src={user.picture} alt={`${user.first} ${user.last}`} />
//       <p>Country: {user.country}</p>
//       <p>Description: {user.description}</p>
//     </div>
//   ))}
