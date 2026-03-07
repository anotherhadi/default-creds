import type { APIRoute } from "astro";
import { getAllData } from "./search";

export const GET: APIRoute = async () => {
  try {
    const allEntries = getAllData();

    const uniqueManufacturers = new Set(
      allEntries.map((entry) => entry.manufacturer),
    );

    return new Response(
      JSON.stringify({
        totalApps: uniqueManufacturers.size,
        totalPasswords: allEntries.length,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      },
    );
  } catch (error) {
    console.error("Error generating stats:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
