import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface AccessoriesSectionProps {
  values: {
    earrings: string[];
    chains: boolean;
    facialTattoos: boolean;
    tattooDescription: string;
  };
  onChange: (field: string, value: string | boolean | string[]) => void;
}

const earringOptions = ['None', 'Stud', 'Hoop', 'Other'];

export const AccessoriesSection = ({ values, onChange }: AccessoriesSectionProps) => {
  const handleEarringChange = (option: string, checked: boolean) => {
    let newEarrings = [...values.earrings];
    if (option === 'None') {
      newEarrings = checked ? ['None'] : [];
    } else {
      if (checked) {
        newEarrings = newEarrings.filter(e => e !== 'None');
        newEarrings.push(option);
      } else {
        newEarrings = newEarrings.filter(e => e !== option);
      }
    }
    onChange('earrings', newEarrings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Facial Accessories & Tattoos</h3>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Earrings</Label>
        <div className="space-y-2">
          {earringOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`earring-${option}`}
                checked={values.earrings.includes(option)}
                onCheckedChange={(checked) => handleEarringChange(option, checked as boolean)}
              />
              <Label htmlFor={`earring-${option}`} className="font-normal cursor-pointer">{option}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Chains/Necklace Visible</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="chains"
            checked={values.chains}
            onCheckedChange={(checked) => onChange('chains', checked as boolean)}
          />
          <Label htmlFor="chains" className="font-normal cursor-pointer">Visible chains or necklace near face/neck</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Facial Tattoos</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="facialTattoos"
            checked={values.facialTattoos}
            onCheckedChange={(checked) => onChange('facialTattoos', checked as boolean)}
          />
          <Label htmlFor="facialTattoos" className="font-normal cursor-pointer">Has facial tattoos</Label>
        </div>
        {values.facialTattoos && (
          <Textarea
            placeholder="Describe the facial tattoos (location, design, etc.)..."
            value={values.tattooDescription}
            onChange={(e) => onChange('tattooDescription', e.target.value)}
            className="mt-2"
          />
        )}
      </div>
    </div>
  );
};
