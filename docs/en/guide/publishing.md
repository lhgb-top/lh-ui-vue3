# Publishing

This guide explains how to publish `@lh-ui/vue3` to the public npm registry, and how to host it on your own server (either as a direct tarball or as registry metadata).

Publishing supports **both a manual and a CI-driven path**: you run the changeset commands locally and confirm the version number and release notes before publishing (see "Publish flow" below); when a push to `main` changes `.changeset/**`, GitHub Actions runs version + publish automatically (see "Automated publishing with GitHub Actions").

## Prerequisites

### 1. npm account and scope ownership

- Register an [npm](https://www.npmjs.com/) account and enable two-factor authentication (2FA).
- Make sure your account has publish rights on the `@lh-ui` scope: scopes are first-come-first-served, and the account that first publishes a package under `@lh-ui/*` becomes the scope owner.
- Log in locally:

  ```bash
  npm whoami          # confirm the logged-in account
  npm login           # follow the prompts if not logged in
  ```

### 2. Point the registry at the public npm

The repo-level `.npmrc` only sets `shamefully-hoist = true` — it does not pin a registry, so the default `https://registry.npmjs.org/` is used. `package.json` also pins the public registry via `publishConfig`:

```json
"publishConfig": {
  "access": "public",
  "registry": "https://registry.npmjs.org/"
}
```

> **Do not** put a private registry address in the repo-level `.npmrc` — that would also redirect publishing. To switch registries temporarily, use a user-level `~/.npmrc` outside the repo or a CLI flag.

### 3. What gets published

The `files` allowlist publishes only build artifacts: `es/` (ESM + types + component styles), `lib/` (CJS), and `dist/` (UMD + full stylesheet). Source, docs, tests, and scripts are excluded via `.npmignore`. The `prepublishOnly` script runs `pnpm build` automatically during publishing, so **you don't need to build manually first**.

## Publishing workflow

### Step 1: Add a changeset

Every user-visible change should have a changeset. If one already exists for this change, skip to step 2.

```bash
pnpm changeset
```

Follow the interactive prompts to pick `@lh-ui/vue3`, a bump type (major / minor / patch), and a summary.

> **Note: changesets accumulate in this repo.** There are dozens of unconsumed changesets under `.changeset/`, and the `changeset version` command in step 2 consumes **all of them at once, collapsing them into a single release**. To release in batches, control the pace with git branches or by temporarily moving changeset files aside.

### Step 2: Bump the version and generate the changelog

```bash
pnpm changeset:version
```

This command:

- Computes the new version from the highest bump level among the changesets and writes it to `package.json`
- Merges all changesets into `CHANGELOG.md`
- Deletes the consumed `.changeset/*.md` files (`commit: false` in `config.json` means nothing is committed automatically)

Always **inspect the result manually** afterwards:

```bash
git status              # confirm changesets were consumed and the changelog was generated
git diff package.json   # confirm the version number is what you expect
```

### Step 3: Publish

```bash
pnpm changeset:publish
```

Under the hood it runs `pnpm publish`, which:

1. Triggers `prepublishOnly` → `pnpm build` (full ESM / CJS / UMD / types / styles build)
2. Packs and uploads to the public npm registry as configured by `publishConfig`
3. Creates and pushes a git tag named `@lh-ui/vue3@<version>`

Because `publishConfig.access` is `public`, the scoped package is publicly visible — no need to pass `--access public`.

### Step 4: Push (run by you)

```bash
git push --follow-tags
```

## Pre-publish self-check

Before publishing, dry-run the packing to see exactly what goes into the tarball:

```bash
npm pack --dry-run
```

Confirm the output:

- Contains only the `es/`, `lib/`, and `dist/` directories
- Does **not** contain `src/`, `packages/`, `docs/`, `tests/`, `scripts/`, or `ai/`
- Has a reasonable size (the UMD bundle is around 600KB, the full stylesheet around 700KB — both expected)

## Post-publish verification

```bash
# 1. The new version is visible on npm
npm view @lh-ui/vue3
npm view @lh-ui/vue3 versions

# 2. Create a sandbox project and verify all module formats
pnpm create vite verify-pkg --template vue-ts
cd verify-pkg && pnpm add @lh-ui/vue3
```

Verify each case in the sandbox:

| Case | Usage |
| ---- | ----- |
| Full import (ESM) | `import LhUiPlus from '@lh-ui/vue3'` + `import '@lh-ui/vue3/dist/index.css'` |
| On-demand component | `import { LhButton } from '@lh-ui/vue3'` |
| On-demand style (needs sass) | `import '@lh-ui/vue3/style/button'` |
| On-demand style (no sass) | `import '@lh-ui/vue3/style-css/button'` |
| Theme utilities | `import { getThemeVars } from '@lh-ui/vue3/theme'` |
| CDN (refreshes within minutes) | `https://unpkg.com/@lh-ui/vue3` |

## Hosting on a private server (static tarball)

The public npm registry is the primary distribution channel. If you need a self-hosted mirror — for intranet use, when the npm registry is blocked, or to pin a specific version — hosting the tarball on your own server is the lightest option and **requires no private npm registry**.

### 1. Pack the tarball

```bash
pnpm build
npm pack
```

The output file is named `lh-ui-vue3-<version>.tgz` — npm converts the `@lh-ui/` scope into `lh-ui-vue3-` (slash becomes a hyphen). You can run `npm pack --dry-run` first to confirm.

### 2. Upload to the server

Follow the existing nginx site directory convention (the docs site lives at `/home/webuser/nginx/lh-ui/plus/`), add a `packages/` directory beneath it, and store each version in its own folder:

```
/home/webuser/nginx/lh-ui/plus/
├── index.html              # docs site
└── packages/
    ├── 1.0.0/
    │   └── lh-ui-vue3-1.0.0.tgz
    ├── 1.1.0/
    │   └── lh-ui-vue3-1.1.0.tgz
    └── latest              # symlink pointing at the currently recommended version
        └── lh-ui-vue3-1.1.0.tgz
```

The resulting URL:

```
https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz
```

`packages/` is a static directory and is covered by the existing site nginx config — no new location is needed:

```nginx
# The existing docs site location already covers the /lhui/plus/ prefix,
# so packages/ is served automatically as a subdirectory. Just make sure
# .tgz files are downloadable (nginx's default octet-stream content type works).
location /lhui/plus/ {
    alias /home/webuser/nginx/lh-ui/plus/;
    autoindex off;
}
```

### 3. Install from the private server

Three equivalent forms — pick one:

```bash
# pnpm
pnpm add https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz

# npm
npm install https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz

# yarn
yarn add https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz
```

Or write it directly into `package.json`:

```json
{
  "dependencies": {
    "@lh-ui/vue3": "https://www.lhgb.top/lhui/plus/packages/1.0.0/lh-ui-vue3-1.0.0.tgz"
  }
}
```

### 4. Caveats

- **Registry resolution is bypassed**: tarball installs never query a registry; dependencies come from the tarball itself. This package has zero runtime `dependencies` — only a `peerDependencies.vue` entry — so any project with Vue 3 installed can install and run it.
- **No version metadata**: `npm update` does nothing for tarball dependencies. Upgrading means changing the URL manually (or reinstalling after updating the `latest` symlink). This is ideal as a **pinned-version mirror**, not for frequent updates.
- **HTTPS is required**: pnpm / npm / yarn all refuse http tarball URLs.
- **`pnpm-lock.yaml` stores the full URL plus an integrity hash**: teammates can reproduce the exact install from the lockfile, with no npm access needed.

## Hosting on a private server (registry metadata)

The direct-tarball approach works, but `npm update` does nothing and the lockfile holds a raw URL. If you want consumers to `pnpm add @lhgb/vue3` like any normal package — with version resolution and `dist-tags` — have the Nginx static directory additionally serve a forged npm registry metadata document, acting as a **read-only registry**. Both approaches can coexist.

### 1. Packing

```bash
pnpm build
node scripts/pack-private.mjs
```

The script takes the same build artifacts, renames the package to `@lhgb/vue3` (only `name` / `publishConfig` differ), runs `npm pack`, computes `integrity` (sha512) and `shasum` (sha1), assembles the registry metadata JSON, and writes everything to `private-registry/`:

```
private-registry/
├── @lhgb/vue3              # metadata JSON (no extension)
└── tarballs/@lhgb/vue3/
    └── lhgb-vue3-1.0.0.tgz
```

Useful flags:

- `--dry-run`: print the file list and metadata that would be generated, without writing anything — for a pre-release check
- `--incremental`: read the existing metadata and merge the new version into it, so historical versions are not clobbered

### 2. Deploying to the server

Upload the contents of `private-registry/` to the server directory and apply the location from `scripts/nginx-private-registry.conf.example` (same Nginx instance as the docs site at `/lhui/plus/`, but its own location):

```
/home/webuser/nginx/lhgb/
├── @lhgb/vue3
└── tarballs/@lhgb/vue3/
    └── lhgb-vue3-1.0.0.tgz
```

The critical Nginx line is `default_type application/json` — the metadata file has no extension, and without an explicit type the client parses it as plain text and fails:

```nginx
location /lhgb/ {
  alias /home/webuser/nginx/lhgb/;
  default_type application/json;
  autoindex off;

  location ~ \.tgz$ {
    default_type application/octet-stream;
  }
}
```

### 3. Installing from the private registry

Add one line to your project-level or user-level `.npmrc`:

```ini
@lhgb:registry=https://www.lhgb.top/lhgb
```

Then all three package managers work the same way:

```bash
pnpm add @lhgb/vue3
# or
npm install @lhgb/vue3
# or
yarn add @lhgb/vue3
```

### 4. Relationship to the public package

`@lhgb/vue3` and `@lh-ui/vue3` are **the same build at the same version** — only `name` and `registry` differ, so they are interchangeable:

- Use `@lhgb/vue3` for intranets, regions where npm is blocked, or when you want to control the distribution source
- Use `@lh-ui/vue3` for public access and unpkg / jsdelivr CDN discoverability

### 5. Caveats

- **Update metadata incrementally**: after each release, merge the new version with `--incremental`. Overwriting the file outright drops historical versions' metadata, and old versions become uninstallable.
- **Tarballs must not move**: the `tarball` URL in the metadata is absolute — the file location and URL must stay in sync.
- **HTTPS is required here too**: pnpm / npm / yarn all refuse http URLs.
- **Never put the `@lhgb` registry in the repo's root `.npmrc`**: keep the root `.npmrc` at just `shamefully-hoist = true` and put the private registry in the user-level `~/.npmrc`, so publishing to npm is never rerouted.

## Automated publishing with GitHub Actions

Beyond the manual flow, `.github/workflows/release.yml` provides an automated path:

- **Triggers**: a push to `main` that changes `.changeset/**` or `package.json`; or a manual run from the repository's Actions page (`workflow_dispatch`).
- **Behavior**: runs `pnpm build` + `pnpm verify:dts`, then the changesets/action version + publish steps. When there is nothing to publish, it does **nothing at all** — so triggering it on push is safe.
- **Required secret**: configure `NPM_TOKEN` under Settings → Secrets and variables → Actions — generate a Granular Access Token on npm with publish permission for the `@lh-ui` org.

The two paths coexist: local `pnpm changeset:publish` when you want a human to confirm every release; CI when you prefer to accumulate changesets and let releases roll out automatically.

## Rollback

```bash
# Mark a version deprecated (recommended; does not affect already-installed users)
npm deprecate @lh-ui/vue3@1.0.0 "This version has an xx issue; please upgrade to 1.0.1"

# Fully unpublish: only within 72 hours of publishing, and only if no other package depends on it
npm unpublish @lh-ui/vue3@1.0.0
```

CDN caches (unpkg / jsdelivr) expire within hours to a day. After rolling back, verify in a sandbox project that the pinned-version URL still installs the older release.
