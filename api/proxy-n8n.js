// /api/proxy-n8n.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  try {
    const forward = await fetch("http://192.168.1.143:5678/webhook/22ef7773-f885-4602-a20e-f3d9be96d735", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await forward.json();
    res.status(forward.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy failed", detail: err.message });
  }
}
