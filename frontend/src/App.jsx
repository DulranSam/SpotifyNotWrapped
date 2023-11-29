import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [call, setCall] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function GetToken() {
      try {
        setLoading(true);
        const response = await Axios.post("http://localhost:8000/token");
        setCall(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    GetToken();
  }, []);

  async function fetchData(url) {
    try {
      setLoading(true);
      const response = await Axios.get(url, {
        params: {
          accessToken: token,
        },
      })
        .then((r) => {
          setData(r.data);
        })
        .catch((e) => {
          setData(e);
        });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const GetByArtist = (e) => {
    e.preventDefault();
    fetchData("http://localhost:8000/token/artist");
  };

  const GetByTrack = (e) => {
    e.preventDefault();
    fetchData("http://localhost:8000/token/tracks");
  };

  return (
    <>
      <p>Your token is {JSON.stringify(call)}</p>
      <form onSubmit={GetByArtist}>
        <input
          onChange={handleTokenChange}
          value={token}
          placeholder="Enter Token"
          type="text"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Artist Data"}
        </button>
      </form>
      <form onSubmit={GetByTrack}>
        <input
          onChange={handleTokenChange}
          placeholder="Enter Token"
          type="text"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Track Data"}
        </button>
        <p>{JSON.stringify(data)}</p>
      </form>
    </>
  );
}

export default App;
