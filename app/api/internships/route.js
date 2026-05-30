export async function GET() {
  try {
    const response = await fetch(
      "https://internshala.com/hiring/search",
      {
        cache: "no-store",
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const data = await response.json();

    const internships = Object.values(
      data.internships_meta || {}
    );

    return Response.json(internships);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to fetch internships" },
      { status: 500 }
    );
  }
}