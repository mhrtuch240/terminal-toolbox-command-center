import { useState } from 'react';
import { 
  Calculator, 
  Activity, 
  Timer, 
  Binary, 
  Hash, 
  Shield, 
  ShieldCheck, 
  Languages, 
  Volume2, 
  Mic, 
  Calendar, 
  SpellCheck,
  Search,
  Zap
} from 'lucide-react';
import ToolCard from './ToolCard';
import ToolModal from './ToolModal';

// Tool Components
import CalculatorTool from './tools/Calculator';
import BMRCalculator from './tools/BMRCalculator';
import Stopwatch from './tools/Stopwatch';
import TextBinaryConverter from './tools/TextBinaryConverter';
import HexConverter from './tools/HexConverter';
import PasswordGenerator from './tools/PasswordGenerator';
import PasswordChecker from './tools/PasswordChecker';
import LanguageTranslator from './tools/LanguageTranslator';
import TextToSpeech from './tools/TextToSpeech';
import SpeechToText from './tools/SpeechToText';
import BirthdayMapper from './tools/BirthdayMapper';
import SpellChecker from './tools/SpellChecker';

const ToolsGrid = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const tools = [
    {
      id: 'calculator',
      title: 'Calculator',
      description: 'Standard mathematical operations',
      icon: Calculator,
      component: <CalculatorTool />,
      status: 'active' as const
    },
    {
      id: 'bmr-calculator',
      title: 'BMR Calculator',
      description: 'Calculate your Basal Metabolic Rate',
      icon: Activity,
      component: <BMRCalculator />,
      status: 'active' as const
    },
    {
      id: 'stopwatch',
      title: 'Stopwatch',
      description: 'Precision time measurement with laps',
      icon: Timer,
      component: <Stopwatch />,
      status: 'active' as const
    },
    {
      id: 'text-binary',
      title: 'Text ↔ Binary',
      description: 'Convert text to binary and vice versa',
      icon: Binary,
      component: <TextBinaryConverter />,
      status: 'active' as const
    },
    {
      id: 'hex-converter',
      title: 'Text ↔ Hex',
      description: 'Convert text to hexadecimal and back',
      icon: Hash,
      component: <HexConverter />,
      status: 'active' as const
    },
    {
      id: 'password-generator',
      title: 'Password Generator',
      description: 'Generate secure passwords with options',
      icon: Shield,
      component: <PasswordGenerator />,
      status: 'active' as const
    },
    {
      id: 'password-checker',
      title: 'Password Checker',
      description: 'Analyze password strength and security',
      icon: ShieldCheck,
      component: <PasswordChecker />,
      status: 'active' as const
    },
    {
      id: 'translator',
      title: 'Language Translator',
      description: 'Translate text between languages',
      icon: Languages,
      component: <LanguageTranslator />,
      status: 'active' as const
    },
    {
      id: 'text-to-speech',
      title: 'Text-to-Speech',
      description: 'Convert text to spoken audio',
      icon: Volume2,
      component: <TextToSpeech />,
      status: 'active' as const
    },
    {
      id: 'speech-to-text',
      title: 'Speech-to-Text',
      description: 'Convert speech to written text',
      icon: Mic,
      component: <SpeechToText />,
      status: 'active' as const
    },
    {
      id: 'birthday-mapper',
      title: 'Birthday Mapper',
      description: 'Track and organize birthdays',
      icon: Calendar,
      component: <BirthdayMapper />,
      status: 'active' as const
    },
    {
      id: 'spell-checker',
      title: 'Spell Checker',
      description: 'Check and correct text spelling',
      icon: SpellCheck,
      component: <SpellChecker />,
      status: 'active' as const
    }
  ];

  const activeTool = tools.find(tool => tool.id === activeModal);

  return (
    <section id="tools" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-mono mb-4 terminal-glow">
            $ ls -la /tools/<span className="terminal-cursor"></span>
          </h2>
          <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
            Execute powerful utilities from your terminal interface
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              onClick={() => setActiveModal(tool.id)}
              status={tool.status}
            />
          ))}
        </div>

        {/* Coming Soon Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-terminal-darker border border-primary/30 rounded-lg px-6 py-3">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-mono text-primary">More tools coming soon...</span>
            <span className="terminal-cursor"></span>
          </div>
        </div>

        {/* Tool Modal */}
        {activeTool && (
          <ToolModal
            isOpen={!!activeModal}
            onClose={() => setActiveModal(null)}
            title={activeTool.title}
          >
            {activeTool.component}
          </ToolModal>
        )}
      </div>
    </section>
  );
};

export default ToolsGrid;