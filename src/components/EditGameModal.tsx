'use client';

import { useState, useEffect } from 'react';
import { EditGame } from '@/app/api/pocketbase/games/edit-game';
import type { Game, GameUpdateData } from '@/app/api/types';

interface EditGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  game: Game;
}

export default function EditGameModal({ isOpen, onClose, onSuccess, game }: EditGameModalProps) {
  const [formData, setFormData] = useState<GameUpdateData>({
    name: game.name,
    category: game.category,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Met à jour le formulaire quand le jeu change
  useEffect(() => {
    if (game) {
      setFormData({
        name: game.name,
        category: game.category,
      });
    }
  }, [game]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name?.trim() || !formData.category?.trim()) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await EditGame.update(game.id, formData);
      
      onSuccess();
    } catch (err) {
      console.error('Erreur lors de la modification du jeu:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la modification du jeu');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="meru-card max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="meru-title-component">Modifier le jeu</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="meru-btn inline-flex items-center justify-center hover:scale-110"
            style={{ padding: '0.5rem' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom du jeu */}
          <div>
            <label className="meru-label">
              Nom du jeu <span style={{ color: 'var(--primary)' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="meru-input"
              placeholder="Ex: League of Legends"
              required
              disabled={loading}
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="meru-label">
              Catégorie / Genre <span style={{ color: 'var(--primary)' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="meru-input"
              placeholder="Ex: MOBA, FPS, Battle Royale"
              required
              disabled={loading}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Type ou genre du jeu (MOBA, FPS, RTS, etc.)
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 meru-btn meru-btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 meru-btn meru-btn-primary inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Modification...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
