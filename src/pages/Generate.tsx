import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Loader2, FileText, ListChecks } from "lucide-react";
import { toast } from "sonner";
import { ManualFeatureSelector } from "@/components/ManualFeatureSelector";

const Generate = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [description, setDescription] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDescriptionGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call - replace with actual Stable Diffusion API
    setTimeout(() => {
      // Mock generated image
      setGeneratedImage("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop");
      setIsLoading(false);
      toast.success("Image generated successfully!");
    }, 2000);
  };

  const handleManualGenerate = async (data: Record<string, any>) => {
    setIsLoading(true);
    
    // Build prompt from form data
    const promptParts: string[] = [];
    
    if (data.gender) promptParts.push(`${data.gender} person`);
    if (data.age) promptParts.push(`approximately ${data.age} years old`);
    if (data.region) promptParts.push(data.region.replace(/_/g, " "));
    if (data.skinTone) promptParts.push(`${data.skinTone.replace(/_/g, " ")} skin tone`);
    if (data.faceShape) promptParts.push(`${data.faceShape} face shape`);
    if (data.jawline) promptParts.push(`${data.jawline} jawline`);
    if (data.chin) promptParts.push(`${data.chin} chin`);
    if (data.forehead) promptParts.push(`${data.forehead} forehead`);
    if (data.hairLength && data.hairLength !== "bald") {
      promptParts.push(`${data.hairLength.replace(/_/g, " ")} hair`);
      if (data.hairColor) promptParts.push(`${data.hairColor.replace(/_/g, " ")} hair color`);
      if (data.hairTexture) promptParts.push(`${data.hairTexture} hair texture`);
      if (data.hairline) promptParts.push(`${data.hairline.replace(/_/g, " ")} hairline`);
    } else if (data.hairLength === "bald") {
      promptParts.push("bald head");
    }
    if (data.beard && data.beard !== "none") promptParts.push(`${data.beard} beard`);
    if (data.beardStyle) promptParts.push(`${data.beardStyle.replace(/_/g, " ")} beard style`);
    if (data.moustache && data.moustache !== "none") promptParts.push(`${data.moustache} moustache`);
    if (data.sideburns && data.sideburns !== "none") promptParts.push(`${data.sideburns} sideburns`);
    if (data.eyeShape) promptParts.push(`${data.eyeShape.replace(/_/g, " ")} eyes`);
    if (data.eyeSize) promptParts.push(`${data.eyeSize} eyes`);
    if (data.eyeColor) promptParts.push(`${data.eyeColor} eye color`);
    if (data.eyebrows) promptParts.push(`${data.eyebrows} eyebrows`);
    if (data.noseShape) promptParts.push(`${data.noseShape} nose`);
    if (data.noseSize) promptParts.push(`${data.noseSize} nose`);
    if (data.nostrils) promptParts.push(`${data.nostrils} nostrils`);
    if (data.lipThickness) promptParts.push(`${data.lipThickness} lips`);
    if (data.expression) promptParts.push(`${data.expression} expression`);
    if (data.distinguishingMarks) promptParts.push(`distinguishing marks: ${data.distinguishingMarks}`);
    
    const fullPrompt = promptParts.join(", ");
    console.log("Generated prompt:", fullPrompt);
    
    // Simulate API call - replace with actual Stable Diffusion API
    setTimeout(() => {
      setGeneratedImage("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop");
      setIsLoading(false);
      toast.success("Image generated successfully!");
    }, 2000);
  };

  const handleDownload = () => {
    if (generatedImage) {
      toast.success("Image downloaded!");
      // Implement actual download logic
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Generate Suspect Image
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose your preferred method to generate a facial image
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12 mb-8">
            <TabsTrigger value="description" className="gap-2">
              <FileText className="h-4 w-4" />
              Description-Based
            </TabsTrigger>
            <TabsTrigger value="manual" className="gap-2">
              <ListChecks className="h-4 w-4" />
              Manual Selection
            </TabsTrigger>
          </TabsList>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <TabsContent value="description" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Enter Description</CardTitle>
                    <CardDescription>
                      Describe the suspect's appearance in detail
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="E.g., Male, approximately 30 years old, short dark hair, brown eyes, oval face shape, light beard..."
                      className="min-h-[200px] resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                      onClick={handleDescriptionGenerate}
                      disabled={isLoading}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate Image"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="manual" className="mt-0">
                <ManualFeatureSelector onGenerate={handleManualGenerate} isLoading={isLoading} />
              </TabsContent>
            </div>

            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Generated Image</CardTitle>
                  <CardDescription>
                    Your AI-generated suspect image will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedImage ? (
                    <div className="space-y-4">
                      <div className="rounded-lg overflow-hidden border shadow-[var(--shadow-card)]">
                        <img
                          src={generatedImage}
                          alt="Generated suspect"
                          className="w-full h-auto"
                        />
                      </div>
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="w-full"
                        size="lg"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Image
                      </Button>
                    </div>
                  ) : (
                    <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                      <p className="text-muted-foreground text-center p-4">
                        Generated image will appear here
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Generate;
