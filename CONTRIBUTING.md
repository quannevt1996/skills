# Contributing

How to create and maintain skills in this repository. For guidance on using the skills to build against Sinch APIs, see [AGENTS.md](AGENTS.md).

## Architecture

```
skills/
  <product>/
    SKILL.md                      # Main skill file (required)
    references/
      shared-policy.md            # Generated copy of the shared policy (do not edit)
      <topic>.md                  # Optional navigational summaries
      examples/                   # Optional language samples
    scripts/                      # Optional executable helpers
docs/
  SINCH_SHARED_POLICY.md          # Canonical policy embedded in every skill
scripts/
  sync_sinch_skill_references.py  # Regenerates policy gates, digests, and shared-policy.md
  validate_sinch_skills.py        # Structural and catalog consistency checks
  lint-skills.mjs                 # Strict YAML frontmatter check (runs in CI)
```

One folder per Sinch product. The skill file is always `SKILL.md`.

## Adding a New Skill

1. Create `skills/<product-name>/SKILL.md` with YAML frontmatter (`---` delimiters). Use kebab-case for the folder name.
2. Fill in the frontmatter: `name`, `description`, and `metadata` with `author`, `version`, `category`, `tags`, and `uses` (the skills this one depends on, such as `sinch-authentication`).
3. Write all body sections in order: Overview, Agent Instructions, Getting Started, Key Concepts, Common Patterns, Gotchas and Best Practices, Security, Links.
4. Under Agent Instructions, add one placeholder line beginning with `> **Policy gate`. Then run the sync script; it rewrites that line with the current gate, inserts the digest block after it, and generates `references/shared-policy.md`:

```bash
python3 scripts/sync_sinch_skill_references.py
```

5. Validate before committing:

```bash
python3 scripts/validate_sinch_skills.py
```

6. Add the skill to the table in `README.md`.
7. Keep the file under 500 lines. Move detailed content to `references/` if needed.

## SKILL.md Format Rules

### Frontmatter

- `name`: Max 64 characters. Format: `sinch-<product-slug>` (e.g., `sinch-sms`, `sinch-voice-api`).
- `description`: Max 1024 characters. Describes when to trigger the skill (e.g., "When the user wants to send SMS messages using the Sinch SMS API"). If the skill covers only one API version, say so and name where the other version is documented, so the skill does not trigger for the wrong one. Wrap the value in double quotes if it contains `: ` or starts with a special character; Tessl parses the frontmatter as strict YAML and rejects the publish otherwise (`node scripts/lint-skills.mjs` runs this check in CI).
- No XML angle brackets (`<` `>`) anywhere in the frontmatter.
- `metadata.uses`: list only skills that exist in `skills/`. The validator fails on unknown names.

### Body Sections

1. **Overview** -- What the product does and when to use it (2-3 sentences). State version scope here if the product has more than one API version.
2. **Agent Instructions** -- Policy gate and digest (generated), evidence-tier reminders, which other skills to load and when, what to infer versus ask.
3. **Getting Started** -- Authentication, SDK install, first API call.
4. **Key Concepts** -- Product-specific domain model and terminology.
5. **Common Patterns** -- Most frequent use cases with code snippets.
6. **Gotchas and Best Practices** -- Non-obvious pitfalls, rate limits, regional quirks.
7. **Security** -- Credential handling, URL fetching policy, treatment of inbound content.
8. **Links** -- Documentation, API reference, dashboard, pointers to bundled references.

### Shared Policy

- The policy gate line and the digest block in Agent Instructions are generated. Edit `docs/SINCH_SHARED_POLICY.md` and rerun the sync script; never hand-edit them or `references/shared-policy.md`.
- Guidance in a skill must agree with the policy. For example, polling instructions must be bounded (Retry-After, backoff with jitter, a deadline, timeout reported as unknown), and enum values or field names stated in prose must carry a "confirm against the canonical doc" caveat or be left to the linked reference.

### References and Scripts

- `references/*.md` are navigational summaries, not schema authority. Open each with a short note saying so and linking to the canonical docs.
- If a `references/` file already lists a set of documentation URLs, point to the file from Links instead of repeating the URLs. Keep in Links only the links no reference file covers: the OpenAPI spec, the Markdown API reference, the dashboard, SDK references, and LLMs.txt.
- Route to reference files from the body where the agent needs them (a table or a sentence per file), not only from Links.
- `scripts/` are execution tools. Do not present them as a schema reference.

### Style Guidelines

- Max 500 lines per SKILL.md; move detailed content to `references/`.
- Write for AI agents: concise, actionable, include code examples.
- Use curl and Node.js SDK (`@sinch/sdk-core`) for code examples. Exception: Mailgun skills use `mailgun.js`.
- Do not include lengthy prose; prefer bullet points and code blocks.
- Use placeholders such as `SINCH_PROJECT_ID` for credentials, never real values.

### API Reference Link Format

Each skill's Links section should include both:
1. **OpenAPI YAML spec**: `https://developers.sinch.com/_bundle/docs/<product>/api-reference/<product>.yaml?download`
2. **Markdown docs**: `https://developers.sinch.com/docs/<product>/api-reference/<product>.md`

Mailgun skills use `https://documentation.mailgun.com` instead of `developers.sinch.com`. These are machine-readable formats optimized for AI agent consumption.

### Auth

The shared `skills/sinch-authentication/SKILL.md` skill covers all auth methods. Product skills reference it rather than duplicating auth setup.

- OAuth2 (most APIs): project ID + key ID + key secret → bearer token
- Basic Auth: project ID + key ID + key secret (some APIs)
- Application signing: Voice API, Verification API (HMAC-SHA256)
- API key: Mailgun (`api:key`)
- Dashboard access keys: https://dashboard.sinch.com/settings/access-keys

## Validation

```bash
python3 scripts/sync_sinch_skill_references.py --check
```

```bash
python3 scripts/validate_sinch_skills.py
```

```bash
npm install --no-save yaml@2.9.0 && node scripts/lint-skills.mjs
```

CI runs all three. The validator also checks that relative links resolve, that `metadata.uses` names installed skills, and that each skill carries exactly one policy gate and digest.

## Sinch Developer Docs

- Developer portal: https://developers.sinch.com
- LLMs.txt (full markdown docs index): https://developers.sinch.com/llms.txt
- Mailgun LLMs.txt: https://documentation.mailgun.com/llms.txt
- OpenAPI specs: `https://developers.sinch.com/_bundle/docs/<product>/api-reference/<product>.yaml?download`

## Do Not

- Add README.md, CHANGELOG.md, or INSTALLATION_GUIDE.md inside skill folders. Only SKILL.md and optional bundled resources.
- Create skills that exceed 500 lines.
- Use authentication credentials or API keys in code examples (use placeholders like `SINCH_PROJECT_ID`).
- Hand-edit generated policy gates, digests, or `references/shared-policy.md`.
- Repeat in Links a list of URLs that a bundled reference file already holds.
- Link to sibling skills that do not exist in `skills/`.