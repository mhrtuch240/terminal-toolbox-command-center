import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Welcome to +Tools.Com – Your Multi-Tool Terminal';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const scrollToTools = () => {
    const toolsSection = document.querySelector('#tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-terminal-darker relative">
      <div className="container mx-auto px-4 text-center">
        {/* Terminal Window */}
        <div className="terminal-border rounded-lg p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <span className="text-sm text-muted-foreground font-mono">terminal.tools.com</span>
          </div>
          
          <div className="text-left font-mono">
            <div className="text-muted-foreground mb-2">$ whoami</div>
            <div className="text-primary mb-4">developer@toolscom</div>
            
            <div className="text-muted-foreground mb-2">$ cat welcome.txt</div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 terminal-glow min-h-[3rem]">
              {displayText}<span className="terminal-cursor"></span>
            </h1>
            
            <div className="text-muted-foreground mb-2">$ ls -la available_tools/</div>
            <div className="text-terminal-white mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div>calculator.exe</div>
                <div>bmr_calc.exe</div>
                <div>stopwatch.exe</div>
                <div>text_binary.exe</div>
                <div>hex_converter.exe</div>
                <div>password_gen.exe</div>
                <div>translator.exe</div>
                <div>text_speech.exe</div>
                <div>birthday_map.exe</div>
                <div>spell_check.exe</div>
                <div>and_more.exe</div>
              </div>
            </div>
            
            <div className="text-muted-foreground mb-2">$ echo "Ready to execute..."</div>
            <div className="text-primary text-lg">Ready to execute...<span className="terminal-cursor"></span></div>
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground mt-8 font-mono max-w-2xl mx-auto">
          Access powerful utilities in one terminal-style interface. 
          Built for developers, students, and digital explorers.
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToTools}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-primary hover:text-terminal-white transition-colors"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default Hero;