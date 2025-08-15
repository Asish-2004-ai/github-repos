export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed" });
    }

    const repos = await response.json();
    res.status(200).json(repos);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
}
