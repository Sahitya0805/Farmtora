import { NextResponse } from 'next/server';
import axios from 'axios';

// simple handler that proxies the hard‑coded image to plant.id
export async function GET() {
  try {
    const response = await axios.post(
      'https://plant.id/api/v3/identification',
      {
        images: [
          "data:image/jpeg;base64,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"
        ],
      },
      {
        headers: {
          'Api-Key': process.env.PLANT_ID_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(error);
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: error.message };
    return new NextResponse(JSON.stringify(data), { status });
  }
}
