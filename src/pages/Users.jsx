import UserCard from "./components/UserCard";
import { useEffect, useState } from "react";
// import UserCard from "../components/UserCard";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [city, setCity] = useState("all");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then(data => setUsers(data.users || []))
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setUsers([]);
      });
  }, []);

  // safely compute lower-cased search once
  const searchLower = search.toLowerCase();

  const filteredUsers = users
    .filter((user) => {
      // Build full name safely
      const first = user?.firstName ?? "";
      const last = user?.lastName ?? "";
      const fullName = `${first} ${last}`.trim().toLowerCase();

      // if search empty, include all; otherwise check name includes
      if (!searchLower) return true;
      return fullName.includes(searchLower);
    })

    // Gender 
    .filter((user) => {
      if (gender === "all") return true;
      return user?.gender === gender;
    })

    // city
    .filter((user) => {
      if (city === "all") return true;
      return user?.address?.city === city;
    });

  // safe unique cities + include "all" first
  const uniqueCities = [
    "all",
    ...Array.from(
      new Set(
        users
          .map((u) => u?.address?.city)
          .filter(Boolean) // remove undefined/null/empty
      )
    ),
  ];

  return (
    <div className="users">
      <h1>User management dashboard</h1>
      <p>
        A web application to display users with search and filter options by name, gender, and city. Built using React JS and REST API.
      </p>


      {/* Search */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Gender Filter */}
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="all">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* City Filter */}
      <select value={city} onChange={(e) => setCity(e.target.value)} >

        {uniqueCities.map((c, i) => (
          <option key={i} value={c}>
            {c==='all'?'City':c}
          </option>
        ))}
      </select>

      <hr />

      {/* Show Users */}
      <div className="show-user" >
        {filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </div>
    </div>
  );
}
