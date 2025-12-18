import { Bookmark } from "lucide-react";

  const resources = [
    {
      name: 'Mobafire',
      url: 'https://www.mobafire.com/',
      description: 'Guides et builds LoL',
      icon: <Bookmark className="size-6" />,
      color: '#FF4500',
    },
    {
      name: 'DPM.LOL',
      url: 'https://dpm.lol/',
      description: 'Statistiques détaillées',
      icon: <Bookmark className="size-6" />,
      color: '#3B82F6',
    },
    {
      name: 'U.GG',
      url: 'https://u.gg/',
      description: 'Tier list & Stats',
      icon: <Bookmark className="size-6" />,
      color: '#8B5CF6',
    },
    {
      name: 'OP.GG',
      url: 'https://op.gg/',
      description: 'Analyses de matchs',
      icon: <Bookmark className="size-6" />,
      color: '#1EAEDB',
    },
  ];

  export { resources };