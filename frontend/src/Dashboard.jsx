// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./dashboard.css";

// const Dashboard = () => {
//   const [items, setItems] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [employeeRole, setEmployeeRole] = useState("");

//   const fetchItems = async () => {
//     const response = await axios.get("http://localhost:3001/api/items");
//     setItems(response.data);
//   };

//   const handleCreate = async () => {
//     await axios.post("http://localhost:3001/api/items", {
//       name,
//       description,
//       role: employeeRole,
//     });
//     fetchItems();
//     setName("");
//     setDescription("");
//   };

//   const handleUpdate = async () => {
//     await axios.put(`http://localhost:3001/api/items/${editingId}`, {
//       name,
//       description,
//       role: employeeRole,
//     });
//     fetchItems();
//     setName("");
//     setDescription("");
//     setEditingId(null);
//   };

//   const handleEdit = (item) => {
//     setName(item.name);
//     setDescription(item.description);
//     setEditingId(item._id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:3001/api/items/${id}`, {
//       role: employeeRole
//     });
//     fetchItems();
//   };

//   useEffect(() => {
//     const role = localStorage.getItem("employeeRole");
//     console.log("Employee Role:", role); // Check role value
//     setEmployeeRole(role);
//     fetchItems();
//   }, []);

//   return (
//     <div className="app-body">
//       <h1 className="page-title">Items</h1>

//       {/* Input fields for item creation and update */}
//       <input
//         type="text"
//         placeholder="Item Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Item Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       {employeeRole === "admin" && editingId ? (
//         <button className="action-button" onClick={handleUpdate}>
//           Update Item
//         </button>
//       ) : employeeRole === "admin" || employeeRole === "visitor" ? (
//         <button className="action-button" onClick={handleCreate}>
//           Create Item
//         </button>
//       ) : null}

//       <ul className="item-list">
//         {items.map((item) => (
//           <li key={item._id}>
//             {item.name} - {item.description}
//             {employeeRole === "admin" && (
//               <>
//                 <button
//                   className="action-button"
//                   onClick={() => handleEdit(item)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="delete-button"
//                   onClick={() => handleDelete(item._id)}
//                 >
//                   Delete
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { usePermissions } from "./Contexts/PermissionContext"; // Import the permissions context
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  const { ability } = usePermissions(); // Get ability (permissions)
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [employeeRole, setEmployeeRole] = useState("");

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:3001/api/items");
    setItems(response.data);
  };

  const handleCreate = async () => {
    await axios.post("http://localhost:3001/api/items", {
      name,
      description,
      role: employeeRole,
    });
    fetchItems();
    setName("");
    setDescription("");
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:3001/api/items/${editingId}`, {
      name,
      description,
    });
    fetchItems();
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/items/${id}`);
    fetchItems();
  };

  useEffect(() => {
    const role = localStorage.getItem("employeeRole");
    console.log("Employee Role:", role); // Check role value
    setEmployeeRole(role);
    fetchItems();
  }, []);

  return (
    <div className="app-body">
      <h1 className="page-title">Items</h1>

      {/* Conditionally show input fields */}
      {ability?.can("create", "Item") && (
        <>
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="action-button" onClick={handleCreate}>
            Create Item
          </button>
        </>
      )}

      <ul className="item-list">
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.description}
            {/* Conditionally render Edit and Delete buttons */}
            {ability?.can("update", "Item") && (
              <button
                className="action-button"
                onClick={() => {
                  setName(item.name);
                  setDescription(item.description);
                  setEditingId(item._id);
                }}
              >
                Edit
              </button>
            )}
            {ability?.can("delete", "Item") && (
              <button
                className="delete-button"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
