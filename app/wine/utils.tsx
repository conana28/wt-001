"use server";

export async function getWineTypes() {
  const response = await fetch("/api/utils/type");
  const data = await response.json();
  return data;
}
