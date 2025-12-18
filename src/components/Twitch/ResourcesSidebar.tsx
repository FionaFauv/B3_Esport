'use client';

import { resources } from '@/lib/constants/resources';
import React from 'react';

export default function ResourcesSidebar() {

  return (
    <div className="meru-resources-sidebar">
      {/* Header */}
        <h2 className="meru-resources-title">
          <span>🎯</span>
          Ressources
        </h2>

      {/* Liste des ressources */}
      <div className="meru-resources-list">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="meru-resource-card"
          >
            <div className="meru-resource-content">
              <div 
                className="meru-resource-icon"
                style={{ 
                  background: `${resource.color}20`,
                  boxShadow: `0 0 15px ${resource.color}20`,
                }}
              >
                {resource.icon}
              </div>
              <div className="meru-resource-info">
                <h3 className="meru-resource-name">
                  {resource.name}
                </h3>
                <p className="meru-resource-description">
                  {resource.description}
                </p>
              </div>
              <svg 
                className="meru-resource-external" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
