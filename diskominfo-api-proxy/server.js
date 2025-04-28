const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cors = require("cors");
const NodeCache = require("node-cache");

const app = express();
const PORT = 3001; // Port server proxy kamu

const myCache = new NodeCache(); // Membuat instance cache

app.use(cors()); // Biar React frontend bisa akses ke proxy server ini

// Endpoint proxy
app.get("/proxy", async (req, res) => {
  const { type } = req.query;

  let targetUrl = "";
  if (type === "kecamatan") {
    targetUrl =
      "http://api.samarindakota.go.id/api/v2/generate/data-monografi/monografi-kecamatan";
  } else if (type === "kelurahan") {
    targetUrl =
      "http://api.samarindakota.go.id/api/v2/generate/data-monografi/monografi-kelurahan";
  } else {
    return res.status(400).json({ error: "Invalid type" });
  }

  const cachedData = myCache.get(type);
  if (cachedData) {
    console.log("Returning cached data for", type);
    return res.json(cachedData);
  }

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ3MGZmNjZhNTI5MmFjZWNjZTRhN2Y2MGNmNjdiNmQwYzE4YTVhNjBjNTZiYzZjN2Q3MWQ0MGUwZGM4MjM3ODZiN2FiYTBkZGJlZDNkMTdhIn0.eyJhdWQiOiIzIiwianRpIjoiNDcwZmY2NmE1MjkyYWNlY2NlNGE3ZjYwY2Y2N2I2ZDBjMThhNWE2MGM1NmJjNmM3ZDcxZDQwZTBkYzgyMzc4NmI3YWJhMGRkYmVkM2QxN2EiLCJpYXQiOjE3NDU3Mzc1NDAsIm5iZiI6MTc0NTczNzU0MCwiZXhwIjoxNzc3MjczNTQwLCJzdWIiOiI4NDUiLCJzY29wZXMiOlsibW9ub2dyYWZpLWtlY2FtYXRhbiJdfQ.Ohe8d3gfsHa6uG1KLrLhC8LXqc7HK5KNwSxmKtAi3YOR1dXK44yEELwbWckwebVb_HLLDRcqVjWO_EZhU5rkrZhq65P4apGNkeVy4dklUipUbAq3Y944PfhU7y2BTNlm0lFlKxWAI2_0-otJ1kVzAMR6xFpVtCKhDq5-SYyPGe7A_ioLbqm_8_nneLs7AcH-jQf7fvI0c68Lp0TnLO90s2KLgHTz1Q5FGx7u2vvqK8gzXkvvCUJKQ05l1YPJdA3-hWyze-KwvXcXVQ0tHDu7G3CEDIveNNMoxAZW9cLM6q_hQpSUV7QoRrSrBukPkj03aiylHy6XI_0MwzGyinBGRHsI-Sxzuaa2Yba9diM94Jg-di7azuyMQBtmmN3JpKnInFdj4qEXYSBtbEXpAlKIQ-xUg08hJg6iWs3h5sWbuitxVLap2nm4weH3YiYLZMN8VFGogq6_Qj5FEuopnk-BGT9ngOTup8t3WhsXWU9jaXxl5uoL5tjdJGuxtqPSgl86TQXQIrP_tbPUGNp-8j8SEI5urOUXhXtxY7Hxr4tLypWFrj-yv7EKolbpjcJZoj66QZcIhtGwXwbzK5uxVuVmCyLeGfnJuJ6crRV-IrUtgjPLKAYushvbfIfNO9IZ5rUBCeRaLsd2k2IqVpGaWGxp7eO5jbb1wHy0uzXgDvPcoPw",
      },
    });

    const data = await response.json();
    console.log("Fetched status:", response.status);
    console.log("Fetched data:", data);

    myCache.set(type, data, 86400);

    res.json(data);
  } catch (error) {
    console.error("Error fetching API:", error);
    res.status(500).json({ error: error.message, details: error });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
