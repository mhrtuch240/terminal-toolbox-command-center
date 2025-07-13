import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowUpDown, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HexConverter = () => {
  const [textInput, setTextInput] = useState('');
  const [hexInput, setHexInput] = useState('');
  const { toast } = useToast();

  const textToHex = (text: string) => {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'))
      .join(' ');
  };

  const hexToText = (hex: string) => {
    try {
      return hex
        .split(' ')
        .filter(h => h.length === 2)
        .map(h => String.fromCharCode(parseInt(h, 16)))
        .join('');
    } catch (error) {
      return 'Invalid hexadecimal format';
    }
  };

  const handleTextToHex = () => {
    if (textInput.trim()) {
      const hex = textToHex(textInput);
      setHexInput(hex);
    }
  };

  const handleHexToText = () => {
    if (hexInput.trim()) {
      const text = hexToText(hexInput);
      setTextInput(text);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      });
    });
  };

  const clear = () => {
    setTextInput('');
    setHexInput('');
  };

  return (
    <Card className="terminal-border max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-primary font-mono flex items-center">
          $ ./hex_converter.exe<span className="terminal-cursor"></span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {/* Text Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-foreground font-mono">Text Input</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(textInput, 'Text')}
                disabled={!textInput}
                className="font-mono"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text to convert to hexadecimal..."
              className="bg-terminal-darker border-border text-foreground font-mono h-24 resize-none"
            />
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-3">
            <Button
              onClick={handleTextToHex}
              disabled={!textInput.trim()}
              className="font-mono flex items-center space-x-2"
            >
              <ArrowUpDown className="h-4 w-4" />
              <span>Text → Hex</span>
            </Button>
            
            <Button
              onClick={handleHexToText}
              disabled={!hexInput.trim()}
              variant="secondary"
              className="font-mono flex items-center space-x-2"
            >
              <ArrowUpDown className="h-4 w-4 rotate-180" />
              <span>Hex → Text</span>
            </Button>

            <Button
              onClick={clear}
              variant="destructive"
              className="font-mono"
            >
              Clear
            </Button>
          </div>

          {/* Hex Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-foreground font-mono">Hexadecimal Output</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(hexInput, 'Hexadecimal')}
                disabled={!hexInput}
                className="font-mono"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              placeholder="Hexadecimal output will appear here..."
              className="bg-terminal-darker border-border text-primary font-mono h-24 resize-none"
            />
          </div>

          {/* Info */}
          <div className="bg-terminal-darker border border-border rounded p-3">
            <div className="text-sm text-muted-foreground font-mono">
              <div>💡 Each character = 2-digit hex (e.g., 'A' = 41, 'a' = 61)</div>
              <div>🔹 Hex format: space-separated pairs (00-FF)</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HexConverter;