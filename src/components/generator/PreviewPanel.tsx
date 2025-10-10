import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface PreviewPanelProps {
  generatedImage: string | null;
  isLoading: boolean;
  onDownload: () => void;
}

export const PreviewPanel = ({ generatedImage, isLoading, onDownload }: PreviewPanelProps) => {
  return (
    <Card className="sticky top-20 h-fit">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>
          Generated suspect image will appear here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground text-center">Generating image...</p>
          </div>
        ) : generatedImage ? (
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border shadow-[var(--shadow-card)]">
              <img
                src={generatedImage}
                alt="Generated suspect"
                className="w-full h-auto"
              />
            </div>
            <Button
              onClick={onDownload}
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
              Fill in the details and click Generate to create the suspect image
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
