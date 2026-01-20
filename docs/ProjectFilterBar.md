# ProjectFilterBar Component

Reusable filter bar component untuk filtering dan searching projects/items dengan tabs, search input, dan multiple dropdown filters.

## 📍 Location
`src/components/shared/ProjectFilterBar.tsx`

## ✨ Features
- ✅ **Tab Navigation** - Switch between different categories
- ✅ **Search Input** - Real-time search functionality
- ✅ **Multiple Filters** - Configurable dropdown filters
- ✅ **Search Button** - Optional search action button
- ✅ **Fully Responsive** - Mobile-friendly grid layout
- ✅ **TypeScript** - Full type safety

## 🎯 Usage Example

```tsx
import ProjectFilterBar from "@/components/shared/ProjectFilterBar";
import { SlidersHorizontal } from "lucide-react";

function MyPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("all");

  return (
    <ProjectFilterBar
      // Tabs configuration
      tabs={[
        { label: "Semua Project", value: "all" },
        { label: "Project Berbayar", value: "paid" },
        { label: "Project Gratis", value: "free" },
      ]}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      
      // Search configuration
      searchPlaceholder="Cari project..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchColSpan={3}
      
      // Filters configuration
      filters={[
        {
          label: "Kategori",
          value: category,
          onChange: setCategory,
          options: [
            { label: "Semua", value: "all" },
            { label: "Web Dev", value: "web" },
            { label: "Mobile", value: "mobile" },
          ],
          colSpan: 2,
        },
        {
          label: "Durasi",
          value: duration,
          onChange: setDuration,
          options: [
            { label: "Semua", value: "all" },
            { label: "< 1 Bulan", value: "short" },
            { label: "1-3 Bulan", value: "medium" },
          ],
          icon: <SlidersHorizontal className="h-3.5 w-3.5" />,
          colSpan: 2,
        },
      ]}
      
      // Search button
      onSearchClick={() => console.log("Search clicked")}
      showSearchButton={true}
    />
  );
}
```

## 📋 Props

### Main Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tabs` | `TabConfig[]` | No | `[]` | Array of tab configurations |
| `selectedTab` | `string` | No | - | Currently selected tab value |
| `onTabChange` | `(value: string) => void` | No | - | Callback when tab changes |
| `searchPlaceholder` | `string` | No | `"Cari..."` | Search input placeholder |
| `searchValue` | `string` | No | `""` | Search input value |
| `onSearchChange` | `(value: string) => void` | No | - | Callback when search changes |
| `searchColSpan` | `number` | No | `3` | Grid column span for search (1-12) |
| `filters` | `FilterConfig[]` | No | `[]` | Array of filter configurations |
| `onSearchClick` | `() => void` | No | - | Callback when search button clicked |
| `showSearchButton` | `boolean` | No | `true` | Show/hide search button |

### TabConfig Type

```typescript
interface TabConfig {
  label: string;  // Display text
  value: string;  // Tab value
}
```

### FilterConfig Type

```typescript
interface FilterConfig {
  label: string;                    // Filter label
  value: string;                    // Current selected value
  options: FilterOption[];          // Dropdown options
  onChange: (value: string) => void; // Change handler
  icon?: React.ReactNode;           // Optional icon
  colSpan?: number;                 // Grid column span (1-12)
}
```

### FilterOption Type

```typescript
interface FilterOption {
  label: string;  // Display text
  value: string;  // Option value
}
```

## 🎨 Layout Grid

The filter bar uses a 12-column grid system:

```
[Tab Tab Tab]                          // Full width tabs
[Search | Filter1 | Filter2 | Filter3 | Sort | 🔍]
  3 cols   2 cols    2 cols    2 cols   2 cols  1 col
```

Adjust `colSpan` for each filter to control width.

## 💡 Tips

1. **Responsive**: Component automatically stacks on mobile
2. **Flexible**: Add/remove filters as needed
3. **Icons**: Add icons to filters for better UX
4. **Search Button**: Can be hidden with `showSearchButton={false}`
5. **Grid Control**: Use `colSpan` to balance filter widths

## 🔌 Integration with API

```typescript
// Example with API call
const handleSearchClick = async () => {
  const params = {
    type: selectedTab,
    search: searchQuery,
    category: category,
    duration: duration,
  };
  
  const response = await fetch('/api/projects?' + new URLSearchParams(params));
  const data = await response.json();
  setProjects(data);
};

<ProjectFilterBar
  // ... other props
  onSearchClick={handleSearchClick}
/>
```

## 📱 Mobile Behavior

- Tabs wrap to multiple rows
- Grid becomes single column
- Dropdowns expand to full width
- Search button remains visible

## 🎯 Use Cases

- ✅ Project listing pages
- ✅ Job board filters
- ✅ Product catalogs
- ✅ Article/blog filters
- ✅ Any filterable content list
