const url = 'https://www.themealdb.com/api/json/v1/1';


export async function loadPlates() {

  const res = await fetch(`${url}/filter.php?a=italian`);

  if (!res.ok) throw new Error("Request failed");

  const data = await res.json();
  return data.meals;
}


export async function loadPlateById(id: string) {

  const res = await fetch(`${url}/lookup.php?i=${id}`);

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  return data.meals[0];
}