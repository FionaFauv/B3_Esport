import { pb } from '@/lib/pocketbase';
import { Team, TeamCreateData } from '@/app/api/types';

export const CreateTeam = {
  /**
   * Crée une nouvelle équipe
   */
  async create(data: TeamCreateData): Promise<Team> {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('tag', data.tag);
      formData.append('country', data.country);
      formData.append('founded_year', data.founded_year.toString());
      
      if (data.logo_url) {
        formData.append('logo_url', data.logo_url);
      }

      const result = await pb.collection('Teams').create<Team>(formData);
      return result;
    } catch (error) {
      console.error('Erreur lors de la création de l\'équipe:', error);
      throw error;
    }
  }
};  