export async function jsonRpc<T = any>(
  method: string,
  params: any
): Promise<T> {
  const payload = {
    jsonrpc: "2.0",
    id: "twocents",
    method,
    params,
  };

  console.log("Sending JSON-RPC payload:", payload);

  const response = await fetch("https://api.twocents.money/prod", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}
