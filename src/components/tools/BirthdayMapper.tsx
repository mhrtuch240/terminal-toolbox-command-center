import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Trash2, Gift, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Birthday {
  id: string;
  name: string;
  date: string;
  age?: number;
}

const BirthdayMapper = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const { toast } = useToast();

  // Load birthdays from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('birthdays');
    if (saved) {
      setBirthdays(JSON.parse(saved));
    }
  }, []);

  // Save birthdays to localStorage
  useEffect(() => {
    localStorage.setItem('birthdays', JSON.stringify(birthdays));
  }, [birthdays]);

  const addBirthday = () => {
    if (!name.trim() || !date) {
      toast({
        title: "Error",
        description: "Please enter both name and date",
        variant: "destructive",
      });
      return;
    }

    const newBirthday: Birthday = {
      id: Date.now().toString(),
      name: name.trim(),
      date,
    };

    setBirthdays(prev => [...prev, newBirthday].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const now = new Date();
      
      // Get next occurrence of each birthday
      const nextA = new Date(now.getFullYear(), dateA.getMonth(), dateA.getDate());
      const nextB = new Date(now.getFullYear(), dateB.getMonth(), dateB.getDate());
      
      if (nextA < now) nextA.setFullYear(now.getFullYear() + 1);
      if (nextB < now) nextB.setFullYear(now.getFullYear() + 1);
      
      return nextA.getTime() - nextB.getTime();
    }));

    setName('');
    setDate('');
    
    toast({
      title: "Success",
      description: "Birthday added successfully",
    });
  };

  const deleteBirthday = (id: string) => {
    setBirthdays(prev => prev.filter(b => b.id !== id));
    toast({
      title: "Deleted",
      description: "Birthday removed",
    });
  };

  const getDaysUntilBirthday = (date: string): number => {
    const now = new Date();
    const birthday = new Date(date);
    const thisYear = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());
    
    if (thisYear < now) {
      thisYear.setFullYear(now.getFullYear() + 1);
    }
    
    const diffTime = thisYear.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getAge = (date: string): number => {
    const now = new Date();
    const birthday = new Date(date);
    let age = now.getFullYear() - birthday.getFullYear();
    const monthDiff = now.getMonth() - birthday.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthday.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });
  };

  const upcomingBirthdays = birthdays.filter(b => getDaysUntilBirthday(b.date) <= 30);
  const todaysBirthdays = birthdays.filter(b => getDaysUntilBirthday(b.date) === 0);

  return (
    <div className="space-y-6 font-mono max-h-96 overflow-y-auto">
      <div className="text-center">
        <h3 className="text-lg font-bold text-primary mb-2">$ birthday --map</h3>
        <p className="text-muted-foreground text-sm">Track and organize important birthdays</p>
      </div>

      {/* Add Birthday Form */}
      <Card className="bg-terminal-darker border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary text-sm flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add New Birthday
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-primary mb-1">Name:</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="bg-terminal-darker border-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs text-primary mb-1">Birth Date:</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-terminal-darker border-primary/30"
              />
            </div>
          </div>
          <Button onClick={addBirthday} className="w-full">
            Add Birthday
          </Button>
        </CardContent>
      </Card>

      {/* Today's Birthdays */}
      {todaysBirthdays.length > 0 && (
        <Card className="bg-terminal-darker border-primary/30">
          <CardHeader>
            <CardTitle className="text-primary text-sm flex items-center">
              <Gift className="h-4 w-4 mr-2" />
              Today's Birthdays 🎉
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todaysBirthdays.map((birthday) => (
              <div key={birthday.id} className="flex items-center justify-between p-2 bg-primary/10 rounded">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-primary font-semibold">{birthday.name}</span>
                  <Badge variant="secondary">Age {getAge(birthday.date)}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Upcoming Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <Card className="bg-terminal-darker border-primary/30">
          <CardHeader>
            <CardTitle className="text-primary text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming (Next 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcomingBirthdays.map((birthday) => {
              const daysUntil = getDaysUntilBirthday(birthday.date);
              return (
                <div key={birthday.id} className="flex items-center justify-between p-2 border border-primary/20 rounded">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>{birthday.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {formatDate(birthday.date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={daysUntil <= 7 ? "destructive" : "secondary"}>
                      {daysUntil === 0 ? 'Today!' : `${daysUntil} days`}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteBirthday(birthday.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* All Birthdays */}
      {birthdays.length > 0 && (
        <Card className="bg-terminal-darker border-primary/30">
          <CardHeader>
            <CardTitle className="text-primary text-sm flex items-center">
              <User className="h-4 w-4 mr-2" />
              All Birthdays ({birthdays.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-40 overflow-y-auto">
            {birthdays.map((birthday) => (
              <div key={birthday.id} className="flex items-center justify-between p-2 border border-primary/20 rounded text-sm">
                <div className="flex items-center space-x-2">
                  <span>{birthday.name}</span>
                  <span className="text-muted-foreground">
                    {formatDate(birthday.date)} (Age {getAge(birthday.date)})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteBirthday(birthday.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {birthdays.length === 0 && (
        <div className="text-center text-muted-foreground">
          <p>No birthdays added yet. Add some to get started!</p>
        </div>
      )}
    </div>
  );
};

export default BirthdayMapper;