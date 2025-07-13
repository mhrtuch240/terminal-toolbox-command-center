import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Shield, Eye, EyeOff } from 'lucide-react';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const checkPassword = (pwd: string) => {
    if (!pwd) {
      setAnalysis(null);
      return;
    }

    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      symbols: /[^A-Za-z0-9]/.test(pwd),
      noCommon: !isCommonPassword(pwd),
      noRepeated: !hasRepeatedChars(pwd),
      minLength: pwd.length >= 12
    };

    const score = Object.values(checks).filter(Boolean).length;
    const percentage = Math.round((score / 8) * 100);

    let strength = 'Very Weak';
    let color = 'bg-red-500';
    
    if (percentage >= 90) {
      strength = 'Very Strong';
      color = 'bg-green-500';
    } else if (percentage >= 70) {
      strength = 'Strong';
      color = 'bg-blue-500';
    } else if (percentage >= 50) {
      strength = 'Medium';
      color = 'bg-yellow-500';
    } else if (percentage >= 30) {
      strength = 'Weak';
      color = 'bg-orange-500';
    }

    setAnalysis({
      strength,
      percentage,
      color,
      checks,
      score,
      feedback: generateFeedback(checks)
    });
  };

  const isCommonPassword = (pwd: string) => {
    const common = ['password', '123456', 'password123', 'admin', 'qwerty', 'letmein'];
    return common.includes(pwd.toLowerCase());
  };

  const hasRepeatedChars = (pwd: string) => {
    return /(.)\1{2,}/.test(pwd);
  };

  const generateFeedback = (checks: any) => {
    const feedback = [];
    
    if (!checks.length) feedback.push('Use at least 8 characters');
    if (!checks.minLength) feedback.push('Consider using 12+ characters for better security');
    if (!checks.uppercase) feedback.push('Add uppercase letters (A-Z)');
    if (!checks.lowercase) feedback.push('Add lowercase letters (a-z)');
    if (!checks.numbers) feedback.push('Include numbers (0-9)');
    if (!checks.symbols) feedback.push('Use special characters (!@#$...)');
    if (!checks.noCommon) feedback.push('Avoid common passwords');
    if (!checks.noRepeated) feedback.push('Avoid repeated character patterns');
    
    return feedback;
  };

  return (
    <Card className="terminal-border max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-primary font-mono flex items-center">
          $ ./password_checker.exe<span className="terminal-cursor"></span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Password Input */}
        <div>
          <Label className="text-foreground font-mono">Enter Password to Check</Label>
          <div className="relative mt-1">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPassword(e.target.value);
              }}
              placeholder="Type your password here..."
              className="bg-terminal-darker border-border text-foreground font-mono pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 h-full px-3"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {analysis && (
          <>
            {/* Strength Display */}
            <div className="bg-terminal-darker border border-border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground font-mono">Password Strength</span>
                <span className={`font-mono font-bold ${
                  analysis.strength === 'Very Strong' ? 'text-green-500' :
                  analysis.strength === 'Strong' ? 'text-blue-500' :
                  analysis.strength === 'Medium' ? 'text-yellow-500' :
                  analysis.strength === 'Weak' ? 'text-orange-500' :
                  'text-red-500'
                }`}>
                  {analysis.strength}
                </span>
              </div>
              <Progress value={analysis.percentage} className="h-2" />
              <div className="text-sm text-muted-foreground mt-1 font-mono">
                Score: {analysis.score}/8 ({analysis.percentage}%)
              </div>
            </div>

            {/* Security Checks */}
            <div className="bg-terminal-darker border border-border rounded p-4">
              <div className="text-foreground font-mono mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Security Checks
              </div>
              <div className="space-y-2 text-sm font-mono">
                {Object.entries(analysis.checks).map(([key, passed]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {key === 'length' && '8+ characters'}
                      {key === 'minLength' && '12+ characters'}
                      {key === 'uppercase' && 'Uppercase letters'}
                      {key === 'lowercase' && 'Lowercase letters'}
                      {key === 'numbers' && 'Numbers'}
                      {key === 'symbols' && 'Special characters'}
                      {key === 'noCommon' && 'Not common password'}
                      {key === 'noRepeated' && 'No repeated patterns'}
                    </span>
                    <span className={passed ? 'text-green-500' : 'text-red-500'}>
                      {passed ? '✓' : '✗'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {analysis.feedback.length > 0 && (
              <div className="bg-terminal-darker border border-border rounded p-4">
                <div className="text-foreground font-mono mb-2">Suggestions:</div>
                <ul className="text-sm text-muted-foreground font-mono space-y-1">
                  {analysis.feedback.map((tip: string, index: number) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {!password && (
          <div className="text-center text-muted-foreground font-mono py-8">
            Enter a password to check its security level
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PasswordChecker;