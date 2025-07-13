import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowUpDown, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TextBinaryConverter = () => {
  const [textInput, setTextInput] = useState('');
  const [binaryInput, setBinaryInput] = useState('');
  const { toast } = useToast();

  const textToBinary = (text: string) => {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const binaryToText = (binary: string) => {
    try {
      return binary
        .split(' ')
        .filter(bin => bin.length === 8)
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');
    } catch (error) {
      return 'Invalid binary format';
    }
  };

  const handleTextToBinary = () => {
    if (textInput.trim()) {
      const binary = textToBinary(textInput);
      setBinaryInput(binary);
    }
  };

  const handleBinaryToText = () => {
    if (binaryInput.trim()) {
      const text = binaryToText(binaryInput);
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
    setBinaryInput('');
  };

  return (
    <Card className="terminal-border max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-primary font-mono flex items-center">
          $ ./text_binary_converter.exe<span className="terminal-cursor"></span>
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
              placeholder="Enter text to convert to binary..."
              className="bg-terminal-darker border-border text-foreground font-mono h-24 resize-none"
            />
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-3">
            <Button
              onClick={handleTextToBinary}
              disabled={!textInput.trim()}
              className="font-mono flex items-center space-x-2"
            >
              <ArrowUpDown className="h-4 w-4" />
              <span>Text → Binary</span>
            </Button>
            
            <Button
              onClick={handleBinaryToText}
              disabled={!binaryInput.trim()}
              variant="secondary"
              className="font-mono flex items-center space-x-2"
            >
              <ArrowUpDown className="h-4 w-4 rotate-180" />
              <span>Binary → Text</span>
            </Button>

            <Button
              onClick={clear}
              variant="destructive"
              className="font-mono"
            >
              Clear
            </Button>
          </div>

          {/* Binary Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-foreground font-mono">Binary Output</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(binaryInput, 'Binary')}
                disabled={!binaryInput}
                className="font-mono"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={binaryInput}
              onChange={(e) => setBinaryInput(e.target.value)}
              placeholder="Binary output will appear here..."
              className="bg-terminal-darker border-border text-primary font-mono h-24 resize-none"
            />
          </div>

          {/* Info */}
          <div className="bg-terminal-darker border border-border rounded p-3">
            <div className="text-sm text-muted-foreground font-mono">
              <div>💡 Each character = 8-bit binary (e.g., 'A' = 01000001)</div>
              <div>🔹 Binary format: space-separated 8-bit chunks</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextBinaryConverter;