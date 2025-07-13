import { Card } from '@/components/ui/card';
import { Terminal, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-terminal-darker border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
              <Terminal className="h-6 w-6 text-primary terminal-glow" />
              <span className="text-xl font-bold text-primary font-mono terminal-glow">
                +Tools.Com
              </span>
            </div>
            <p className="text-muted-foreground font-mono text-sm">
              Your Multi-Tool Terminal
            </p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-foreground font-mono text-sm">
                developer.mahedihasanrafsun@gmail.com
              </span>
            </div>
            <p className="text-muted-foreground font-mono text-xs">
              For tool suggestions & feedback
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground font-mono text-sm">
              © {currentYear} LWMHR - Learn With Mahedi Hasan Rafsun
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-1 mt-1">
              <span className="text-muted-foreground font-mono text-xs">Made with</span>
              <Heart className="h-3 w-3 text-red-500" />
              <span className="text-muted-foreground font-mono text-xs">for developers</span>
            </div>
          </div>
        </div>

        {/* Terminal Status Bar */}
        <div className="mt-8 pt-6 border-t border-border">
          <Card className="terminal-border bg-terminal-dark">
            <div className="p-3 flex items-center justify-between text-xs font-mono">
              <div className="flex space-x-4">
                <span className="text-primary">STATUS: ONLINE</span>
                <span className="text-muted-foreground">TOOLS: 10+ AVAILABLE</span>
                <span className="text-muted-foreground">UPTIME: 24/7</span>
              </div>
              <div className="text-muted-foreground">
                SESSION: GUEST@TOOLSCOM
              </div>
            </div>
          </Card>
        </div>
      </div>
    </footer>
  );
};

export default Footer;