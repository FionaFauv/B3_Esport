'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Stream {
  id: string;
  userId: string;
  userName: string;
  userLogin: string;
  title: string;
  viewerCount: number;
  thumbnailUrl: string;
  profileImageUrl: string;
  gameName: string;
}

export default function TwitchLiveStreams() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetch('/api/twitch/streams?gameId=21779&limit=6');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des streams');
        }
        const data = await response.json();
        setStreams(data);
      } catch (error) {
        console.error('Erreur lors du chargement des streams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();
    
    // Rafraîchir toutes les 2 minutes
    const interval = setInterval(fetchStreams, 120000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d87943]"></div>
      </div>
    );
  }

  if (streams.length === 0) {
    return (
      <div className="text-center py-20">
        <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>
          Aucun stream français en direct pour le moment
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {streams.map((stream) => (
        <a
          key={stream.id}
          href={`https://twitch.tv/${stream.userLogin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
        >
          {/* Thumbnail */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={stream.thumbnailUrl}
              alt={stream.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Badge LIVE */}
            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-md font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
            {/* Viewers */}
            <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
              👁️ {stream.viewerCount.toLocaleString()}
            </div>
            {/* Overlay au hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Informations */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#d87943]">
                {stream.profileImageUrl ? (
                  <Image
                    src={stream.profileImageUrl}
                    alt={stream.userName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#d87943] flex items-center justify-center text-white font-bold">
                    {stream.userName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* Titre du stream */}
                <h3 
                  className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-[#d87943] transition-colors" 
                  style={{ color: 'var(--foreground)' }}
                >
                  {stream.title}
                </h3>
                
                {/* Nom du streamer */}
                <p className="text-sm font-medium" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                  {stream.userName}
                </p>
                
                {/* Jeu */}
                <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                  {stream.gameName}
                </p>
              </div>
            </div>
          </div>

          {/* Logo Twitch */}
          <div className="absolute bottom-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#9146FF' }}>
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
          </div>
        </a>
      ))}
    </div>
  );
}
