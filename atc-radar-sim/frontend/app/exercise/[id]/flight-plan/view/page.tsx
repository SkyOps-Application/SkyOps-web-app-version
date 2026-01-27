'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PageBackground } from '@/components/PageBackground';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

export default function ViewFlightPlanPage() {
  const params = useParams();
  const exerciseId = params.id;

  return (
    <PageBackground>
      <div className="min-h-screen pt-24 pb-32 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10 animate-fadeIn">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Exercise {exerciseId} Flight Plan
              </h1>
              <p className="text-[var(--text-secondary)]">
                View detailed flight information
              </p>
            </div>
            <Link href={`/exercise/${exerciseId}/flight-plan`}>
              <Button variant="secondary" size="sm">
                <Icon name="chevron-left" size={16} />
                Back
              </Button>
            </Link>
          </div>

          {/* Content */}
          <Card variant="elevated" padding="lg" className="animate-slideUp">
            {/* Flight Info Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wide mb-4">
                  Flight Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Callsign</span>
                    <span className="font-semibold text-white">HVN123</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Aircraft Type</span>
                    <span className="font-semibold text-white">B738</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Departure</span>
                    <span className="font-semibold text-white">VVNB</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[var(--text-muted)]">Destination</span>
                    <span className="font-semibold text-white">VVTS</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wide mb-4">
                  Flight Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Cruise FL</span>
                    <span className="font-semibold text-white">FL350</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Cruise Speed</span>
                    <span className="font-semibold text-white">450 kt</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">Squawk</span>
                    <span className="font-semibold text-white">2000</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[var(--text-muted)]">Route</span>
                    <span className="font-semibold text-white">VOMAY DCT HANOI</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Waypoints Table */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wide mb-4">
                Route Waypoints
              </h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Waypoint</th>
                      <th>Coordinates</th>
                      <th>Altitude</th>
                      <th>Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-semibold text-white">VOMAY</td>
                      <td>21°00&apos;N 105°48&apos;E</td>
                      <td>FL350</td>
                      <td>450 kt</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-white">HANOI</td>
                      <td>21°01&apos;N 105°51&apos;E</td>
                      <td>FL350</td>
                      <td>450 kt</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageBackground>
  );
}
