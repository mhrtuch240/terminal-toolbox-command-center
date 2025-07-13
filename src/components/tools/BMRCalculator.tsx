import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BMRCalculator = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const calculateBMR = () => {
    if (!age || !weight || !height || !gender) return;

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    let bmr: number;

    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extra: 1.9
    };

    const multiplier = activityMultipliers[activityLevel] || 1.2;
    const tdee = bmr * multiplier;

    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  const reset = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setGender('');
    setActivityLevel('');
    setResult(null);
  };

  return (
    <Card className="terminal-border max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-primary font-mono flex items-center">
          $ ./bmr_calculator.exe<span className="terminal-cursor"></span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="age" className="text-foreground font-mono">Age (years)</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="mt-1 bg-terminal-darker border-border text-foreground font-mono"
            />
          </div>

          <div>
            <Label htmlFor="weight" className="text-foreground font-mono">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
              className="mt-1 bg-terminal-darker border-border text-foreground font-mono"
            />
          </div>

          <div>
            <Label htmlFor="height" className="text-foreground font-mono">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height"
              className="mt-1 bg-terminal-darker border-border text-foreground font-mono"
            />
          </div>

          <div>
            <Label className="text-foreground font-mono">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="mt-1 bg-terminal-darker border-border text-foreground font-mono">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-foreground font-mono">Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger className="mt-1 bg-terminal-darker border-border text-foreground font-mono">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (office job)</SelectItem>
                <SelectItem value="light">Light exercise (1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate exercise (3-5 days/week)</SelectItem>
                <SelectItem value="active">Heavy exercise (6-7 days/week)</SelectItem>
                <SelectItem value="extra">Very heavy exercise (2x/day)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <Button onClick={calculateBMR} className="flex-1 font-mono">
              Calculate
            </Button>
            <Button onClick={reset} variant="secondary" className="font-mono">
              Reset
            </Button>
          </div>
        </div>

        {result && (
          <div className="bg-terminal-darker border border-border rounded p-4 mt-4">
            <div className="text-primary font-mono space-y-2">
              <div>BMR: {result.bmr} calories/day</div>
              <div>TDEE: {result.tdee} calories/day</div>
              <div className="text-sm text-muted-foreground mt-3">
                BMR = Basal Metabolic Rate<br />
                TDEE = Total Daily Energy Expenditure
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BMRCalculator;