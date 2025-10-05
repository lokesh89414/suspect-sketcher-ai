import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, BookOpen, ExternalLink } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            About This Project
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn how our AI-powered suspect identification system works
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              The Criminal Face Generator is an advanced AI-powered tool designed to assist law enforcement
              and security professionals in creating realistic facial images of suspects based on witness
              descriptions. This project leverages cutting-edge Stable Diffusion models trained specifically
              for facial generation.
            </p>
            <p>
              Our system uses a custom-trained Stable Diffusion model developed in Google Colab, optimized
              for generating photorealistic human faces with specific characteristics. The model has been
              fine-tuned to understand and interpret detailed descriptions of facial features, ensuring
              accurate and reliable results.
            </p>
            <p className="font-medium text-foreground">
              Privacy & Ethics: All processing is done with strict privacy controls. No generated images
              are stored permanently, and all data is handled in accordance with privacy regulations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              How to Use
            </CardTitle>
            <CardDescription>Step-by-step instructions for generating suspect images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Option 1: Description-Based Generation</h3>
                <ol className="space-y-2 list-decimal list-inside text-muted-foreground ml-2">
                  <li>Navigate to the "Generate" page</li>
                  <li>Select the "Description-Based" tab</li>
                  <li>Type a detailed description of the suspect's appearance in the text area</li>
                  <li>Click "Generate Image" to create the facial image</li>
                  <li>Download or save the generated image for your records</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Option 2: Manual Feature Selection</h3>
                <ol className="space-y-2 list-decimal list-inside text-muted-foreground ml-2">
                  <li>Navigate to the "Generate" page</li>
                  <li>Select the "Manual Selection" tab</li>
                  <li>Answer each question about the suspect's features by clicking the appropriate button</li>
                  <li>Use the "Next" button to proceed through all questions</li>
                  <li>Track your progress using the progress indicator at the top</li>
                  <li>After answering all questions, click "Generate Image"</li>
                  <li>The AI will combine all your selections into a comprehensive prompt</li>
                  <li>Download the resulting image when generation is complete</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Model Architecture</h4>
              <p className="text-muted-foreground text-sm">
                Built on Stable Diffusion, a state-of-the-art text-to-image generation model.
                Custom-trained using a curated dataset of facial features and descriptions.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Training Environment</h4>
              <p className="text-muted-foreground text-sm">
                The model was trained using Google Colab's GPU infrastructure, ensuring high-quality
                results and fast inference times.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Integration</h4>
              <p className="text-muted-foreground text-sm">
                The system connects to a hosted Stable Diffusion API endpoint for real-time image generation.
                Simply provide your API endpoint URL to enable the generation functionality.
              </p>
            </div>

            <div className="pt-4 border-t">
              <a
                href="https://colab.research.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                View Google Colab Documentation
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Note:</strong> This tool is designed for professional use in law enforcement
              and security contexts. Always verify results with additional investigation methods.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
