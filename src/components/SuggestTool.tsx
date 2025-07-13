import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Send, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SuggestTool = () => {
  const [toolName, setToolName] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const { toast } = useToast();

  const sendSuggestion = () => {
    if (!toolName.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in tool name and description",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(`New Tool Idea for +Tools.Com: ${toolName}`);
    const body = encodeURIComponent(`
Tool Name: ${toolName}

Description:
${description}

Suggested Features:
${features || 'Not specified'}

---
Sent via +Tools.Com suggestion form
    `);

    const mailtoLink = `mailto:developer.mahedihasanrafsun@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');

    toast({
      title: "Email Client Opened",
      description: "Your suggestion has been prepared for sending!",
    });
  };

  const clearForm = () => {
    setToolName('');
    setDescription('');
    setFeatures('');
  };

  return (
    <section id="suggest" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-mono mb-4 terminal-glow">
            $ ./suggest_tool.exe<span className="terminal-cursor"></span>
          </h2>
          <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
            Got an idea for a new tool? Help us expand our terminal arsenal!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="text-primary font-mono flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Tool Idea Submission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tool-name" className="text-foreground font-mono">
                    Tool Name *
                  </Label>
                  <Input
                    id="tool-name"
                    value={toolName}
                    onChange={(e) => setToolName(e.target.value)}
                    placeholder="e.g., QR Code Generator, Unit Converter..."
                    className="mt-1 bg-terminal-darker border-border text-foreground font-mono"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-foreground font-mono">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this tool should do and how it would help users..."
                    className="mt-1 bg-terminal-darker border-border text-foreground font-mono h-24 resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="features" className="text-foreground font-mono">
                    Suggested Features (Optional)
                  </Label>
                  <Textarea
                    id="features"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    placeholder="List specific features or functionality you'd like to see..."
                    className="mt-1 bg-terminal-darker border-border text-foreground font-mono h-20 resize-none"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={sendSuggestion}
                  className="flex-1 font-mono flex items-center justify-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Suggestion</span>
                </Button>
                <Button
                  onClick={clearForm}
                  variant="secondary"
                  className="font-mono"
                >
                  Clear
                </Button>
              </div>

              {/* Contact Info */}
              <div className="bg-terminal-darker border border-border rounded p-4">
                <div className="text-sm text-muted-foreground font-mono space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <span>developer.mahedihasanrafsun@gmail.com</span>
                  </div>
                  <div className="text-xs">
                    ℹ️ Clicking "Send Suggestion" will open your email client with the form data
                  </div>
                </div>
              </div>

              {/* Popular Suggestions */}
              <div className="bg-terminal-darker border border-border rounded p-4">
                <div className="text-foreground font-mono mb-3">Popular Requests:</div>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground font-mono">
                  <div>• QR Code Generator</div>
                  <div>• Unit Converter</div>
                  <div>• Color Palette Tool</div>
                  <div>• JSON Formatter</div>
                  <div>• Base64 Encoder</div>
                  <div>• URL Shortener</div>
                  <div>• Lorem Ipsum Gen</div>
                  <div>• Hash Generator</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SuggestTool;