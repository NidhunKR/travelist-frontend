import React, { useEffect, useState } from "react";

const API = "https://localhost:7036/api/Package";

function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(API, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Packages</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td>{pkg.title}</td>
              <td>{pkg.price}</td>
              <td>{pkg.destinationName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Packages;