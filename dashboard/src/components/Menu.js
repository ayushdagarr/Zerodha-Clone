import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState("USERID");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3002/getUser", {
          withCredentials: true,
        });

        if (res.data.status) {
          setUsername(res.data.user); // real username
        }
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };

    fetchUser();
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3002/logout",
        {},
        { withCredentials: true }
      );

      if (data.success) {
        window.location.href = "http://localhost:3000";
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // avatar ke 2 letters auto
  const avatarText = username
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />

      <div className="menus">
        <ul>
          <li>
            <Link to="/" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/orders" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/positions" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/funds" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link to="/apps" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(5)}>
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>

        <hr />

        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{avatarText}</div>
          <p className="username">{username}</p>
        </div>

       {isProfileDropdownOpen && (
  <div className="position-absolute end-0 mt-2 p-2 bg-white rounded shadow">
    <button
      className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
      onClick={handleLogout}
    >
      <span>🚪</span>
      Logout
    </button>
  </div>
        )}
      </div>
    </div>
  );
};

export default Menu;