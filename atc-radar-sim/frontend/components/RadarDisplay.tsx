/**
 * Main radar display component using Konva
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Circle, Line, Text, Group, Rect, RegularPolygon } from 'react-konva';
import { useAircraftStore } from '@/lib/store/aircraft-store';
import { useUIStore } from '@/lib/store/ui-store';
import { AircraftData } from '@atc-radar-sim/shared';
import { latLngToScreen, screenToLatLng, RADAR_COLORS } from '@atc-radar-sim/shared';
import { WAYPOINTS, ROUTES } from '@atc-radar-sim/shared/src/data/waypoints';
import { EXERCISE_1, EXERCISE_2 } from '@atc-radar-sim/shared/src/data/exercises';

interface RadarDisplayProps {
  width: number;
  height: number;
}

export function RadarDisplay({ width, height }: RadarDisplayProps) {
  const aircraft = useAircraftStore((state) => state.aircraft);
  const selectedAircraftId = useAircraftStore((state) => state.selectedAircraftId);
  const selectAircraft = useAircraftStore((state) => state.selectAircraft);
  const updateAircraft = useAircraftStore((state) => state.updateAircraft);
  
  const { radarSettings } = useUIStore();
  const { center, zoom, showGrid, showVectors } = radarSettings;
  
  // Measurement tool state
  const [measurementStart, setMeasurementStart] = useState<{ x: number; y: number } | null>(null);
  const [measurementEnd, setMeasurementEnd] = useState<{ x: number; y: number } | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  
  // Waypoint labels toggle
  const [showWaypointLabels, setShowWaypointLabels] = useState(true);
  
  // Airway routes toggle
  const [showAirwayRoutes, setShowAirwayRoutes] = useState(true);
  
  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        // Zoom in
        const newZoom = Math.min(8.0, zoom + 0.1);
        useUIStore.getState().setZoom(newZoom);
      } else if (e.key === '-' || e.key === '_') {
        // Zoom out
        const newZoom = Math.max(0.5, zoom - 0.1);
        useUIStore.getState().setZoom(newZoom);
      } else if (e.key === '0') {
        // Reset zoom
        useUIStore.getState().setZoom(1.0);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [zoom]);
  
  const stageRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Prevent page scroll when interacting with map
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('canvas')) {
        e.preventDefault();
      }
    };
    
    window.addEventListener('wheel', preventScroll, { passive: false });
    return () => window.removeEventListener('wheel', preventScroll);
  }, []);
  
  // Handle wheel zoom - slower for better control
  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    e.evt.stopPropagation();
    
    // Smaller zoom delta for smoother, more controlled zooming
    const zoomDelta = e.evt.deltaY > 0 ? -0.05 : 0.05;
    const newZoom = Math.max(0.5, Math.min(8.0, zoom + zoomDelta));
    useUIStore.getState().setZoom(newZoom);
  };
  
  // Handle drag to pan
  const handleMouseDown = (e: any) => {
    if (e.evt.button === 0) { // Left click
      const stage = e.target.getStage();
      const pointerPos = stage.getPointerPosition();
      
      // If not clicking on an aircraft/waypoint, check for measurement or pan
      if (e.target === e.target.getStage() || e.target.getLayer) {
        if (e.evt.shiftKey) {
          // Shift + click = start measurement
          setMeasurementStart(pointerPos);
          setMeasurementEnd(pointerPos);
          setIsMeasuring(true);
        } else {
          // Regular click = pan
          setIsDragging(true);
          setDragStart({ x: e.evt.clientX, y: e.evt.clientY });
        }
      }
      e.evt.preventDefault();
    }
  };
  
  const handleMouseMove = (e: any) => {
    if (isMeasuring && measurementStart) {
      // Update measurement end point
      const stage = e.target.getStage();
      const pointerPos = stage.getPointerPosition();
      setMeasurementEnd(pointerPos);
    } else if (isDragging) {
      const dx = e.evt.clientX - dragStart.x;
      const dy = e.evt.clientY - dragStart.y;
      
      // Much slower pan sensitivity for precise control
      const panSensitivity = 0.06 / zoom;
      const newCenter = {
        latitude: center.latitude + dy * panSensitivity, // Fixed: + instead of -
        longitude: center.longitude - dx * panSensitivity, // Fixed: - instead of +
      };
      
      useUIStore.getState().setRadarCenter(newCenter);
      setDragStart({ x: e.evt.clientX, y: e.evt.clientY });
      e.evt.preventDefault();
    }
  };
  
  const handleMouseUp = () => {
    if (isMeasuring) {
      // End measurement
      setIsMeasuring(false);
      setMeasurementStart(null);
      setMeasurementEnd(null);
    }
    setIsDragging(false);
  };
  
  // Format altitude display according to project.md rules
  const formatAltitude = (altitude: number): string => {
    if (altitude >= 10000) {
      // Display as FL + 3 digits
      return `FL${Math.round(altitude / 100)}`;
    } else {
      // Display as 2 digits (divided by 100)
      return `${Math.round(altitude / 100)}`;
    }
  };
  
  // Render grid
  const renderGrid = () => {
    if (!showGrid) return null;
    
    const gridLines: React.ReactElement[] = [];
    const gridSpacing = 50; // pixels
    
    // Vertical lines
    for (let x = 0; x < width; x += gridSpacing) {
      gridLines.push(
        <Line
          key={`vgrid-${x}`}
          points={[x, 0, x, height]}
          stroke={RADAR_COLORS.GRID}
          strokeWidth={1}
          dash={[5, 5]}
        />
      );
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += gridSpacing) {
      gridLines.push(
        <Line
          key={`hgrid-${y}`}
          points={[0, y, width, y]}
          stroke={RADAR_COLORS.GRID}
          strokeWidth={1}
          dash={[5, 5]}
        />
      );
    }
    
    return <>{gridLines}</>;
  };
  
  // Render airway routes (thin white lines)
  const renderAirwayRoutes = () => {
    const routes: React.ReactElement[] = [];
    
    // Helper to get waypoint by name
    const getWaypoint = (name: string) => WAYPOINTS.find(w => w.id === name || w.name === name);
    
    // Render each airway route
    Object.entries(ROUTES).forEach(([routeName, waypointNames]) => {
      const points: number[] = [];
      
      for (const name of waypointNames) {
        const waypoint = getWaypoint(name);
        if (waypoint) {
          const pos = latLngToScreen(
            { latitude: waypoint.latitude, longitude: waypoint.longitude },
            center,
            zoom,
            { width, height }
          );
          points.push(pos.x, pos.y);
        }
      }
      
      if (points.length >= 4) { // At least 2 points
        routes.push(
          <Line
            key={`airway-${routeName}`}
            points={points}
            stroke="rgba(255, 255, 255, 0.3)" // Light white
            strokeWidth={1}
            lineCap="round"
            lineJoin="round"
          />
        );
      }
    });
    
    return routes;
  };
  
  // Render boundary line (purple)
  const renderBoundary = () => {
    const boundaryWaypoints = [
      'CAMPU', 'POPET', 'GONLY', 'PLK', 'PCA', 'VEPAM', 
      'KARAN', 'PTH', 'ELSAS', 'CN', 'BIBAN', 'PQU', 'CAMPU' // Close the loop
    ];
    
    const points: number[] = [];
    
    for (const name of boundaryWaypoints) {
      const waypoint = WAYPOINTS.find(w => w.id === name || w.name === name);
      if (waypoint) {
        const pos = latLngToScreen(
          { latitude: waypoint.latitude, longitude: waypoint.longitude },
          center,
          zoom,
          { width, height }
        );
        points.push(pos.x, pos.y);
      }
    }
    
    if (points.length >= 4) {
      return (
        <Line
          key="boundary"
          points={points}
          stroke="#9333EA" // Purple
          strokeWidth={2}
          opacity={0.8}
          lineCap="round"
          lineJoin="round"
        />
      );
    }
    return null;
  };
  
  // Render routes for exercises
  const renderRoutes = () => {
    const routes: React.ReactElement[] = [];
    
    // Helper to get waypoint by name
    const getWaypoint = (name: string) => WAYPOINTS.find(w => w.id === name || w.name === name);
    
    // Helper to render a single route
    const renderRoute = (waypointNames: string[], key: string) => {
      const points: number[] = [];
      
      for (const name of waypointNames) {
        const waypoint = getWaypoint(name);
        if (waypoint) {
          const pos = latLngToScreen(
            { latitude: waypoint.latitude, longitude: waypoint.longitude },
            center,
            zoom,
            { width, height }
          );
          points.push(pos.x, pos.y);
        }
      }
      
      if (points.length >= 4) { // At least 2 points
        return (
          <Line
            key={key}
            points={points}
            stroke="rgba(255, 255, 255, 0.3)" // Light white like airway routes
            strokeWidth={1}
            lineCap="round"
            lineJoin="round"
          />
        );
      }
      return null;
    };
    
    // Collect all unique routes from both exercises
    const exerciseRoutes = new Map<string, string[]>();
    
    // Exercise 1 routes - white color
    EXERCISE_1.aircraft.forEach((ac, idx) => {
      const routeKey = ac.route.join('-');
      if (!exerciseRoutes.has(routeKey)) {
        exerciseRoutes.set(routeKey, ac.route);
        routes.push(renderRoute(ac.route, `ex1-route-${idx}`) as React.ReactElement);
      }
    });
    
    // Exercise 2 routes - white color
    EXERCISE_2.aircraft.forEach((ac, idx) => {
      const routeKey = ac.route.join('-');
      if (!exerciseRoutes.has(routeKey)) {
        exerciseRoutes.set(routeKey, ac.route);
        routes.push(renderRoute(ac.route, `ex2-route-${idx}`) as React.ReactElement);
      }
    });
    
    return routes.filter(r => r !== null);
  };
  
  // Render waypoints
  const renderWaypoints = () => {
    return WAYPOINTS.map((waypoint) => {
      const pos = latLngToScreen(
        { latitude: waypoint.latitude, longitude: waypoint.longitude },
        center,
        zoom,
        { width, height }
      );
      
      // Skip if out of bounds
      if (pos.x < -50 || pos.x > width + 50 || pos.y < -50 || pos.y > height + 50) {
        return null;
      }
      
      return (
        <Group key={waypoint.id}>
          {/* Hollow triangle */}
          <RegularPolygon
            x={pos.x}
            y={pos.y}
            sides={3}
            radius={6}
            rotation={0} // Point up
            stroke="#FFD43B"
            strokeWidth={1.5}
            fill="transparent"
          />
          
          {/* Waypoint name - conditionally rendered */}
          {showWaypointLabels && (
            <Text
              x={pos.x + 10}
            y={pos.y - 6}
            text={waypoint.name}
            fontSize={10}
            fill="#FFD43B"
            fontFamily="monospace"
            />
          )}
        </Group>
      );
    });
  };
  
  // Render measurement tool (purple distance/heading line)
  const renderMeasurementTool = () => {
    if (!measurementStart || !measurementEnd) return null;
    
    // Convert screen coords to internal coords to calculate distance
    const startInternal = screenToLatLng(measurementStart, center, zoom, { width, height });
    const endInternal = screenToLatLng(measurementEnd, center, zoom, { width, height });
    
    // Calculate distance in NM
    const dx = endInternal.longitude - startInternal.longitude;
    const dy = endInternal.latitude - startInternal.latitude;
    const distanceNM = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate heading (0 = North, 90 = East)
    let heading = Math.atan2(dx, dy) * (180 / Math.PI);
    if (heading < 0) heading += 360;
    
    // Label position (midpoint of line)
    const labelX = (measurementStart.x + measurementEnd.x) / 2;
    const labelY = (measurementStart.y + measurementEnd.y) / 2;
    
    return (
      <Group>
        {/* Purple measurement line */}
        <Line
          points={[measurementStart.x, measurementStart.y, measurementEnd.x, measurementEnd.y]}
          stroke="#9C27B0"
          strokeWidth={2}
        />
        
        {/* Distance and heading label */}
        <Group x={labelX} y={labelY}>
          <Text
            x={5}
            y={-15}
            text={`${distanceNM.toFixed(1)}NM`}
            fontSize={12}
            fill="#9C27B0"
            fontFamily="monospace"
            fontStyle="bold"
          />
          <Text
            x={5}
            y={0}
            text={`H${Math.round(heading).toString().padStart(3, '0')}`}
            fontSize={11}
            fill="#9C27B0"
            fontFamily="monospace"
            fontStyle="bold"
          />
        </Group>
      </Group>
    );
  };
  
  // Render aircraft with improved visual design
  const renderAircraft = (ac: AircraftData) => {
    const pos = latLngToScreen(
      { latitude: ac.position.latitude, longitude: ac.position.longitude },
      center,
      zoom,
      { width, height }
    );
    
    // Determine colors based on state
    const isOutOfBoundary = ac.outOfBoundary || false;
    const isConflict = ac.conflict || false;
    const isIdentified = ac.identified || false;
    
    let markerColor = '#FFFFFF'; // White = not identified
    let labelColor = '#E08A00'; // Orange label text
    
    if (isOutOfBoundary) {
      markerColor = '#E53935'; // Red = out of boundary
      labelColor = '#E53935'; // Red label text
    } else if (isConflict) {
      markerColor = '#E53935'; // Red = conflict
      labelColor = '#E53935'; // Red label text
    } else if (isIdentified) {
      markerColor = '#00FF00'; // Green = identified
      labelColor = '#E08A00'; // Orange label text (stays orange)
    }
    
    const isSelected = ac.id === selectedAircraftId;
    const squareSize = 6;
    
    // Heading line (vertical, showing track/heading) - 5 NM long
    const headingLength = 5 * zoom * 5; // 5 NM * scale
    const headingRad = (ac.heading * Math.PI) / 180;
    const headingEndX = pos.x + Math.sin(headingRad) * headingLength;
    const headingEndY = pos.y - Math.cos(headingRad) * headingLength;
    
    // Label position with circular rotation around aircraft
    const labelDistance = 35; // Distance from aircraft center
    const labelRotation = ac.labelRotation !== undefined ? ac.labelRotation : 45; // Default: 45 degrees (bottom-right)
    const labelAngle = (labelRotation * Math.PI) / 180;
    const labelX = pos.x + Math.cos(labelAngle) * labelDistance;
    const labelY = pos.y + Math.sin(labelAngle) * labelDistance;
    
    return (
      <Group
        key={ac.id}
        onClick={() => selectAircraft(ac.id)}
        onTap={() => selectAircraft(ac.id)}
        onContextMenu={(e) => {
          e.evt.preventDefault();
          // Right-click rotates entire label by 15 degrees
          const currentRotation = ac.labelRotation !== undefined ? ac.labelRotation : 45;
          updateAircraft({
            ...ac,
            labelRotation: (currentRotation + 15) % 360,
          });
        }}
      >
        {/* Heading line (solid, shows track) */}
        <Line
          points={[pos.x, pos.y, headingEndX, headingEndY]}
          stroke={markerColor}
          strokeWidth={2}
        />
        
        {/* Dashed line to label */}
        <Line
          points={[pos.x, pos.y, labelX, labelY]}
          stroke={markerColor}
          strokeWidth={1}
          dash={[4, 4]}
        />
        
        {/* Aircraft square marker */}
        <Rect
          x={pos.x - squareSize / 2}
          y={pos.y - squareSize / 2}
          width={squareSize}
          height={squareSize}
          fill={markerColor}
          stroke={isSelected ? '#00FFFF' : markerColor}
          strokeWidth={isSelected ? 2 : 0}
        />
        
        {/* Data label (3 lines of text) */}
        <Group x={labelX} y={labelY}>
          {/* Line 1: Callsign */}
          <Text
            x={0}
            y={-18}
            text={ac.callsign}
            fontSize={12}
            fill={labelColor}
            fontFamily="monospace"
            fontStyle="bold"
          />
          
          {/* Line 2: Flight Level */}
          <Text
            x={0}
            y={-6}
            text={formatAltitude(ac.position.altitude)}
            fontSize={11}
            fill={labelColor}
            fontFamily="monospace"
          />
          
          {/* Line 3: Speed - Mach */}
          <Text
            x={0}
            y={6}
            text={`${Math.round(ac.speed)} - ${ac.machNumber?.toFixed(2) || '0.00'}`}
            fontSize={10}
            fill={labelColor}
            fontFamily="monospace"
          />
        </Group>
      </Group>
    );
  };
  
  return (
    <div 
      className="relative w-full h-full bg-[#0C2D57] overflow-hidden"
      style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
      onWheel={(e) => e.preventDefault()}
    >
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Layer>
          {/* Grid */}
          {renderGrid()}
          
          {/* Airway routes (thin white lines) - render first in background */}
          {showAirwayRoutes && renderAirwayRoutes()}
          
          {/* Boundary line (purple) */}
          {showAirwayRoutes && renderBoundary()}
          
          {/* Exercise routes - render behind waypoints and aircraft */}
          {showAirwayRoutes && renderRoutes()}
          
          {/* Waypoints */}
          {renderWaypoints()}
          
          {/* Aircraft */}
          {aircraft.map(renderAircraft)}
          
          {/* Measurement tool (on top) */}
          {renderMeasurementTool()}
        </Layer>
      </Stage>
      
      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 px-3 py-2 rounded text-white text-sm font-mono">
        Zoom: {zoom.toFixed(1)}x | Center: {center.latitude.toFixed(0)}, {center.longitude.toFixed(0)}
      </div>
      
      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 px-4 py-3 rounded text-white text-xs">
        <p className="text-yellow-300 font-semibold mb-1 text-sm">Map Controls:</p>
        <p className="text-white">• Scroll wheel or +/- keys: Zoom in/out</p>
        <p className="text-white">• Click & drag: Pan map</p>
        <p className="text-white">• Shift + Click & drag: Measure distance</p>
        <p className="text-white">• 0 key: Reset zoom</p>
        <p className="text-white">• Right-click aircraft: Rotate label</p>
        <p className="text-white">• Click aircraft: Select</p>
      </div>
      
      {/* Toggle Buttons */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2">
        <button
          onClick={() => setShowWaypointLabels(!showWaypointLabels)}
          className="bg-black bg-opacity-70 hover:bg-opacity-90 px-4 py-2 rounded text-white text-sm font-semibold transition-all border border-yellow-400/30 hover:border-yellow-400/60"
        >
          {showWaypointLabels ? '🏷️ Hide Waypoint Labels' : '🏷️ Show Waypoint Labels'}
        </button>
        <button
          onClick={() => setShowAirwayRoutes(!showAirwayRoutes)}
          className="bg-black bg-opacity-70 hover:bg-opacity-90 px-4 py-2 rounded text-white text-sm font-semibold transition-all border border-purple-400/30 hover:border-purple-400/60"
        >
          {showAirwayRoutes ? '✈️ Hide Airways' : '✈️ Show Airways'}
        </button>
      </div>
    </div>
  );
}

