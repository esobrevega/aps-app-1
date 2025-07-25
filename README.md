This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# APS App - Workspace Management System

This is a full-stack workspace management application built with Next.js, Appwrite, and Hono. It provides a platform for users to create, manage, and collaborate within different workspaces. The application features user authentication, workspace creation, member invitations via unique codes, and role-based access control.

## ✨ Key Features

-   **User Authentication**: Secure sign-up, sign-in, and logout functionality handled by Appwrite.
-   **Workspace Management**: Users can create new workspaces, update existing ones (name and icon), and switch between them.
-   **Member Invitations**: Each workspace has a unique, shareable invite code and link to add new members.
-   **Role Management**: Members can be assigned roles (e.g., Admin, Member) within a workspace.
-   **Settings & Security**: Admins can manage workspace settings, reset invite codes, and delete the workspace.
-   **Responsive UI**: A modern and responsive interface built with shadcn/ui, suitable for both desktop and mobile devices.

## 🛠️ Technology Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router & Turbopack)
-   **Backend-as-a-Service**: [Appwrite](https://appwrite.io/) (for Database, Authentication, and Storage)
-   **API**: [Hono](https://hono.dev/) (for creating fast, lightweight API routes)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: [TanStack Query](https://tanstack.com/query/latest) (for server-state management)
-   **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) (for type-safe validation)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

-   Node.js (version 20 or higher)
-   An active Appwrite instance. You can set one up locally using Docker or use Appwrite Cloud.

### Appwrite Setup

1.  Create a new Appwrite Project.
2.  **Database**: Create a new database and the following collections:
    -   `workspaces`: for storing workspace data.
    -   `members`: for managing user-workspace relationships and roles.
3.  **Authentication**: Enable the Email/Password authentication provider.
4.  **Storage**: Create a new bucket (e.g., `images`) to store workspace icons.
5.  **API Keys**: Generate an API Key with necessary permissions (`databases`, `users`, `storage`).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/esobrevega/aps-app-1.git
    cd aps-app-1
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the following variables, replacing the placeholder values with your Appwrite project details.

    ```env
    # Appwrite Configuration
    NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
    NEXT_PUBLIC_APPWRITE_PROJECT=YOUR_PROJECT_ID
    NEXT_APPWRITE_KEY=YOUR_SERVER_API_KEY

    # Appwrite Database & Collection IDs
    NEXT_PUBLIC_APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
    NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=YOUR_WORKSPACES_COLLECTION_ID
    NEXT_PUBLIC_APPWRITE_MEMBERS_ID=YOUR_MEMBERS_COLLECTION_ID

    # Appwrite Storage Bucket ID
    NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=YOUR_IMAGES_BUCKET_ID

    # Application URL for API client
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📂 Project Structure

The project follows a feature-sliced architecture to keep the codebase organized and scalable.

```
src
├── app/                  # Next.js App Router (Pages, Layouts, API)
│   ├── (auth)/             # Authentication-related pages (sign-in, sign-up)
│   ├── (dashboard)/        # Main application dashboard layout and pages
│   ├── (standalone)/       # Pages with a minimal layout (create workspace, settings)
│   └── api/[[...route]]/   # Hono API endpoint
├── components/           # Reusable UI components
│   └── ui/                 # shadcn/ui components
├── features/             # Feature-sliced modules
│   ├── auth/               # Authentication logic and components
│   ├── members/            # Member management logic
│   └── workspaces/         # Workspace management logic
├── hooks/                # Custom React hooks
└── lib/                  # Core utilities and library configurations
    ├── appwrite.ts         # Appwrite admin and session clients
    ├── rpc.ts              # Hono RPC client for type-safe API calls
    ├── session-middleware.ts # Hono middleware for session handling
    └── utils.ts            # General utility functions
```

## 🌐 API

The backend API is built with Hono and served from a single Next.js route handler at `/api/[[...route]]`. This provides a lightweight and efficient way to handle server-side logic.

-   `/api/auth`: Handles user registration, login, logout, and current session retrieval.
-   `/api/workspaces`: Manages CRUD operations for workspaces, member invitations, and settings.
-   `/api/members`: Manages fetching, updating roles, and deleting members from a workspace.
