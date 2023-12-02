import React, { useState, useEffect, useRef } from "react";
import "./Musify.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

function Musify(props) {
  const [data, setData] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [token, setAccessToken] = useState(null);
  const audioRef = useRef();

  const clientId = "37c8b9df55cc45479d109473d0e36b62";
  const clientSecret = "21f4b6ad19394a24a3f03e3f0bf3995d";
  const musicPlayerRef = useRef();

  useEffect(() => {
    const getToken = async () => {
      try {
        const result = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
          },
          body: "grant_type=" + encodeURIComponent("client_credentials"),
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
    if (token && props.searchQuery) {
      fetchdata();
    }
  }, [token, props.searchQuery]);

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
        `https://api.spotify.com/v1/search?q=${props.searchQuery}&type=track&limit=50`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (result.ok) {
        const data = await result.json();
        setData(data.tracks.items);
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
      // Pause the audio if it's already playing
      if (isPlaying) {
        audioRef.current.pause();
      }

      const song = data[index];
      if (song && song.preview_url) {
        audioRef.current.src = song.preview_url;

        // Listen for the canplay event before playing
        audioRef.current.oncanplay = async () => {
          try {
            await audioRef.current.play();
            setCurrentSongIndex(index);
            setIsPlaying(true);
          } catch (error) {
            console.error("Error playing audio:", error);
          }
        };

        // Listen for the ended event to change pause button to play button
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
      isPlaying
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

  return (
    <div ref={musicPlayerRef} className="music-player">
      {data.map((element, index) => (
        <div
          className="card"
          style={{
            width: "18rem",
            background: "black",
            color: "rgb(203, 191, 191)",
          }}
          key={element.id}
        >
          <img
            src={element.album.images[0].url}
            alt="Song-img"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{element.name}</h5>
            <p className="card-text">
              Artist: <span>{element.artists[0].name}</span>
            </p>

            <button onClick={() => togglePlay(index)}>
              {currentSongIndex === index && isPlaying ? (
                <span>
                  Pause <PauseIcon style={{ fontSize: "1.8rem" }} />
                </span>
              ) : (
                <span>
                  Play <PlayArrowIcon style={{ fontSize: "1.8rem" }} />
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
                <button>Download</button>
              </a>
            ) : (
              <p> This song is not available! </p>
            )}
          </div>
        </div>
      ))}
      <audio ref={audioRef} />
    </div>
  );
}

export default Musify;
