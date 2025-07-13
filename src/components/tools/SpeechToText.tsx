import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, MicOff, Copy, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Extend Window interface for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'es-MX', name: 'Spanish (Mexico)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese (Mandarin)' },
    { code: 'ar-SA', name: 'Arabic' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'tr-TR', name: 'Turkish' },
    { code: 'pl-PL', name: 'Polish' },
    { code: 'nl-NL', name: 'Dutch' },
    { code: 'sv-SE', name: 'Swedish' },
    { code: 'da-DK', name: 'Danish' },
    { code: 'no-NO', name: 'Norwegian' }
  ];

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Error",
        description: "Speech recognition not supported in this browser",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening",
        description: "Speech recognition started. Speak now...",
      });
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(prev => prev + finalTranscript);
      setInterimTranscript(interimTranscript);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      toast({
        title: "Error",
        description: `Speech recognition error: ${event.error}`,
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimTranscript('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    toast({
      title: "Copied",
      description: "Transcript copied to clipboard",
    });
  };

  const clearTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="text-center">
        <h3 className="text-lg font-bold text-primary mb-2">$ listen --speech</h3>
        <p className="text-muted-foreground text-sm">Convert speech to text transcript</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-primary mb-2">Language:</label>
            <Select value={language} onValueChange={setLanguage} disabled={isListening}>
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
          </div>

          <div className="flex items-end space-x-2">
            <Button
              onClick={isListening ? stopListening : startListening}
              className={`flex items-center space-x-2 flex-1 ${
                isListening ? 'bg-red-600 hover:bg-red-700' : ''
              }`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              <span>{isListening ? 'Stop Recording' : 'Start Recording'}</span>
            </Button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-primary">Transcript:</label>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                disabled={!transcript}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearTranscript}
                disabled={!transcript && !interimTranscript}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            value={transcript + (interimTranscript ? ` ${interimTranscript}` : '')}
            readOnly
            placeholder="Transcript will appear here as you speak..."
            className="min-h-40 bg-terminal-darker border-primary/30"
          />
        </div>

        {isListening && (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Listening... Speak now</span>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground">
          <p>Note: This tool requires microphone access and works best in Chrome/Edge browsers.</p>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;