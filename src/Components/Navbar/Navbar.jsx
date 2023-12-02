import "./Navbar.scss";
import Musify from "../Misify/Musify";
import { useState } from "react";

const Navbar = () => {
  const [queary, setQuery] = useState("hindi songs"); // Fix the variable name here

  return (
    <>
      <header>
        <nav className="navbar ">
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEguX1L86V0mOR4xxAG6WBTK8fLW-ui08jU_GWNbZ6Tj3OrgIFmghkXAendVgpchccEs_lUW1yKLYh6FCrO9QPVDU0EbGQRY5SjT2S3jmxc4qTSzunECCmEyjN-v4qdMjABx9xMTWN34Faxnjx94nSK7h6Wh1qrsWmFPZxw8YBqRf48o0lvq3fqKz100VL-M/s320/Spotify_Logo__Community___1_-removebg-preview%20%281%29.png"
                alt="logo"
              ></img>
              <input
                className="text-field"
                type="text"
                onChange={(e) => setQuery(e.target.value)} // Fix the variable name here
                placeholder="What do you want to listen to?"
              />
            </form>
          </div>
        </nav>
      </header>
      {queary === "Hindi artist" ? <h3>Trending Songs</h3> : false}{" "}
      {/* Fix the prop name here */}
      <Musify searchQuery={queary} />
    </>
  );
};

export default Navbar;
