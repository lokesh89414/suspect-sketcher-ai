import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicIdentitySectionProps {
  values: {
    gender: string;
    age: string;
    height: string;
    region: string;
  };
  onChange: (field: string, value: string) => void;
}

export const BasicIdentitySection = ({ values, onChange }: BasicIdentitySectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Identity</h3>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Gender *</Label>
        <RadioGroup value={values.gender} onValueChange={(val) => onChange('gender', val)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="font-normal cursor-pointer">Other</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="age" className="text-base">Approximate Age *</Label>
        <Input
          id="age"
          type="number"
          placeholder="e.g., 30"
          value={values.age}
          onChange={(e) => onChange('age', e.target.value)}
          min="1"
          max="120"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="height" className="text-base">Approximate Height (Optional)</Label>
        <Input
          id="height"
          type="text"
          placeholder="e.g., 5'8&quot; or 173cm"
          value={values.height}
          onChange={(e) => onChange('height', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="region" className="text-base">Apparent Region</Label>
        <Select value={values.region} onValueChange={(val) => onChange('region', val)}>
          <SelectTrigger id="region">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="south-indian">South Indian</SelectItem>
            <SelectItem value="north-indian">North Indian</SelectItem>
            <SelectItem value="north-east-indian">North-East Indian</SelectItem>
            <SelectItem value="foreign">Foreign</SelectItem>
            <SelectItem value="unknown">Don't know</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
