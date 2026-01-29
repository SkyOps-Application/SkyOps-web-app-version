'use client';

import React from 'react';
import Link from 'next/link';
import { PageBackground } from '@/components/PageBackground';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

const exercises = [
  { id: 1, name: 'Exercise 1', hasFlightPlan: true },
  { id: 2, name: 'Exercise 2', hasFlightPlan: true },
  { id: 3, name: 'Exercise 3', hasFlightPlan: true },
];

export default function FlightPlanPage() {
  return (
    <PageBackground>
      <div className="min-h-screen pt-24 pb-32 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10 animate-fadeIn">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Flight Plans
              </h1>
              <p className="text-[var(--text-secondary)]">
                View and manage exercise flight plans
              </p>
            </div>
            <Link href="/home">
              <Button variant="secondary" size="sm">
                <Icon name="chevron-left" size={16} />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Exercise List */}
            <div className="lg:col-span-2 space-y-4">
              {exercises.map((exercise, index) => (
                <Card 
                  key={exercise.id}
                  variant="elevated" 
                  padding="md"
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold">{exercise.id}</span>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">{exercise.name}</h2>
                        <p className="text-sm text-[var(--text-muted)]">Flight plan available</p>
                      </div>
                    </div>
                    <Link 
                      href={`/exercise/${exercise.id}/flight-plan/view`}
                      className="btn-ghost flex items-center gap-2"
                    >
                      <span>View Plan</span>
                      <Icon name="chevron-right" size={16} />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {/* Add Exercise Sidebar */}
            <div className="lg:col-span-1">
              <Card 
                variant="elevated" 
                padding="lg" 
                className="sticky top-24 animate-fadeIn animate-delay-200"
              >
                <h2 className="text-xl font-bold text-white mb-4 text-center">
                  Add Exercise
                </h2>
                <p className="text-sm text-[var(--text-muted)] text-center mb-6">
                  Create a new exercise with custom flight plans
                </p>
                <Button variant="secondary" className="w-full">
                  <Icon name="chart" size={18} />
                  Add New Exercise
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
