import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface NoseSectionProps {
  values: {
    noseShape: string;
    noseSize: string;
    nostrils: string;
  };
  onChange: (field: string, value: string) => void;
}

export const NoseSection = ({ values, onChange }: NoseSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Nose</h3>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Shape</Label>
        <RadioGroup value={values.noseShape} onValueChange={(val) => onChange('noseShape', val)}>
          {['Sharp', 'Broad', 'Flat', 'Hooked', 'Pointed', 'Upturned'].map((shape) => (
            <div key={shape} className="flex items-center space-x-2">
              <RadioGroupItem value={shape.toLowerCase()} id={`nose-shape-${shape}`} />
              <Label htmlFor={`nose-shape-${shape}`} className="font-normal cursor-pointer">{shape}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Size</Label>
        <RadioGroup value={values.noseSize} onValueChange={(val) => onChange('noseSize', val)}>
          {['Small', 'Medium', 'Large'].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <RadioGroupItem value={size.toLowerCase()} id={`nose-size-${size}`} />
              <Label htmlFor={`nose-size-${size}`} className="font-normal cursor-pointer">{size}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Nostrils</Label>
        <RadioGroup value={values.nostrils} onValueChange={(val) => onChange('nostrils', val)}>
          {['Narrow', 'Flared'].map((nostril) => (
            <div key={nostril} className="flex items-center space-x-2">
              <RadioGroupItem value={nostril.toLowerCase()} id={`nostril-${nostril}`} />
              <Label htmlFor={`nostril-${nostril}`} className="font-normal cursor-pointer">{nostril}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
