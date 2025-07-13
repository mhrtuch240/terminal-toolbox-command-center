import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  status?: 'active' | 'coming-soon';
}

const ToolCard = ({ title, description, icon: Icon, onClick, status = 'active' }: ToolCardProps) => {
  return (
    <Card 
      className={`terminal-border hover:border-primary/50 transition-all duration-300 cursor-pointer group ${
        status === 'coming-soon' ? 'opacity-70' : 'flicker'
      }`}
      onClick={status === 'active' ? onClick : undefined}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-primary group-hover:terminal-glow transition-all" />
          <CardTitle className="text-lg font-mono text-foreground group-hover:text-primary transition-colors">
            {title}
            {status === 'active' && <span className="text-muted-foreground">.exe</span>}
            {status === 'coming-soon' && <span className="text-yellow-500 text-sm ml-2">[Coming Soon]</span>}
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground font-mono text-sm">
          {status === 'active' && '$ ./'}{description}
          {status === 'active' && <span className="terminal-cursor"></span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground font-mono">
          {status === 'active' ? '[EXECUTABLE]' : '[DEVELOPMENT]'}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;