import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface EyesSectionProps {
  values: {
    eyeShape: string;
    eyeSize: string;
    eyeColor: string;
    eyebrows: string;
    eyeAccessories: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
}

const eyeColors = [
  { id: "black", label: "Black", color: "hsl(0, 0%, 10%)" },
  { id: "brown", label: "Brown", color: "hsl(30, 50%, 30%)" },
  { id: "hazel", label: "Hazel", color: "hsl(30, 60%, 40%)" },
  { id: "grey", label: "Grey", color: "hsl(0, 0%, 50%)" },
  { id: "other", label: "Other", color: "hsl(200, 70%, 50%)" },
];

const accessories = ['Glasses', 'Sunglasses', 'None'];

export const EyesSection = ({ values, onChange }: EyesSectionProps) => {
  const handleAccessoryChange = (accessory: string, checked: boolean) => {
    let newAccessories = [...values.eyeAccessories];
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
    onChange('eyeAccessories', newAccessories);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Eyes & Eyebrows</h3>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Eye Shape</Label>
        <RadioGroup value={values.eyeShape} onValueChange={(val) => onChange('eyeShape', val)}>
          {['Almond', 'Round', 'Hooded', 'Slanted', 'Deep-set'].map((shape) => (
            <div key={shape} className="flex items-center space-x-2">
              <RadioGroupItem value={shape.toLowerCase().replace('-', '')} id={`eye-shape-${shape}`} />
              <Label htmlFor={`eye-shape-${shape}`} className="font-normal cursor-pointer">{shape}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Eye Size</Label>
        <RadioGroup value={values.eyeSize} onValueChange={(val) => onChange('eyeSize', val)}>
          {['Small', 'Average', 'Large'].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <RadioGroupItem value={size.toLowerCase()} id={`eye-size-${size}`} />
              <Label htmlFor={`eye-size-${size}`} className="font-normal cursor-pointer">{size}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base">Eye Color *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {eyeColors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => onChange('eyeColor', color.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:shadow-md",
                values.eyeColor === color.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div
                className="w-16 h-16 rounded-full border-2 border-border shadow-sm"
                style={{ backgroundColor: color.color }}
              />
              <span className="text-sm font-medium text-center">{color.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Eyebrows</Label>
        <RadioGroup value={values.eyebrows} onValueChange={(val) => onChange('eyebrows', val)}>
          {['Thick', 'Thin', 'Arched', 'Straight', 'Bushy', 'Unibrow'].map((brow) => (
            <div key={brow} className="flex items-center space-x-2">
              <RadioGroupItem value={brow.toLowerCase()} id={`brow-${brow}`} />
              <Label htmlFor={`brow-${brow}`} className="font-normal cursor-pointer">{brow}</Label>
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
                id={`eye-accessory-${accessory}`}
                checked={values.eyeAccessories.includes(accessory)}
                onCheckedChange={(checked) => handleAccessoryChange(accessory, checked as boolean)}
              />
              <Label htmlFor={`eye-accessory-${accessory}`} className="font-normal cursor-pointer">{accessory}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
