import { normalizePositions } from "./stars.js";

export async function loadStars() {
    const response = await fetch("/starmap_data.json");

    const data = await response.json();

    return normalizePositions(data.stars);
}