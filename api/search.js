import axios from "axios";

export default async function handler(req, res) {
  const { freeSearch } = req.query;

  if (!freeSearch) {
    return res.status(400).json({ error: "freeSearch parameter is required" });
  }

  const SERVICE_KEY = "CiGlq=w9k=LbHsVIvrXcCe2JN4GUocWTsYo0z9aOqq0=";
  const apiURL = "https://plus.kipris.or.kr/kipo-api/kipi/trademarkInfoSearchService/getAdvancedSearch";
  const fullURL = `${apiURL}?freeSearch=${encodeURIComponent(freeSearch)}&ServiceKey=${SERVICE_KEY}`;

  try {
    const response = await axios.get(fullURL);
    res.status(200).send(response.data);
  } catch (err) {
    console.error("KIPRIS API error:", err.message);
    res.status(500).json({
      error: "KIPRIS API 호출 실패",
      details: err.message
    });
  }
}
