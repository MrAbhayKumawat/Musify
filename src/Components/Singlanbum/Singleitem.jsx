import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import "../Singlanbum/singleitem.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Musify from "../Misify/Musify";

function Singleitem() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [sdata, setDatas] = useState([]);
  const [quar, setQu]=useState();
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [token, setAccessToken] = useState(null);
  const audioRef = useRef();
  const musicPlayerRef = useRef();

  const clientId = "37c8b9df55cc45479d109473d0e36b62";
  const clientSecret = "21f4b6ad19394a24a3f03e3f0bf3995d";
  // SUGGESTIONN
  
  const fetchdatas = async () => {
    stopCurrentSong();

    try {
      const result = await fetch(
        `https://api.spotify.com/v1/search?q=${quar}&type=track&limit=30`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (result.ok) {
        const datass = await result.json();
          setDatas(datass.tracks.items);
          
    
      } else {
        console.error("Failed to fetch data from Spotify API.");
      }
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    }
  };
  
  
  // SUGGESTIN END 
  useEffect(() => {
    const getToken = async () => {
      try {
        const result = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
          },
          body: "grant_type=client_credentials",
        });

        if (result.ok) {
          const data = await result.json();
          setAccessToken(data.access_token);
        } else {
          console.error("Failed to retrieve access token.");
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchdata();
      setTimeout(() => {
        fetchdatas()

      }, 1000);
    }
  }, [token, location.state?.id]);

  const stopCurrentSong = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentSongIndex(null);
    }
  };

  const fetchdata = async () => {
    stopCurrentSong();

    try {
      const result = await fetch(
        `https://api.spotify.com/v1/tracks/${location.state.id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (result.ok) {
        const data = await result.json();
        setData([data]);
        setQu(data.name)
      } else {
        console.error("Failed to fetch data from Spotify API.");
      }
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    }
  };

  const togglePlay = async (index) => {
    if (currentSongIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    } else {
      if (isPlaying) {
        audioRef.current.pause();
      }

      const song = data[index];
      if (song && song.preview_url) {
        audioRef.current.src = song.preview_url;

        audioRef.current.oncanplay = async () => {
          try {
            await audioRef.current.play();
            setCurrentSongIndex(index);
            setIsPlaying(true);
          } catch (error) {
            console.error("Error playing audio:", error);
          }
        };

        audioRef.current.onended = () => {
          setCurrentSongIndex(null);
          setIsPlaying(false);
        };
      }
    }
  };

  const handleDocumentClick = (event) => {
    if (
      musicPlayerRef.current &&
      !musicPlayerRef.current.contains(event.target) &&
      !event.target.tagName.toLowerCase().match(/input|textarea/)
    ) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isPlaying]);

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
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0 ">
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
                placeholder="Search"
                style={{ width: "100%" }}
                value={query}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                style={{ background: "transparent", color: "white" }}
              >
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

      <div className="details-con">
        <div ref={musicPlayerRef} className="player">
          {data.map((element, index) => (
            <div className="single-card" key={element.id}>
              <div>
                <img
                  src={element.album.images[0].url}
                  alt="Song-img"
                  style={{
                    cursor: "pointer",
                    height: "300px",
                    width: "300px",
                    borderRadius: "5px",
                  }}
                  className="card-img-top"
                />
              </div>
              <div className="card-item">
                <div className="main-item">
                  <h1 className="card-title" style={{ letterSpacing: "3.5px" }}>
                    {element.name}
                  </h1>
                  <p className="card-text">
                    <strong> Artist: </strong>
                    {element.artists.map((artist) => (
                      <span key={artist.id}>{artist.name}</span>
                    ))}
                  </p>
                  <p style={{ paddingLeft: "5px" }}>
                    <strong> Duration : </strong>
                    <span> 29sec</span>
                  </p>

                  <button onClick={() => togglePlay(index)} className="btn"style={{width:"80%"}} >
                    {currentSongIndex === index && isPlaying ? (
                      <span>
                        Pause <PauseIcon style={{ fontSize: "1.8rem" }} />
                      </span>
                    ) : (
                      <span>
                        Play{" "}
                        <PlayArrowIcon
                          style={{ fontSize: "1.8rem", color: "black" }}
                        />
                      </span>
                    )}
                  </button>
                  <br />
                  <br />
                  {element.preview_url ? (
                    <a
                      href={element.preview_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn" style={{width:"80%"}}><CloudDownloadIcon/> Download</button>
                    </a>
                  ) : (
                    <p> This song is not available! </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <audio ref={audioRef} />
        </div>
        </div>
       
      <Musify/>
    </>
  );
}

export default Singleitem;
