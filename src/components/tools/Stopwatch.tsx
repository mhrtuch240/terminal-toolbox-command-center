import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (milliseconds: number) => {
    const totalMs = milliseconds;
    const ms = Math.floor((totalMs % 1000) / 10);
    const seconds = Math.floor((totalMs / 1000) % 60);
    const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
    const hours = Math.floor(totalMs / (1000 * 60 * 60));

    const pad = (num: number) => num.toString().padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps(prevLaps => [time, ...prevLaps]);
    }
  };

  return (
    <Card className="terminal-border max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-primary font-mono flex items-center">
          $ ./stopwatch.exe<span className="terminal-cursor"></span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Display */}
        <div className="bg-terminal-darker border border-border rounded p-6">
          <div className="text-center text-3xl font-mono text-primary terminal-glow">
            {formatTime(time)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-3">
          <Button
            onClick={handleStartStop}
            variant={isRunning ? "secondary" : "default"}
            size="lg"
            className="font-mono flex items-center space-x-2"
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </Button>

          <Button
            onClick={handleReset}
            variant="destructive"
            size="lg"
            className="font-mono flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>

          <Button
            onClick={handleLap}
            variant="outline"
            size="lg"
            disabled={!isRunning}
            className="font-mono flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Lap</span>
          </Button>
        </div>

        {/* Laps */}
        {laps.length > 0 && (
          <div className="bg-terminal-darker border border-border rounded p-4 max-h-40 overflow-y-auto">
            <div className="text-primary font-mono text-sm mb-2">Lap Times:</div>
            <div className="space-y-1">
              {laps.map((lapTime, index) => (
                <div key={index} className="flex justify-between text-foreground font-mono text-sm">
                  <span>Lap {laps.length - index}:</span>
                  <span>{formatTime(lapTime)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Stopwatch;