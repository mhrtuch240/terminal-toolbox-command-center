import { Card, CardContent } from '@/components/ui/card';
import { User, Code, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-terminal-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-mono mb-4 terminal-glow">
            $ cat about_us.txt<span className="terminal-cursor"></span>
          </h2>
          <div className="text-muted-foreground font-mono">
            Loading organization info...
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="terminal-border">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Profile Section */}
                <div className="text-center md:text-left">
                  <div className="mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent mx-auto md:mx-0 flex items-center justify-center mb-4">
                      <User className="w-16 h-16 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary font-mono mb-2">
                      Mahedi Hasan Rafsun
                    </h3>
                    <p className="text-muted-foreground font-mono">
                      Founder & Developer
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-primary font-mono mb-3 flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      About LWMHR
                    </h4>
                    <div className="text-foreground font-mono text-sm leading-relaxed space-y-3">
                      <p>
                        <span className="text-primary">Learn With Mahedi Hasan Rafsun</span> is a tech-based 
                        initiative aiming to build easy, accessible, and efficient tools for students, 
                        developers, freelancers, and all curious minds.
                      </p>
                      <p>
                        Founded by <span className="text-primary">Mahedi Hasan Rafsun</span>, LWMHR stands 
                        for learning, experimenting, and growing together. 
                        <span className="text-primary"> +Tools.Com</span> is part of our mission to make 
                        useful tools freely accessible in one powerful platform.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-primary font-mono mb-3 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Our Mission
                    </h4>
                    <div className="text-foreground font-mono text-sm leading-relaxed">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center">
                          <span className="text-primary mr-2">&gt;</span>
                          <span>Democratize access to useful digital tools</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-primary mr-2">&gt;</span>
                          <span>Foster learning and experimentation</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-primary mr-2">&gt;</span>
                          <span>Build a community of curious minds</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-primary mr-2">&gt;</span>
                          <span>Open-source knowledge sharing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Stats */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-terminal-dark rounded p-3">
                    <div className="text-primary font-mono text-lg font-bold">10+</div>
                    <div className="text-muted-foreground font-mono text-sm">Tools</div>
                  </div>
                  <div className="bg-terminal-dark rounded p-3">
                    <div className="text-primary font-mono text-lg font-bold">24/7</div>
                    <div className="text-muted-foreground font-mono text-sm">Available</div>
                  </div>
                  <div className="bg-terminal-dark rounded p-3">
                    <div className="text-primary font-mono text-lg font-bold">Free</div>
                    <div className="text-muted-foreground font-mono text-sm">Forever</div>
                  </div>
                  <div className="bg-terminal-dark rounded p-3">
                    <div className="text-primary font-mono text-lg font-bold">∞</div>
                    <div className="text-muted-foreground font-mono text-sm">Possibilities</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;