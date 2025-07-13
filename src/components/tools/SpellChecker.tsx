import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SpellError {
  word: string;
  index: number;
  suggestions: string[];
  type: 'spelling' | 'grammar';
}

const SpellChecker = () => {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [errors, setErrors] = useState<SpellError[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  // Simple spell checking using a basic dictionary approach
  // In a real implementation, you'd use a proper spell checking API
  const commonMisspellings: { [key: string]: string[] } = {
    'teh': ['the'],
    'recieve': ['receive'],
    'seperate': ['separate'],
    'definately': ['definitely'],
    'occured': ['occurred'],
    'begining': ['beginning'],
    'accomodate': ['accommodate'],
    'acheive': ['achieve'],
    'beleive': ['believe'],
    'buisness': ['business'],
    'concious': ['conscious'],
    'excercise': ['exercise'],
    'existance': ['existence'],
    'freind': ['friend'],
    'goverment': ['government'],
    'grammer': ['grammar'],
    'independant': ['independent'],
    'intelligence': ['intelligence'],
    'knowlege': ['knowledge'],
    'liesure': ['leisure'],
    'maintainance': ['maintenance'],
    'neccessary': ['necessary'],
    'occassion': ['occasion'],
    'perseverence': ['perseverance'],
    'priviledge': ['privilege'],
    'recomend': ['recommend'],
    'successful': ['successful'],
    'tommorow': ['tomorrow'],
    'unfortunatly': ['unfortunately'],
    'untill': ['until'],
    'wierd': ['weird'],
    'withold': ['withhold'],
  };

  const checkSpelling = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to check",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    const foundErrors: SpellError[] = [];
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordsWithPositions = text.split(/(\s+|[^\w\s])/).filter(Boolean);
    
    let currentIndex = 0;
    
    wordsWithPositions.forEach((segment) => {
      const word = segment.toLowerCase().replace(/[^\w]/g, '');
      
      if (word && commonMisspellings[word]) {
        foundErrors.push({
          word: segment,
          index: currentIndex,
          suggestions: commonMisspellings[word],
          type: 'spelling'
        });
      }
      
      currentIndex += segment.length;
    });

    setErrors(foundErrors);
    
    // Create corrected text with suggestions
    let corrected = text;
    foundErrors.reverse().forEach(error => {
      if (error.suggestions.length > 0) {
        corrected = corrected.substring(0, error.index) + 
                   error.suggestions[0] + 
                   corrected.substring(error.index + error.word.length);
      }
    });
    
    setCorrectedText(corrected);
    setIsChecking(false);
    
    toast({
      title: "Check Complete",
      description: `Found ${foundErrors.length} potential issues`,
    });
  };

  const applySuggestion = (errorIndex: number, suggestion: string) => {
    const error = errors[errorIndex];
    const newText = text.substring(0, error.index) + 
                   suggestion + 
                   text.substring(error.index + error.word.length);
    
    setText(newText);
    setErrors(prev => prev.filter((_, index) => index !== errorIndex));
    
    toast({
      title: "Applied",
      description: `Replaced "${error.word}" with "${suggestion}"`,
    });
  };

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  const clearAll = () => {
    setText('');
    setCorrectedText('');
    setErrors([]);
  };

  return (
    <div className="space-y-6 font-mono max-h-96 overflow-y-auto">
      <div className="text-center">
        <h3 className="text-lg font-bold text-primary mb-2">$ spellcheck --text</h3>
        <p className="text-muted-foreground text-sm">Check and correct text spelling</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-primary">Text to Check:</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(text)}
              disabled={!text}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to check for spelling errors..."
            className="min-h-32 bg-terminal-darker border-primary/30"
          />
        </div>

        <div className="flex justify-center space-x-2">
          <Button 
            onClick={checkSpelling}
            disabled={isChecking || !text.trim()}
          >
            {isChecking ? 'Checking...' : '> Check Spelling'}
          </Button>
          
          <Button 
            onClick={clearAll}
            variant="outline"
            disabled={!text && !correctedText}
          >
            Clear All
          </Button>
        </div>

        {/* Spelling Errors */}
        {errors.length > 0 && (
          <Card className="bg-terminal-darker border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Found {errors.length} Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {errors.map((error, index) => (
                <div key={index} className="p-3 border border-primary/20 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-red-400">"{error.word}"</span>
                    <Badge variant={error.type === 'spelling' ? 'destructive' : 'secondary'}>
                      {error.type}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {error.suggestions.map((suggestion, suggestionIndex) => (
                        <Button
                          key={suggestionIndex}
                          variant="outline"
                          size="sm"
                          onClick={() => applySuggestion(index, suggestion)}
                          className="text-xs"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Corrected Text */}
        {correctedText && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-primary flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Corrected Text:
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(correctedText)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={correctedText}
              readOnly
              className="min-h-32 bg-terminal-darker border-primary/30"
            />
          </div>
        )}

        {/* Statistics */}
        {text && (
          <Card className="bg-terminal-darker border-primary/30">
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-primary">
                    {text.split(/\s+/).filter(word => word.length > 0).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Words</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">
                    {text.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Characters</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">
                    {text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Sentences</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-400">
                    {errors.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Issues</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-xs text-muted-foreground">
          <p>Note: This is a basic spell checker. For comprehensive checking, consider using dedicated tools.</p>
        </div>
      </div>
    </div>
  );
};

export default SpellChecker;