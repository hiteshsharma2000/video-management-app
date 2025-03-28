import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
   const navigate=useNavigate()

  useEffect(() => {
    fetchVideos();
  }, []);
  const fixFilename = (filename) => {
    // Remove any occurrence of "uploads" with trailing backslashes or forward slashes
    // and trim whitespace if any.
    return filename.replace(/uploads[\\\/]*/i, "").trim();
  };
  const fetchVideos = async () => {
    try {
      const response = await fetch("https://video-management-app-1-ch6j.onrender.com/video");
      const data = await response.json();
    //   console.log(data)
      if (response.ok) {
        setVideos([...data]);
        console.log(videos)
      } else {
        console.error("Error fetching videos:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Uploaded Videos</h2>
      
    <button onClick={()=>{navigate('/video/upload')}}>Upload video</button>
    <br />
    <br />
      {loading ? (
        <p>Loading videos...</p>
      ) : videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {videos.map((video, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
              <h4>{video.title}</h4>
              <video width="100%" controls>
              <source
        src={`https://video-management-app-1-ch6j.onrender.com/uploads/${video.filePath}`}
        type="video/mp4"
      />
                Your browser does not support the video tag.
              </video>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
