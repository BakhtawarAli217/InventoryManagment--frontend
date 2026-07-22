import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <div className="nav-top">
        <h1>Logistic Hub</h1>
      </div>
      <div className="nav-routes">
        <ul>
          <li className={location.pathname === "/" ? "Active-Location" : ""}>
            <Link to="/">
              <p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 20C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V6.725C0.7 6.54167 0.458333 6.30417 0.275 6.0125C0.0916667 5.72083 0 5.38333 0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V5C20 5.38333 19.9083 5.72083 19.725 6.0125C19.5417 6.30417 19.3 6.54167 19 6.725V18C19 18.55 18.8042 19.0208 18.4125 19.4125C18.0208 19.8042 17.55 20 17 20H3V20M3 7V18V18V18H17V18V18V7H3V7M2 5H18V5V5V2V2V2H2V2V2V5V5V5V5M7 12H13V10H7V12V12M10 12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5"
                    fill="#57657B"
                  />
                </svg>
              </p>
              Inventory
            </Link>
          </li>
          <li
            className={location.pathname === "/brand" ? "Active-Location" : ""}
          >
            <Link to="/brand">
              <p>
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 13H17V7H8V13V13M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2V16M2 14H18V14V14V2V2V2H2V2V2V14V14V14V14M2 14V14V14V2V2V2V2V2V2V14V14V14V14V14"
                    fill="#515F74"
                  />
                </svg>
              </p>
              Brand
            </Link>
          </li>
          <li
            className={location.pathname === "/models" ? "Active-Location" : ""}
          >
            <Link to="/models">
              <p>
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 19.05L0 12.05L1.65 10.8L9 16.5L16.35 10.8L18 12.05L9 19.05V19.05M9 14L0 7L9 0L18 7L9 14V14M9 7V7V7V7V7V7M9 11.45L14.75 7L9 2.55L3.25 7L9 11.45V11.45"
                    fill="#515F74"
                  />
                </svg>
              </p>
              Models
            </Link>
          </li>
           <li
            className={location.pathname === "/category" ? "Active-Location" : ""}
          >
            <Link to="/category">
              <p>
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 19.05L0 12.05L1.65 10.8L9 16.5L16.35 10.8L18 12.05L9 19.05V19.05M9 14L0 7L9 0L18 7L9 14V14M9 7V7V7V7V7V7M9 11.45L14.75 7L9 2.55L3.25 7L9 11.45V11.45"
                    fill="#515F74"
                  />
                </svg>
              </p>
              Category
            </Link>
          </li>
          <li
            className={
              location.pathname === "/Add-inventory" ? "Active-Location" : ""
            }
          >
            <Link to="/Add-inventory">
              <p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 20C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V6.725C0.7 6.54167 0.458333 6.30417 0.275 6.0125C0.0916667 5.72083 0 5.38333 0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V5C20 5.38333 19.9083 5.72083 19.725 6.0125C19.5417 6.30417 19.3 6.54167 19 6.725V18C19 18.55 18.8042 19.0208 18.4125 19.4125C18.0208 19.8042 17.55 20 17 20H3V20M3 7V18V18V18H17V18V18V7H3V7M2 5H18V5V5V2V2V2H2V2V2V5V5V5V5M7 12H13V10H7V12V12M10 12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5"
                    fill="#57657B"
                  />
                </svg>
              </p>
              Add Inventory
            </Link>
          </li>
          <li
            className={
              location.pathname === "/Add-Category" ? "Active-Location" : ""
            }
          >
            <Link to="/Add-Category">
              <p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 20C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V6.725C0.7 6.54167 0.458333 6.30417 0.275 6.0125C0.0916667 5.72083 0 5.38333 0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V5C20 5.38333 19.9083 5.72083 19.725 6.0125C19.5417 6.30417 19.3 6.54167 19 6.725V18C19 18.55 18.8042 19.0208 18.4125 19.4125C18.0208 19.8042 17.55 20 17 20H3V20M3 7V18V18V18H17V18V18V7H3V7M2 5H18V5V5V2V2V2H2V2V2V5V5V5V5M7 12H13V10H7V12V12M10 12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5"
                    fill="#57657B"
                  />
                </svg>
              </p>
              Add Category
            </Link>
          </li>
          <li
            className={
              location.pathname === "/Add-Models" ? "Active-Location" : ""
            }
          >
            <Link to="/Add-Models">
              <p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 20C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V6.725C0.7 6.54167 0.458333 6.30417 0.275 6.0125C0.0916667 5.72083 0 5.38333 0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V5C20 5.38333 19.9083 5.72083 19.725 6.0125C19.5417 6.30417 19.3 6.54167 19 6.725V18C19 18.55 18.8042 19.0208 18.4125 19.4125C18.0208 19.8042 17.55 20 17 20H3V20M3 7V18V18V18H17V18V18V7H3V7M2 5H18V5V5V2V2V2H2V2V2V5V5V5V5M7 12H13V10H7V12V12M10 12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5"
                    fill="#57657B"
                  />
                </svg>
              </p>
              Add Model
            </Link>
          </li>

             <li
            className={
              location.pathname === "/Add-Brands" ? "Active-Location" : ""
            }
          >
            <Link to="/Add-Brands">
              <p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 20C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V6.725C0.7 6.54167 0.458333 6.30417 0.275 6.0125C0.0916667 5.72083 0 5.38333 0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V5C20 5.38333 19.9083 5.72083 19.725 6.0125C19.5417 6.30417 19.3 6.54167 19 6.725V18C19 18.55 18.8042 19.0208 18.4125 19.4125C18.0208 19.8042 17.55 20 17 20H3V20M3 7V18V18V18H17V18V18V7H3V7M2 5H18V5V5V2V2V2H2V2V2V5V5V5V5M7 12H13V10H7V12V12M10 12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5V12.5"
                    fill="#57657B"
                  />
                </svg>
              </p>
              Add Brand
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
