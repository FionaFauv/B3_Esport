import { pb } from '@/lib/pocketbase';
import { Team, TeamUpdateData } from '@/app/api/types';

export const EditTeam = {
  async update(id: string, data: TeamUpdateData): Promise<Team> {
    try {
      const formData = new FormData();
      
      if (data.name) formData.append('name', data.name);
      if (data.tag) formData.append('tag', data.tag);
      if (data.country) formData.append('country', data.country);
      if (data.founded_year) formData.append('founded_year', data.founded_year.toString());
      if (data.logo_url) formData.append('logo_url', data.logo_url);

      return await pb.collection('Teams').update<Team>(id, formData);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'équipe ${id}:`, error);
      throw error;
    }
  }
};
