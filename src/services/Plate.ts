export async function loadPlates() {

  const res = await fetch("https://themealdb.com/api/json/v1/1/search.php?s");

  if (!res.ok) throw new Error("Request failed");

  const data = await res.json();
  return data.meals;
}