import { NextResponse } from 'next/server';

const TWITCH_CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || '';
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET || '';

let accessToken = '';
let tokenExpiry = 0;

async function getAccessToken() {
  // Si le token est encore valide, on le retourne
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  // Sinon, on en demande un nouveau
  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    console.error('Erreur authentification Twitch:', await response.text());
    throw new Error('Impossible d\'obtenir le token Twitch');
  }

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // -1 minute de sécurité

  return accessToken;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId') || '21779'; // League of Legends par défaut
    const limit = searchParams.get('limit') || '6';

    console.log('Récupération des streams pour le jeu:', gameId);

    const token = await getAccessToken();
    console.log('Token obtenu:', token ? 'OK' : 'ERREUR');

    // Récupérer les streams
    const streamsResponse = await fetch(
      `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=${limit}&language=fr`,
      {
        headers: {
          'Client-ID': TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!streamsResponse.ok) {
      const errorText = await streamsResponse.text();
      console.error('Erreur API Twitch streams:', errorText);
      throw new Error('Erreur lors de la récupération des streams');
    }

    const streamsData = await streamsResponse.json();
    console.log('Nombre de streams trouvés:', streamsData.data.length);

    if (streamsData.data.length === 0) {
      return NextResponse.json([]);
    }

    // Récupérer les informations des utilisateurs
    const userIds = streamsData.data.map((stream: { user_id: string }) => stream.user_id).join('&id=');
    
    const usersResponse = await fetch(
      `https://api.twitch.tv/helix/users?id=${userIds}`,
      {
        headers: {
          'Client-ID': TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!usersResponse.ok) {
      console.error('Erreur API Twitch users');
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }

    const usersData = await usersResponse.json();

    // Combiner les données
    const streams = streamsData.data.map((stream: {
      id: string;
      user_id: string;
      user_name: string;
      user_login: string;
      game_id: string;
      game_name: string;
      title: string;
      viewer_count: number;
      started_at: string;
      thumbnail_url: string;
      language: string;
    }) => {
      const user = usersData.data.find((u: { id: string }) => u.id === stream.user_id);
      return {
        id: stream.id,
        userId: stream.user_id,
        userName: stream.user_name,
        userLogin: stream.user_login,
        gameId: stream.game_id,
        gameName: stream.game_name,
        title: stream.title,
        viewerCount: stream.viewer_count,
        startedAt: stream.started_at,
        thumbnailUrl: stream.thumbnail_url.replace('{width}', '440').replace('{height}', '248'),
        profileImageUrl: user?.profile_image_url || '',
        language: stream.language,
      };
    });

    console.log('Streams formatés:', streams.length);
    return NextResponse.json(streams);

  } catch (error) {
    console.error('Erreur dans l\'API route Twitch:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des streams' },
      { status: 500 }
    );
  }
}
