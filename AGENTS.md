# AI Coding Assistant Guide

This guide tells AI assistants (Cursor, GitHub Copilot, Claude Code) how to work with this codebase.

## Tech Stack

- **Frontend**: Next.js 16+ (App Router) + React 19+ + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI + Base UI
- **Forms**: React Hook Form + Zod
- **Code Quality**: ESLint + Prettier + TypeScript strict mode

## Core Principles

1. **Simplicity**: Don't over-engineer. Solve the exact problem.
2. **Clean Code**: Follow SOLID principles and functional patterns.
3. **Type Safety**: Use TypeScript strictly.
4. **Best Practices**: Follow conventions, but keep things practical.

## Project Structure

```
app/
├── (public)/            # Public pages
├── (private)/           # Protected pages
├── api/                 # API routes
└── globals.css

components/
├── ui/                  # Shadcn UI components
└── [feature-name].tsx   # Feature components

lib/
├── utils.ts            # Utilities
└── supabase.ts         # DB clients
└── [feature-name].ts   #  Utils for each feature integration

types/
└── index.ts            # Type definitions
└── [feature-name].ts   # Type definition for each feature
config.ts               # App config
```

## Code Standards

### Naming Conventions

| Type           | Convention               | Example                 |
| -------------- | ------------------------ | ----------------------- |
| Components     | PascalCase               | `UserProfile`           |
| Files          | kebab-case               | `user-profile.tsx`      |
| Directories    | kebab-case               | `auth-wizard/`          |
| Functions      | camelCase                | `handleSubmit`          |
| Hooks          | camelCase + 'use' prefix | `useAuth`               |
| Boolean vars   | verb prefix              | `isLoading`, `hasError` |
| Constants      | UPPERCASE                | `API_URL`               |
| Event handlers | 'handle' prefix          | `handleClick`           |

### Code Style

- **Indentation**: Tabs
- **Quotes**: Single quotes
- **Semicolons**: No (unless needed)
- **Equality**: Always `===`
- **Line length**: 80 characters max
- **Spacing**: After keywords, before function parens, after commas
- **Trailing commas**: Yes in multiline structures

### Approved Abbreviations

Only use these:

- `err` (error)
- `req` (request)
- `res` (response)
- `props` (properties)
- `ref` (reference)

## React Best Practices

### Component Structure

```tsx
// Good: Clear, typed, functional
interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

export function UserProfile({ userId, onUpdate }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### Performance Rules

- Use `useCallback` for callback functions passed as props
- Use `useMemo` for expensive calculations
- Use `React.memo()` for components that re-render often
- Don't define functions inline in JSX
- Use dynamic imports for code splitting
- Use proper keys in lists (never use index)

```tsx
// Good: Optimized list
export const UserList = memo(({ users, onSelect }: UserListProps) => {
  const sortedUsers = useMemo(
    () => users.sort((a, b) => a.name.localeCompare(b.name)),
    [users],
  );

  const handleClick = useCallback(
    (userId: string) => onSelect(userId),
    [onSelect],
  );

  return (
    <div>
      {sortedUsers.map((user) => (
        <div key={user.id} onClick={() => handleClick(user.id)}>
          {user.name}
        </div>
      ))}
    </div>
  );
});
```

## Next.js Guidelines

### Server vs Client Components

**Use Server Components (default) for:**

- Data fetching
- Static content
- SEO-critical content

**Use Client Components (`'use client'`) only for:**

- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- State (useState, useReducer)
- Effects (useEffect)
- Client-only libraries

### Data Fetching Pattern

```tsx
// Good: Server component with URL params
interface PostsPageProps {
  searchParams: { page?: string; category?: string };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category || "all";

  const posts = await fetchPosts({ page, category });

  return (
    <div>
      <h1>Posts</h1>
      <PostsList posts={posts} />
      <Pagination currentPage={page} />
    </div>
  );
}
```

### Built-in Components

Always use:

- `Image` for images (auto-optimization)
- `Link` for navigation (client-side)
- `Script` for external scripts
- Proper metadata API for SEO

## TypeScript Patterns

### Type Definitions

```tsx
// Good: Clear interfaces and utilities
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  createdAt: Date;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Use utility types
type UserCreate = Omit<User, "id" | "createdAt">;
type UserUpdate = Partial<Pick<User, "name" | "email">>;

// Type guards
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" && obj !== null && "id" in obj && "email" in obj
  );
}
```

### TypeScript Rules

- Enable strict mode
- Define interfaces for all props and state
- Use type guards for nullable values
- Use generics for flexible, reusable code
- Prefer `interface` over `type` for objects
- Use utility types (Partial, Pick, Omit, etc.)

## Forms & Validation

### Pattern with Zod + React Hook Form

```tsx
// Good: Type-safe form with validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "Must be 18+"),
});

type UserForm = z.infer<typeof userSchema>;

export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(data: UserForm) {
    try {
      await createUser(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register("name")} className="w-full p-2 border rounded" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

## UI & Styling

### Component Libraries

1. **Shadcn UI**: Primary component library
2. **Base UI**: For accessible primitives
3. **Radix UI**: When Shadcn doesn't cover it

### Tailwind CSS Rules

- Mobile-first responsive design
- Use CSS variables for theming
- Support dark mode
- Maintain accessible color contrast
- Use consistent spacing scale

```tsx
// Good: Responsive, accessible, dark mode
interface CardProps {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "outlined";
}

export function Card({ title, children, variant = "default" }: CardProps) {
  const variants = {
    default: "bg-white dark:bg-gray-800 shadow-md",
    outlined: "border border-gray-200 dark:border-gray-700",
  };

  return (
    <div className={`rounded-lg p-6 transition-colors ${variants[variant]}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
```

## Error Handling

### Error Boundaries

```tsx
// Good: Catches React errors
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error:", error, errorInfo);
    // Log to Sentry or similar
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Something went wrong
          </h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Security

### Input Sanitization

```tsx
// Good: Sanitize HTML before rendering
import DOMPurify from "dompurify";

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
  const clean = DOMPurify.sanitize(html);

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />
  );
}
```

### Security Checklist

- Sanitize all user input
- Validate on both client and server
- Use proper authentication
- Avoid exposing sensitive data
- Use environment variables for secrets

## Accessibility

### Requirements

- Use semantic HTML (`<nav>`, `<main>`, `<article>`)
- Add ARIA labels where needed
- Support keyboard navigation
- Manage focus properly
- Use accessible color contrast
- Follow heading hierarchy (h1 → h2 → h3)
- Make interactive elements accessible
- Show clear error messages

```tsx
// Good: Accessible form
export function AccessibleForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form role="form" aria-labelledby="form-title">
      <h2 id="form-title">User Registration</h2>

      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          required
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <div id="email-error" role="alert" className="text-red-500">
            {errors.email}
          </div>
        )}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

## Performance Optimization

### Code Splitting

```tsx
// Good: Lazy load heavy components
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));
const Settings = lazy(() => import("./Settings"));

export function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Settings />
      </Suspense>
    </div>
  );
}
```

### Performance Checklist

- Use dynamic imports for code splitting
- Lazy load non-critical components
- Cache API responses
- Optimize images with Next.js Image
- Minimize bundle size
- Use proper React optimization hooks

## Component Design Rules

### Accessibility Primitives

- **MUST** use Base UI, React Aria, or Radix for keyboard/focus behavior
- **MUST** use existing primitives in the project first
- **NEVER** mix different primitive systems
- **SHOULD** prefer Base UI for new primitives
- **MUST** add `aria-label` to icon-only buttons
- **NEVER** rebuild keyboard/focus behavior manually

### Interaction Patterns

- **MUST** use `AlertDialog` for destructive actions
- **SHOULD** use skeleton loaders for loading states
- **NEVER** use `h-screen` (use `h-dvh` instead)
- **MUST** respect `safe-area-inset` for fixed elements
- **MUST** show errors next to the action
- **NEVER** block paste in inputs

### Animation Rules

- **NEVER** add animation unless requested
- **MUST** animate only `transform` and `opacity`
- **NEVER** animate layout (`width`, `height`, `margin`, `padding`)
- **SHOULD** avoid animating `background` or `color` (except small UI)
- **SHOULD** use `ease-out` for entrance animations
- **NEVER** exceed 200ms for interaction feedback
- **MUST** pause animations when off-screen
- **MUST** respect `prefers-reduced-motion`

### Typography

- **MUST** use `text-balance` for headings
- **MUST** use `text-pretty` for body text
- **MUST** use `tabular-nums` for data/numbers
- **SHOULD** use `truncate` or `line-clamp` for dense UI
- **NEVER** modify `letter-spacing` unless requested

### Layout

- **MUST** use fixed `z-index` scale (no arbitrary values)
- **SHOULD** use `size-x` for square elements

### Performance

- **NEVER** animate large `blur()` or `backdrop-filter`
- **NEVER** use `will-change` outside active animations
- **NEVER** use `useEffect` for render logic

### Design

- **NEVER** use gradients unless requested
- **NEVER** use purple or multicolor gradients
- **NEVER** use glow effects as primary UI
- **SHOULD** use Tailwind's default shadows
- **MUST** give empty states one clear action
- **SHOULD** limit accent colors to one per view
- **SHOULD** use existing theme colors first

## Common Issues & Solutions

### Hydration Mismatch

**Problem**: Server and client render differently

**Fix**:

- Use `useEffect` for client-only code
- Use `dynamic` imports with `ssr: false`
- Check date/time formatting differences

### Large List Performance

**Problem**: Slow rendering with many items

**Fix**:

- Use virtualization
- Add pagination or infinite scroll
- Use `React.memo` and `useMemo`
- Filter/sort on server

### TypeScript Errors in Build

**Problem**: Production build fails

**Fix**:

- Enable strict mode
- Fix all type errors before deployment
- Add type definitions for libraries
- Use error boundaries

### SEO Not Working

**Problem**: Meta tags not showing

**Fix**:

- Use Next.js Metadata API
- Add Open Graph tags
- Ensure server-side rendering
- Test with social media debuggers

## Setup

### Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0
- TypeScript >= 5.0.0

### Installation

```bash
# 1. Clone repo
git clone <repo-url>

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Start dev server
npm run dev
```

### Environment Variables

```env
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key
RESEND_API_KEY=your-resend-api-key
```

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Export static files
npm run export
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
