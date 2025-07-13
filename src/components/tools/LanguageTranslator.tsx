import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LanguageTranslator = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: 'auto', name: 'Auto Detect' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'tr', name: 'Turkish' },
    { code: 'pl', name: 'Polish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'sv', name: 'Swedish' },
    { code: 'da', name: 'Danish' },
    { code: 'no', name: 'Norwegian' },
    { code: 'fi', name: 'Finnish' }
  ];

  const translateText = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to translate",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    try {
      // Using Google Translate API through a free service
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${sourceLang}|${targetLang}`
      );
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        setTranslatedText(data.responseData.translatedText);
        toast({
          title: "Success",
          description: "Text translated successfully",
        });
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Translation failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  const swapLanguages = () => {
    if (sourceLang !== 'auto') {
      setSourceLang(targetLang);
      setTargetLang(sourceLang);
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="text-center">
        <h3 className="text-lg font-bold text-primary mb-2">$ translate --help</h3>
        <p className="text-muted-foreground text-sm">Universal language translator utility</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <Select value={sourceLang} onValueChange={setSourceLang}>
          <SelectTrigger className="bg-terminal-darker border-primary/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={swapLanguages}
          disabled={sourceLang === 'auto'}
          className="mx-auto"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>

        <Select value={targetLang} onValueChange={setTargetLang}>
          <SelectTrigger className="bg-terminal-darker border-primary/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.filter(lang => lang.code !== 'auto').map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm text-primary">Source Text:</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(sourceText)}
              disabled={!sourceText}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            className="min-h-32 bg-terminal-darker border-primary/30 resize-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm text-primary">Translation:</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(translatedText)}
              disabled={!translatedText}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            value={translatedText}
            readOnly
            placeholder="Translation will appear here..."
            className="min-h-32 bg-terminal-darker border-primary/30 resize-none"
          />
        </div>
      </div>

      <Button 
        onClick={translateText}
        disabled={isTranslating || !sourceText.trim()}
        className="w-full"
      >
        {isTranslating ? 'Translating...' : '> Execute Translation'}
      </Button>
    </div>
  );
};

export default LanguageTranslator;