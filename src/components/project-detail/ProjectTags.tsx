interface ProjectTagsProps {
  tags: string[];
}

export default function ProjectTags({ tags }: ProjectTagsProps) {
  return (
    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
      <h3 className="font-bold text-foreground mb-3 text-sm sm:text-base">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
