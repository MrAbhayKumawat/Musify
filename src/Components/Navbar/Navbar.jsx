import { useState, useEffect } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Musify from "../Misify/Musify";
import "./Navbar.scss";

const Navbar = () => {
  const [query, setQuery] = useState("");
  // const [querydata, setQuerydata] = useState("");
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (toggle) {
      document.body.style.background = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.background = "white";
      document.body.style.color = "black";
    }
  }, [toggle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setQuerydata(query);
  };

    const handleChange = (e) => {
      setQuery(e.target.value);
    };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleNavClick = (navQuery) => {
    setQuery(navQuery);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand" style={{ color: "black" }}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEguX1L86V0mOR4xxAG6WBTK8fLW-ui08jU_GWNbZ6Tj3OrgIFmghkXAendVgpchccEs_lUW1yKLYh6FCrO9QPVDU0EbGQRY5SjT2S3jmxc4qTSzunECCmEyjN-v4qdMjABx9xMTWN34Faxnjx94nSK7h6Wh1qrsWmFPZxw8YBqRf48o0lvq3fqKz100VL-M/s320/Spotify_Logo__Community___1_-removebg-preview%20%281%29.png"
              alt="logo"
            />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0 " >
              <li className="nav-item">
                <a
                  className="nav-link active text-light"
                  aria-current="page"
                  href="/"
                  onClick={() => handleNavClick("hindi songs")}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-light"
                  href="#"
                  onClick={() => handleNavClick("Hindi")}
                >
                  Hindi
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-light"
                  href="#"
                  onClick={() => handleNavClick("Bollywood")}
                >
                  Bollywood
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-light"
                  href="#"
                  onClick={() => handleNavClick("Hollywood")}
                >
                  Hollywood
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-light"
                  href="#"
                  onClick={() => handleNavClick("Bhojpuri")}
                >
                  Bhojpuri
                </a>
              </li>
            </ul>
            <form
              className="d-flex mx-3"
              onSubmit={handleSubmit}
              role="search"
              style={{ width: "50%" }}
            >
              <input
                className="text-field form-control me-2"
                autoComplete="on"
                type="text"
                onChange={handleChange}
                placeholder="search song...."
                style={{ width: "100%" }}
                value={query}
              />
              <button className="btn btn-outline-success" type="submit" style={{background:"transparent",color:'white'}}>
                Search
              </button>{" "}
            </form>
            <div className="mode" onClick={handleToggle}>
              <div>
                {toggle ? (
                  <DarkModeIcon style={{ color: "white" }} />
                ) : (
                  <LightModeIcon style={{ color: "white" }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {query === "Hindi artist" && <h3>Trending Songs</h3>}

      <main>
        <Musify searchQuery={query || "Hindi song"} />
      </main>
    </>
  );
};

export default Navbar;
