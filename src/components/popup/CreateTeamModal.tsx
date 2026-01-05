'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CreateTeam } from '@/app/api/pocketbase/team/create-team';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Helper pour formater les erreurs PocketBase
function formatPocketBaseError(err: unknown): string {
  if (err && typeof err === 'object' && 'data' in err) {
    const pbError = err as { 
      status: number; 
      message: string;
      data: { 
        data?: Record<string, { code: string; message: string }>;
        message?: string;
      } 
    };
    
    if (pbError.data?.data) {
      const errorMessages = Object.entries(pbError.data.data)
        .map(([field, error]) => `${field}: ${error.message}`)
        .join(', ');
      return `Erreur de validation: ${errorMessages}`;
    } else if (pbError.data?.message) {
      return pbError.data.message;
    } else {
      return `Erreur ${pbError.status}: ${pbError.message}`;
    }
  }
  
  return err instanceof Error ? err.message : 'Erreur lors de la création de l\'équipe';
}

export default function CreateTeamModal({ isOpen, onClose, onSuccess }: CreateTeamModalProps) {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [country, setCountry] = useState('');
  const [foundedYear, setFoundedYear] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier que c'est bien un PNG
      if (!file.type.includes('png')) {
        setError('Veuillez sélectionner un fichier PNG');
        return;
      }
      
      setLogo(file);
      
      // Créer une preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setName('');
    setTag('');
    setCountry('');
    setFoundedYear('');
    setLogo(null);
    setLogoPreview('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Appel à la fonction CreateTeam.create
      await CreateTeam.create({
        name,
        tag,
        country,
        founded_year: parseInt(foundedYear, 10),
        logo_url: logo || undefined,
      });
      
      console.log('Équipe créée avec succès');
      resetForm();
      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error('Erreur lors de la création:', err);
      setError(formatPocketBaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Créer une équipe</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Nom de l&apos;équipe *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ex: Karmine Corp"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Abréviation *
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ex: KC"
              maxLength={5}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Région *
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Sélectionner une région</option>
              <option value="EU">Europe (EU)</option>
              <option value="NA">Amérique du Nord (NA)</option>
              <option value="KR">Corée (KR)</option>
              <option value="CN">Chine (CN)</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Année de création *
            </label>
            <input
              type="number"
              value={foundedYear}
              onChange={(e) => setFoundedYear(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ex: 2020"
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">
              Logo de l&apos;équipe (PNG)
            </label>
            
            <div className="flex items-center gap-4">
              {logoPreview && (
                <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden relative">
                  <Image 
                    src={logoPreview} 
                    alt="Preview logo" 
                    fill
                    className="object-contain" 
                  />
                </div>
              )}
              
              <div className="flex-1">
                <input
                  type="file"
                  accept=".png,image/png"
                  onChange={handleLogoChange}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                />
                <p className="text-gray-400 text-sm mt-1">Fichier PNG uniquement</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-medium"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? 'Création...' : 'Créer l\'équipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}