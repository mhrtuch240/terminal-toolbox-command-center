import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PasswordGenerator = () => {
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }
    
    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let result = '';
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
    calculateStrength(result);
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    
    if (score <= 2) setStrength('Weak');
    else if (score <= 4) setStrength('Medium');
    else if (score <= 6) setStrength('Strong');
    else setStrength('Very Strong');
  };

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        toast({
          title: "Copied!",
          description: "Password copied to clipboard",
        });
      });
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 'Weak': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Strong': return 'text-blue-500';
      case 'Very Strong': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="terminal-border max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-primary font-mono flex items-center">
          $ ./password_generator.exe<span className="terminal-cursor"></span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Password Display */}
        <div className="bg-terminal-darker border border-border rounded p-4">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-foreground font-mono">Generated Password</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyPassword}
              disabled={!password}
              className="font-mono"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={password}
            readOnly
            placeholder="Click generate to create password..."
            className="bg-terminal-darker border-border text-primary font-mono"
          />
          {strength && (
            <div className={`text-sm mt-2 font-mono ${getStrengthColor()}`}>
              Strength: {strength}
            </div>
          )}
        </div>

        {/* Length Slider */}
        <div className="space-y-2">
          <Label className="text-foreground font-mono">Length: {length[0]}</Label>
          <Slider
            value={length}
            onValueChange={setLength}
            min={4}
            max={64}
            step={1}
            className="w-full"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
            />
            <Label htmlFor="uppercase" className="text-sm font-mono">Uppercase (A-Z)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
            />
            <Label htmlFor="lowercase" className="text-sm font-mono">Lowercase (a-z)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
            />
            <Label htmlFor="numbers" className="text-sm font-mono">Numbers (0-9)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
            />
            <Label htmlFor="symbols" className="text-sm font-mono">Symbols (!@#$)</Label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="exclude-similar"
            checked={excludeSimilar}
            onCheckedChange={(checked) => setExcludeSimilar(checked === true)}
          />
          <Label htmlFor="exclude-similar" className="text-sm font-mono">Exclude similar characters (il1Lo0O)</Label>
        </div>

        {/* Generate Button */}
        <Button
          onClick={generatePassword}
          className="w-full font-mono flex items-center justify-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Generate Password</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;