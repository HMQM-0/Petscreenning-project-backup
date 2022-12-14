const axios = require("axios");

const ZAPIER_HOOK_ENDPOINT = "https://hooks.zapier.com/hooks/catch/13667700/bpmf9jp/";

const handler = async (req, res) => {
  try {
    const headers = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(
      `${ZAPIER_HOOK_ENDPOINT}`,
      {
        ...req.body,
      },
      headers,
    );
    return res.json(response.data);
  } catch (e) {
    res.status(400);
    res.json({ error: true, message: "Error sending tags..." });
  }
};

export default handler;
