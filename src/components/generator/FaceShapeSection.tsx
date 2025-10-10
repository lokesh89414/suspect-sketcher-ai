import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FaceShapeSectionProps {
  values: {
    faceShape: string;
    jawline: string;
    chin: string;
    forehead: string;
  };
  onChange: (field: string, value: string) => void;
}

export const FaceShapeSection = ({ values, onChange }: FaceShapeSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Face Shape & Structure</h3>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Face Shape *</Label>
        <RadioGroup value={values.faceShape} onValueChange={(val) => onChange('faceShape', val)}>
          {['Round', 'Oval', 'Square', 'Rectangular', 'Diamond', 'Heart-shaped'].map((shape) => (
            <div key={shape} className="flex items-center space-x-2">
              <RadioGroupItem value={shape.toLowerCase()} id={`face-${shape}`} />
              <Label htmlFor={`face-${shape}`} className="font-normal cursor-pointer">{shape}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Jawline</Label>
        <RadioGroup value={values.jawline} onValueChange={(val) => onChange('jawline', val)}>
          {['Prominent', 'Soft', 'Pointed', 'Wide'].map((jaw) => (
            <div key={jaw} className="flex items-center space-x-2">
              <RadioGroupItem value={jaw.toLowerCase()} id={`jaw-${jaw}`} />
              <Label htmlFor={`jaw-${jaw}`} className="font-normal cursor-pointer">{jaw}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Chin</Label>
        <RadioGroup value={values.chin} onValueChange={(val) => onChange('chin', val)}>
          {['Pointed', 'Round', 'Dimpled', 'Broad'].map((chin) => (
            <div key={chin} className="flex items-center space-x-2">
              <RadioGroupItem value={chin.toLowerCase()} id={`chin-${chin}`} />
              <Label htmlFor={`chin-${chin}`} className="font-normal cursor-pointer">{chin}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Forehead</Label>
        <RadioGroup value={values.forehead} onValueChange={(val) => onChange('forehead', val)}>
          {['High', 'Low', 'Broad', 'Narrow'].map((forehead) => (
            <div key={forehead} className="flex items-center space-x-2">
              <RadioGroupItem value={forehead.toLowerCase()} id={`forehead-${forehead}`} />
              <Label htmlFor={`forehead-${forehead}`} className="font-normal cursor-pointer">{forehead}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
