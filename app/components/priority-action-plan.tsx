'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component from Shadcn
import { Lightbulb, Wrench } from "lucide-react";

interface PriorityAction {
  title: string;
  impact: "High" | "Medium" | "Low";
  effort: "High" | "Medium" | "Low";
  whyItMatters: string;
  howToFix_ManagerView: string;
  howToFix_DeveloperView: string;
}

const badgeColor = (type: "Impact" | "Effort", value: string) => {
    if (type === 'Impact') {
        if (value === 'High') return 'bg-red-500 hover:bg-red-500';
        if (value === 'Medium') return 'bg-yellow-500 hover:bg-yellow-500';
        return 'bg-green-500 hover:bg-green-500';
    }
    // Effort
    if (value === 'High') return 'bg-red-200 text-red-900 hover:bg-red-200';
    if (value === 'Medium') return 'bg-yellow-200 text-yellow-900 hover:bg-yellow-200';
    return 'bg-green-200 text-green-900 hover:bg-green-200';
}

export function PriorityActionPlan({ plan }: { plan: PriorityAction[] }) {
  if (!plan || plan.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Priority Action Plan</h2>
        <p>Great news! The AI analysis found no high-priority issues to address.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Priority Action Plan</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {plan.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg">
            <AccordionTrigger className="p-4 text-lg hover:no-underline">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left">
                <span className="font-semibold">{item.title}</span>
                <div className="flex gap-2">
                  <Badge className={badgeColor("Impact", item.impact)}>Impact: {item.impact}</Badge>
                  <Badge variant="outline" className={badgeColor("Effort", item.effort)}>Effort: {item.effort}</Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-6">
              <div className="prose prose-invert max-w-none">
                <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 mt-1 text-primary shrink-0"/>
                    <div>
                        <h4 className="font-semibold">Why it Matters</h4>
                        <p className="text-muted-foreground">{item.whyItMatters}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <Wrench className="h-5 w-5 mt-1 text-primary shrink-0"/>
                    <div>
                        <h4 className="font-semibold">How to Fix (Action Plan)</h4>
                        <p className="text-muted-foreground">{item.howToFix_ManagerView}</p>
                    </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}