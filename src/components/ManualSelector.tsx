import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  question: string;
  options: {
    label: string;
    snippet: string;
  }[];
}

const questions: Question[] = [
  {
    id: "gender",
    question: "What is the suspect's gender?",
    options: [
      { label: "Male", snippet: "male person" },
      { label: "Female", snippet: "female person" },
      { label: "Non-binary", snippet: "person" },
    ],
  },
  {
    id: "age",
    question: "Approximate age range?",
    options: [
      { label: "18-25 years", snippet: "young adult around 20 years old" },
      { label: "26-35 years", snippet: "person in their early 30s" },
      { label: "36-50 years", snippet: "middle-aged person around 40 years old" },
      { label: "50+ years", snippet: "older person around 55 years old" },
    ],
  },
  {
    id: "skin",
    question: "Skin tone?",
    options: [
      { label: "Very Fair", snippet: "very fair skin tone" },
      { label: "Fair", snippet: "fair skin tone" },
      { label: "Medium", snippet: "medium skin tone" },
      { label: "Olive", snippet: "olive skin tone" },
      { label: "Brown", snippet: "brown skin tone" },
      { label: "Dark", snippet: "dark skin tone" },
    ],
  },
  {
    id: "face",
    question: "Face shape?",
    options: [
      { label: "Oval", snippet: "oval face shape" },
      { label: "Round", snippet: "round face shape" },
      { label: "Square", snippet: "square face shape" },
      { label: "Heart", snippet: "heart-shaped face" },
      { label: "Long", snippet: "long face shape" },
    ],
  },
  {
    id: "hair",
    question: "Hair color and style?",
    options: [
      { label: "Short Black Hair", snippet: "short black hair" },
      { label: "Short Brown Hair", snippet: "short brown hair" },
      { label: "Short Blonde Hair", snippet: "short blonde hair" },
      { label: "Long Black Hair", snippet: "long black hair" },
      { label: "Long Brown Hair", snippet: "long brown hair" },
      { label: "Bald", snippet: "bald head" },
    ],
  },
  {
    id: "eyes",
    question: "Eye color?",
    options: [
      { label: "Brown", snippet: "brown eyes" },
      { label: "Blue", snippet: "blue eyes" },
      { label: "Green", snippet: "green eyes" },
      { label: "Hazel", snippet: "hazel eyes" },
      { label: "Gray", snippet: "gray eyes" },
    ],
  },
  {
    id: "facial_hair",
    question: "Facial hair?",
    options: [
      { label: "Clean Shaven", snippet: "clean shaven face" },
      { label: "Light Stubble", snippet: "light stubble" },
      { label: "Full Beard", snippet: "full beard" },
      { label: "Goatee", snippet: "goatee" },
      { label: "Mustache", snippet: "mustache" },
    ],
  },
];

interface ManualSelectorProps {
  onGenerate: (snippets: string[]) => void;
  isLoading: boolean;
}

export const ManualSelector = ({ onGenerate, isLoading }: ManualSelectorProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState<string[]>(new Array(questions.length).fill(""));

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelect = (snippet: string) => {
    const newSelections = [...selections];
    newSelections[currentQuestion] = snippet;
    setSelections(newSelections);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleGenerate = () => {
    const selectedSnippets = selections.filter(s => s !== "");
    onGenerate(selectedSnippets);
  };

  const canProceed = selections[currentQuestion] !== "";
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allQuestionsAnswered = selections.every(s => s !== "");

  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>Step-by-Step Selection</CardTitle>
            <span className="text-sm text-muted-foreground font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <CardDescription className="text-base pt-2">
          {questions[currentQuestion].question}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {questions[currentQuestion].options.map((option, idx) => (
            <Button
              key={idx}
              variant="selection"
              onClick={() => handleSelect(option.snippet)}
              className={
                selections[currentQuestion] === option.snippet
                  ? "border-primary bg-primary/10"
                  : ""
              }
            >
              <span className="font-medium text-base">{option.label}</span>
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 gap-3">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex-1"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleGenerate}
              disabled={!allQuestionsAnswered || isLoading}
              className="flex-1"
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
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex-1"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
