"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card transition-all duration-200 hover:border-primary/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <Plus 
          className={`h-5 w-5 text-foreground flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 pt-2">
          <p className="text-muted-foreground text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
