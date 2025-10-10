import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BasicIdentitySection } from "./generator/BasicIdentitySection";
import { SkinComplexionSection } from "./generator/SkinComplexionSection";
import { FaceShapeSection } from "./generator/FaceShapeSection";
import { HairSection } from "./generator/HairSection";
import { FacialHairSection } from "./generator/FacialHairSection";
import { EyesSection } from "./generator/EyesSection";
import { NoseSection } from "./generator/NoseSection";
import { MouthSection } from "./generator/MouthSection";
import { AccessoriesSection } from "./generator/AccessoriesSection";
import { ExpressionSection } from "./generator/ExpressionSection";
import { PreviewPanel } from "./generator/PreviewPanel";
import { Loader2 } from "lucide-react";

interface ManualFeatureSelectorProps {
  onGenerate: (features: any) => void;
  isLoading: boolean;
  generatedImage: string | null;
  onDownload: () => void;
}

export const ManualFeatureSelector = ({ 
  onGenerate, 
  isLoading, 
  generatedImage,
  onDownload 
}: ManualFeatureSelectorProps) => {
  const [formData, setFormData] = useState({
    // Basic Identity
    gender: "",
    age: "",
    height: "",
    region: "",
    
    // Skin/Complexion
    skinTone: "",
    marks: "",
    
    // Face Shape
    faceShape: "",
    jawline: "",
    chin: "",
    forehead: "",
    
    // Hair
    hairLength: "",
    hairColor: "",
    hairTexture: "",
    hairline: "",
    hairAccessories: [] as string[],
    
    // Facial Hair
    beard: "",
    beardStyle: "",
    moustache: "",
    sideburns: "",
    
    // Eyes
    eyeShape: "",
    eyeSize: "",
    eyeColor: "",
    eyebrows: "",
    eyeAccessories: [] as string[],
    
    // Nose
    noseShape: "",
    noseSize: "",
    nostrils: "",
    
    // Mouth
    lipThickness: "",
    teethMarks: [] as string[],
    teethOther: "",
    
    // Accessories
    earrings: [] as string[],
    chains: false,
    facialTattoos: false,
    tattooDescription: "",
    
    // Expression
    generalLook: "",
    eyeExpression: "",
    mouthExpression: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['gender', 'age', 'skinTone', 'faceShape', 'hairColor', 'eyeColor'];
    const missing = required.filter(field => !formData[field as keyof typeof formData]);
    
    if (missing.length > 0) {
      toast.error("Please fill in all required fields");
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onGenerate(formData);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="p-6 space-y-8">
              <BasicIdentitySection
                values={{
                  gender: formData.gender,
                  age: formData.age,
                  height: formData.height,
                  region: formData.region,
                }}
                onChange={handleChange}
              />
              
              <Separator />
              
              <SkinComplexionSection
                values={{
                  skinTone: formData.skinTone,
                  marks: formData.marks,
                }}
                onChange={handleChange}
              />
              
              <Separator />
              
              <FaceShapeSection
                values={{
                  faceShape: formData.faceShape,
                  jawline: formData.jawline,
                  chin: formData.chin,
                  forehead: formData.forehead,
                }}
                onChange={handleChange}
              />
              
              <Separator />
              
              <HairSection
                values={{
                  hairLength: formData.hairLength,
                  hairColor: formData.hairColor,
                  hairTexture: formData.hairTexture,
                  hairline: formData.hairline,
                  hairAccessories: formData.hairAccessories,
                }}
                onChange={handleChange}
              />
              
              <Separator />
              
              <FacialHairSection
                gender={formData.gender}
                values={{
                  beard: formData.beard,
                  beardStyle: formData.beardStyle,
                  moustache: formData.moustache,
                  sideburns: formData.sideburns,
                }}
                onChange={handleChange}
              />
              
              <Separator />
              
              <EyesSection
                values={{
                  eyeShape: formData.eyeShape,
                  eyeSize: formData.eyeSize,
                  eyeColor: formData.eyeColor,
                  eyebrows: formData.eyebrows,
                  eyeAccessories: formData.eyeAccessories,
                }}
                onChange={handleChange}
              />
              
              <Separator />
              
              <NoseSection
                values={{
                  noseShape: formData.noseShape,
                  noseSize: formData.noseSize,
                  nostrils: formData.nostrils,
                }}
                onChange={handleChange}
              />
              
              <Separator />
              
              <MouthSection
                values={{
                  lipThickness: formData.lipThickness,
                  teethMarks: formData.teethMarks,
                  teethOther: formData.teethOther,
                }}
                onChange={handleChange}
              />
              
              <Separator />
              
              <AccessoriesSection
                values={{
                  earrings: formData.earrings,
                  chains: formData.chains,
                  facialTattoos: formData.facialTattoos,
                  tattooDescription: formData.tattooDescription,
                }}
                onChange={handleChange}
              />
              
              <Separator />
              
              <ExpressionSection
                values={{
                  generalLook: formData.generalLook,
                  eyeExpression: formData.eyeExpression,
                  mouthExpression: formData.mouthExpression,
                }}
                onChange={handleChange}
              />
              
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Criminal Face...
                    </>
                  ) : (
                    "Generate Criminal Face"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      
      <div className="lg:col-span-1">
        <PreviewPanel
          generatedImage={generatedImage}
          isLoading={isLoading}
          onDownload={onDownload}
        />
      </div>
    </div>
  );
};
