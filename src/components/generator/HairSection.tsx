import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface HairSectionProps {
  values: {
    hairLength: string;
    hairColor: string;
    hairTexture: string;
    hairline: string;
    hairAccessories: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
}

const hairColors = [
  { id: "black", label: "Black", color: "hsl(0, 0%, 10%)" },
  { id: "dark-brown", label: "Dark Brown", color: "hsl(30, 40%, 25%)" },
  { id: "light-brown", label: "Light Brown", color: "hsl(30, 50%, 45%)" },
  { id: "grey", label: "Grey", color: "hsl(0, 0%, 60%)" },
  { id: "dyed", label: "Dyed/Highlights", color: "linear-gradient(135deg, hsl(0, 80%, 50%), hsl(280, 80%, 50%))" },
];

const accessories = ['Cap', 'Scarf', 'Hat', 'Hair clips/flowers', 'None'];

export const HairSection = ({ values, onChange }: HairSectionProps) => {
  const handleAccessoryChange = (accessory: string, checked: boolean) => {
    let newAccessories = [...values.hairAccessories];
    if (accessory === 'None') {
      newAccessories = checked ? ['None'] : [];
    } else {
      if (checked) {
        newAccessories = newAccessories.filter(a => a !== 'None');
        newAccessories.push(accessory);
      } else {
        newAccessories = newAccessories.filter(a => a !== accessory);
      }
    }
    onChange('hairAccessories', newAccessories);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hair</h3>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Length</Label>
        <RadioGroup value={values.hairLength} onValueChange={(val) => onChange('hairLength', val)}>
          {['Bald', 'Very short', 'Short', 'Medium', 'Long'].map((length) => (
            <div key={length} className="flex items-center space-x-2">
              <RadioGroupItem value={length.toLowerCase().replace(' ', '-')} id={`length-${length}`} />
              <Label htmlFor={`length-${length}`} className="font-normal cursor-pointer">{length}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base">Color *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {hairColors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => onChange('hairColor', color.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:shadow-md",
                values.hairColor === color.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div
                className="w-16 h-16 rounded-full border-2 border-border shadow-sm"
                style={{ background: color.color }}
              />
              <span className="text-sm font-medium text-center">{color.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Texture</Label>
        <RadioGroup value={values.hairTexture} onValueChange={(val) => onChange('hairTexture', val)}>
          {['Straight', 'Wavy', 'Curly', 'Coily'].map((texture) => (
            <div key={texture} className="flex items-center space-x-2">
              <RadioGroupItem value={texture.toLowerCase()} id={`texture-${texture}`} />
              <Label htmlFor={`texture-${texture}`} className="font-normal cursor-pointer">{texture}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Hairline</Label>
        <RadioGroup value={values.hairline} onValueChange={(val) => onChange('hairline', val)}>
          {['Normal', 'Receding', "Widow's Peak", 'High'].map((hairline) => (
            <div key={hairline} className="flex items-center space-x-2">
              <RadioGroupItem value={hairline.toLowerCase().replace("'", '').replace(' ', '-')} id={`hairline-${hairline}`} />
              <Label htmlFor={`hairline-${hairline}`} className="font-normal cursor-pointer">{hairline}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Accessories</Label>
        <div className="space-y-2">
          {accessories.map((accessory) => (
            <div key={accessory} className="flex items-center space-x-2">
              <Checkbox
                id={`accessory-${accessory}`}
                checked={values.hairAccessories.includes(accessory)}
                onCheckedChange={(checked) => handleAccessoryChange(accessory, checked as boolean)}
              />
              <Label htmlFor={`accessory-${accessory}`} className="font-normal cursor-pointer">{accessory}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
