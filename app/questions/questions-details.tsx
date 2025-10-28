import { cn } from "@/lib/utils";

type QuestionDetailsProps = {
  number: string;
  title: string;
  isActive?: boolean;
};

export default function QuestionDetails({
  number,
  title,
  isActive,
}: QuestionDetailsProps) {
  return (
    <>
      <div
        className={cn(
          "bg-secondary text-foreground w-fit rounded-sm p-3 transition-colors",
          isActive && "bg-foreground text-background"
        )}
      >
        <span className="text-black">{number}</span>
      </div>
      <div className="text-center">
        <p className="mb-2 text-base font-medium">{title}</p>
        {/* <p className="text-muted-foreground text-sm text-wrap">{description}</p> */}
      </div>
    </>
  );
}
