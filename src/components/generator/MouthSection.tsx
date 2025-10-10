import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface MouthSectionProps {
  values: {
    lipThickness: string;
    teethMarks: string[];
    teethOther: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

const teethOptions = ['Gap teeth', 'Missing tooth', 'Braces', 'Gold tooth'];

export const MouthSection = ({ values, onChange }: MouthSectionProps) => {
  const handleTeethChange = (option: string, checked: boolean) => {
    let newMarks = [...values.teethMarks];
    if (checked) {
      newMarks.push(option);
    } else {
      newMarks = newMarks.filter(m => m !== option);
    }
    onChange('teethMarks', newMarks);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Mouth & Lips</h3>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Lip Thickness</Label>
        <RadioGroup value={values.lipThickness} onValueChange={(val) => onChange('lipThickness', val)}>
          {['Thin', 'Medium', 'Full'].map((thickness) => (
            <div key={thickness} className="flex items-center space-x-2">
              <RadioGroupItem value={thickness.toLowerCase()} id={`lip-${thickness}`} />
              <Label htmlFor={`lip-${thickness}`} className="font-normal cursor-pointer">{thickness}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Distinguishing Marks</Label>
        <div className="space-y-2">
          {teethOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`teeth-${option}`}
                checked={values.teethMarks.includes(option)}
                onCheckedChange={(checked) => handleTeethChange(option, checked as boolean)}
              />
              <Label htmlFor={`teeth-${option}`} className="font-normal cursor-pointer">{option}</Label>
            </div>
          ))}
        </div>
        <Textarea
          placeholder="Other distinguishing marks..."
          value={values.teethOther}
          onChange={(e) => onChange('teethOther', e.target.value)}
          className="mt-2"
        />
      </div>
    </div>
  );
};
