import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4 py-20">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20 mb-4 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">AI-Powered Technology</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-fade-in">
            Criminal Face Generator
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Advanced AI-powered suspect sketching using Stable Diffusion. Transform witness descriptions into realistic facial images with cutting-edge machine learning technology.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in">
            <Button asChild variant="hero" size="xl">
              <Link to="/generate">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-16 animate-fade-in">
            <div className="bg-card p-6 rounded-xl border shadow-[var(--shadow-card)] hover:shadow-md transition-all">
              <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Utilizes advanced Stable Diffusion models trained for facial generation
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-[var(--shadow-card)] hover:shadow-md transition-all">
              <div className="rounded-lg bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens securely with privacy-first architecture
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-[var(--shadow-card)] hover:shadow-md transition-all">
              <div className="rounded-lg bg-primary-glow/10 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary-glow" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Results</h3>
              <p className="text-sm text-muted-foreground">
                Generate detailed facial images in seconds from descriptions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
