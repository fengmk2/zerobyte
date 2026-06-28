## Important instructions

- Never create migration files manually. Always use the provided command to generate migrations
- If you realize an automated migration is incorrect, make sure to remove all the associated entries from the `_journal.json` and the newly created files located in `app/drizzle/` before re-generating the migration
- The dev server runs through Portless. Start it with `bun run dev`, then use `portless get zerobyte` to get the current worktree-specific URL. Do not assume a fixed port like `3000` or `4096`. Username is `admin` and password is `password`
- The repo is https://github.com/nicotsx/zerobyte
- If you need to run a specific restic command on a repository, you can open and use the dev panel with `Meta+Shift+D`

## Project Overview

Zerobyte is a backup automation tool built on top of Restic that provides a web interface for scheduling, managing, and monitoring encrypted backups. It supports multiple volume backends (NFS, SMB, WebDAV, SFTP, local directories) and repository backends (S3, Azure, GCS, local, and rclone-based storage).

### Development Server

```bash
# Start the dev server through Portless
bun run dev

# Get the current app URL for this worktree
portless get zerobyte

# Inspect active Portless routes if needed
portless list
```

Portless applies git worktree prefixes automatically, so linked worktrees may return URLs like `https://branch-name.zerobyte.localhost`. Use the Portless URL for browser testing and manual verification.

### Type Checking

```bash
# Run type checking and generate React Router types
bun run tsc
```

### Testing

```bash
# Run all tests
bun run test

# Run a specific test file
bunx dotenv-cli -e .env.test -- bunx --bun vitest run --project server path/to/test.ts
```

### Building

```bash
# Build for production
bun run build
```

### Database Migrations

```bash
# Generate new migration from schema changes
bun gen:migrations

# Generate a custom empty migration
bunx drizzle-kit generate --custom --name=fix-timestamps-to-ms

```

### API Client Generation

```bash
bun run gen:api-client
```

### Code Quality

```bash
# Format
vp fmt <path> --write

# Lint
bun run lint
```

### Invalidation

The frontend has an automatic invalidation setup which runs after every mutation.
Do not implement any invalidation logic in the frontend.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
