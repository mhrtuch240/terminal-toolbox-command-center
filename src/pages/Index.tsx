import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ToolsGrid from '@/components/ToolsGrid';
import About from '@/components/About';
import SuggestTool from '@/components/SuggestTool';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ToolsGrid />
      <About />
      <SuggestTool />
      <Footer />
    </div>
  );
};

export default Index;
