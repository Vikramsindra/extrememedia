import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // custom styles for hover and colors

const Navbar = ({ isLoggedIn, onLogout, user }) => {
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState("info");
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      onLogout();
      navigate("/");
      setPopupMessage(data.message || "Logged out successfully");
      setPopupSeverity("success");
      setShowPopup(true);
    } catch (err) {
      setPopupMessage("Logout failed");
      setPopupSeverity("danger");
      setShowPopup(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{
          backgroundColor: "#1976d2",
          height: "70px",
          padding: "0 1rem",
        }}
      >
        <div className="container-fluid">
          {/* Brand */}
          <a
            className="navbar-brand d-flex align-items-center text-white"
            href="#"
            onClick={() => navigate("/")}
            style={{ fontWeight: "bold", fontSize: "1.6rem" }}
          >
            <i className="bi bi-check2-square me-2"></i>
            Extreme Media
          </a>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Centered Search Bar */}
            {isLoggedIn && (
              <form
                className="d-flex mx-auto my-2 my-lg-0"
                onSubmit={handleSearch}
                style={{ maxWidth: "600px", width: "100%" }} // increased width
              >
                <input
                  className="form-control form-control-sm me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="btn btn-light btn-sm"
                  type="submit"
                  style={{ fontWeight: 500, fontSize: "1rem" }}
                >
                  Search
                </button>
              </form>
            )}

            {/* Right-side buttons */}
            <div className="d-flex flex-column flex-lg-row ms-auto">
              {isLoggedIn ? (
                <>
                  {/* <button
                    className="btn custom-btn mb-2 mb-lg-0 ms-lg-2"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </button> */}

                  {/* {user?.role === "manager" || user?.role === "admin" ? (
                    <button
                      className="btn custom-btn mb-2 mb-lg-0 ms-lg-2"
                      onClick={() => navigate("/give-task")}
                    >
                      <i className="bi bi-plus-circle me-1"></i> Give Task
                    </button>
                  ) : (
                    <button
                      className="btn custom-btn mb-2 mb-lg-0 ms-lg-2"
                      onClick={() => navigate("/assign")}
                    >
                      <i className="bi bi-plus-circle me-1"></i> Assigned Task
                    </button>
                  )} */}

                  {/* {user?.role === "manager" || user?.role === "admin" ? (
                    <button
                      className="btn custom-btn mb-2 mb-lg-0 ms-lg-2"
                      onClick={() => navigate("/taskListing")}
                    >
                      <i className="bi bi-plus-circle me-1"></i> Task Queue
                    </button>
                  ) : (
                    <button
                      className="btn custom-btn mb-2 mb-lg-0 ms-lg-2"
                      onClick={() => navigate("/task")}
                    >
                      <i className="bi bi-plus-circle me-1"></i> Add Task
                    </button>
                  )} */}

                  <button
                    className="btn custom-btn-logout mb-2 mb-lg-0 ms-lg-2"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </>
              ) : (
                <button
                  className="btn custom-btn-logout mb-2 mb-lg-0 ms-lg-2"
                  onClick={() => navigate("/login")}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Popup / Alert */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{ zIndex: 1055, minWidth: "250px" }}
        >
          <div
            className={`alert alert-${popupSeverity} alert-dismissible fade show text-center`}
            role="alert"
          >
            {popupMessage}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowPopup(false)}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
