'use client';

export default function ResourcesSidebar() {
  const resources = [
    {
      name: 'Mobafire',
      url: 'https://www.mobafire.com/',
      description: 'Guides et builds LoL',
      icon: '📖',
      color: '#FF4500',
    },
    {
      name: 'DPM.LOL',
      url: 'https://dpm.lol/',
      description: 'Statistiques détaillées',
      icon: '📊',
      color: '#3B82F6',
    },
    {
      name: 'U.GG',
      url: 'https://u.gg/',
      description: 'Tier list & Stats',
      icon: '🏆',
      color: '#8B5CF6',
    },
    {
      name: 'OP.GG',
      url: 'https://op.gg/',
      description: 'Analyses de matchs',
      icon: '🎮',
      color: '#1EAEDB',
    },
  ];

  return (
    <div className="w-full lg:w-80 space-y-4">
      {/* Header */}
      <div className="rounded-xl p-6 border" style={{ 
        backgroundColor: 'var(--background)', 
        borderColor: 'rgba(216, 121, 67, 0.3)',
        boxShadow: '0 0 20px rgba(216, 121, 67, 0.1)',
      }}>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2" style={{ 
          color: '#d87943',
          textShadow: '0 0 20px rgba(216, 121, 67, 0.5)',
        }}>
          <span>🎯</span>
          Ressources
        </h2>
        <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
          Les meilleurs sites pour progresser
        </p>
      </div>

      {/* Liste des ressources */}
      <div className="space-y-3">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl p-4 border transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            style={{ 
              backgroundColor: 'var(--background)', 
              borderColor: 'rgba(128, 128, 128, 0.2)',
            }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="text-3xl w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform"
                style={{ 
                  background: `${resource.color}20`,
                  boxShadow: `0 0 15px ${resource.color}20`,
                }}
              >
                {resource.icon}
              </div>
              <div className="flex-1">
                <h3 
                  className="font-bold mb-1 group-hover:text-[#d87943] transition-colors" 
                  style={{ color: 'var(--foreground)' }}
                >
                  {resource.name}
                </h3>
                <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                  {resource.description}
                </p>
              </div>
              <svg 
                className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: '#d87943' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Bannière info */}
      <div className="rounded-xl p-4 border" style={{ 
        backgroundColor: 'var(--background)', 
        borderColor: 'rgba(216, 121, 67, 0.3)',
        background: 'linear-gradient(135deg, rgba(216, 121, 67, 0.1) 0%, rgba(216, 121, 67, 0.05) 100%)',
      }}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold mb-1" style={{ color: '#d87943' }}>
              Astuce Pro
            </h4>
            <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              Utilisez ces outils pour analyser vos performances et celles de vos adversaires avant chaque match.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
