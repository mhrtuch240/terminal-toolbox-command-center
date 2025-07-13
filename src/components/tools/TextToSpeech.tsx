import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [volume, setVolume] = useState([1]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  // Load voices when component mounts
  useState(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  });

  const speak = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to speak",
        variant: "destructive",
      });
      return;
    }

    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = voices.find(v => v.name === selectedVoice);
      
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.rate = rate[0];
      utterance.pitch = pitch[0];
      utterance.volume = volume[0];

      utterance.onstart = () => {
        setIsPlaying(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        toast({
          title: "Error",
          description: "Speech synthesis failed",
          variant: "destructive",
        });
      };

      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Error",
        description: "Speech synthesis not supported in this browser",
        variant: "destructive",
      });
    }
  };

  const pause = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPlaying(true);
    }
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="text-center">
        <h3 className="text-lg font-bold text-primary mb-2">$ speak --text</h3>
        <p className="text-muted-foreground text-sm">Convert text to speech audio</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-primary mb-2">Text to Speak:</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to speech..."
            className="min-h-32 bg-terminal-darker border-primary/30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-primary mb-2">Voice:</label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger className="bg-terminal-darker border-primary/30">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm text-primary mb-2">
              Volume: {volume[0].toFixed(1)}
            </label>
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-primary" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={1}
                min={0}
                step={0.1}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-primary mb-2">
              Rate: {rate[0].toFixed(1)}x
            </label>
            <Slider
              value={rate}
              onValueChange={setRate}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-primary mb-2">
              Pitch: {pitch[0].toFixed(1)}
            </label>
            <Slider
              value={pitch}
              onValueChange={setPitch}
              max={2}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          <Button
            onClick={speak}
            disabled={isPlaying || !text.trim()}
            className="flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Speak</span>
          </Button>

          <Button
            onClick={isPlaying ? pause : resume}
            disabled={!speechSynthesis.speaking}
            variant="outline"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button
            onClick={stop}
            disabled={!speechSynthesis.speaking}
            variant="outline"
          >
            <Square className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;