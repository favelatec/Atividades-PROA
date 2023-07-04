async function HandlePOST(request, response) {
  const { ammount } = JSON.parse(request.body);
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${ammount}`);
    const data = await res.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ message: "Error fetching data" });
  }
}

export default async function handler(request, response) {
  const requestMethod = request.method;
  if (requestMethod == "POST") return HandlePOST(request, response);
}
