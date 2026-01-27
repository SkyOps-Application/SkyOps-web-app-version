'use client';

import React from 'react';
import { PageBackground } from '@/components/PageBackground';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';

const sections = [
  {
    number: 1,
    title: 'Basic Controls',
    gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
    items: [
      { key: 'Click', description: 'Select an aircraft to view its details and issue commands.' },
      { key: 'Drag', description: 'Pan across the radar screen to view different sectors.' },
      { key: 'Scroll', description: 'Zoom in and out of the radar scope.' },
    ],
  },
  {
    number: 2,
    title: 'ATC Commands',
    gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
    commands: [
      {
        name: 'Altitude Control',
        syntax: 'CLIMB TO FLIGHT LEVEL [XXX]',
        description: 'Instructs aircraft to change altitude. Example: FL 350 for 35,000 ft.',
      },
      {
        name: 'Heading Control',
        syntax: 'TURN [LEFT/RIGHT] HEADING [XXX]',
        description: 'Vectors the aircraft to a specific magnetic heading (000-360).',
      },
      {
        name: 'Speed Control',
        syntax: 'SPEED [XXX] KNOTS',
        description: 'Adjusts the indicated airspeed of the aircraft.',
      },
    ],
  },
  {
    number: 3,
    title: 'Separation Rules',
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    rules: [
      { text: 'Maintain minimal vertical separation of', highlight: '1000 ft' },
      { text: 'Maintain minimal horizontal separation of', highlight: '3 NM (Nautical Miles)' },
      { text: 'Ensure aircraft do not enter restricted zones', highlight: null },
    ],
  },
];

export default function InstructionsPage() {
  return (
    <PageBackground>
      <div style={{ 
        minHeight: '100vh', 
        paddingTop: '100px', 
        paddingBottom: '60px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '48px' }}>
            <h1 style={{ 
              fontSize: '42px', 
              fontWeight: 700, 
              color: 'white',
              marginBottom: '16px',
            }}>
              Radar Instructions
            </h1>
            <p style={{ fontSize: '18px', color: '#9ca3af', lineHeight: 1.6 }}>
              Learn the essential controls and commands for air traffic control operations.
            </p>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {sections.map((section) => (
              <Card key={section.number} variant="elevated" padding="lg">
                {/* Section Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: section.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'white',
                  }}>
                    {section.number}
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>{section.title}</h2>
                </div>

                {/* Basic Controls */}
                {section.items && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {section.items.map((item) => (
                      <div key={item.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{
                          background: '#111827',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          minWidth: '80px',
                          textAlign: 'center',
                        }}>
                          <span style={{ fontFamily: 'monospace', color: '#f59e0b', fontWeight: 500, fontSize: '14px' }}>
                            {item.key}
                          </span>
                        </div>
                        <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6, paddingTop: '8px' }}>
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Commands */}
                {section.commands && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {section.commands.map((cmd, i) => (
                      <div 
                        key={cmd.name} 
                        style={{ 
                          paddingTop: i > 0 ? '24px' : 0,
                          borderTop: i > 0 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                        }}
                      >
                        <h3 style={{ fontWeight: 600, color: '#f59e0b', marginBottom: '12px' }}>
                          {cmd.name}
                        </h3>
                        <code style={{
                          display: 'block',
                          background: '#111827',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          padding: '14px 18px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontFamily: 'monospace',
                          color: '#fbbf24',
                          marginBottom: '12px',
                        }}>
                          {cmd.syntax}
                        </code>
                        <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6 }}>
                          {cmd.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rules */}
                {section.rules && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
                    {section.rules.map((rule, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#9ca3af' }}>
                        <Icon name="check" size={18} className="text-emerald-500" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '14px', lineHeight: 1.6 }}>
                          {rule.text}
                          {rule.highlight && (
                            <strong style={{ color: 'white', marginLeft: '4px' }}>{rule.highlight}</strong>
                          )}
                          .
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
