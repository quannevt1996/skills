# Changelog

All notable changes to this project will be documented in this file. Individual skills have their own versions in metadata.

## 2026-09-05

### Fixed

- `sinch-elastic-sip-trunking` v1.1.1 — Corrected four API details that were wrong or missing, all verified against the live EST API:
  - Create-trunk response field is `id`, not `sipTrunkId`; documented the returned `domain` and the `id`/`sipTrunkId` naming difference between the trunk response and the endpoint request body
  - ACL `ipRanges` take `{ipAddress, range}` objects with an integer prefix length, not CIDR strings; `enabled` is required
  - Replaced `GET /trunks/{trunkId}/phoneNumbers` (returns 404 — endpoint does not exist) with `GET /projects/{projectId}/phoneNumbers` in Workflows B/C/D and the diagnostics checklist
  - Workflow D was missing the step linking the credential list to the trunk; without it the registered endpoint is still created with `201` and every REGISTER then fails with `401`. Added the step, the verification, and a matching 401 troubleshooting entry. Also documented the credential password policy.

## 2026-09-03

### Added

- `sinch-cli` v1.0.0 — New skill covering the full Sinch CLI (`@sinch/cli`, binary `sinch`): auth, config profiles, `functions` lifecycle (`init`/`dev`/`deploy`/`logs`/`status`/`db`/`storage`), `voice`, `numbers`, `porting`, `conversation`, `fax`, `sip`, `secrets`, `templates`, and shell completions. Ships with reference files for voice, numbers-and-porting, and conversation-fax-sip.
- `sinch-functions` v1.0.0 — New skill for the Sinch Functions serverless platform (beta): runtime choice (Node.js vs C#), install/auth, `FunctionContext` overview, voice callback lifecycle (ICE/ACE/PIE/DICE), SVAML basics, and cross-links to the runtime-specific skills.
- `sinch-functions-node` v1.0.0 — New skill for the Node.js/TypeScript runtime (`@sinch/functions-runtime`): `VoiceFunction` default export, `IceSvamlBuilder`/`AceSvamlBuilder`/`PieSvamlBuilder`, `MenuTemplates`/`createMenu`, `ConversationController`, custom HTTP endpoints, Basic Auth via `export const auth`, and `setup()` hooks. Ships with reference files for context services, SVAML builders, and conversation webhooks.
- `sinch-functions-dotnet` v1.0.0 — New skill for the C#/.NET runtime (`Sinch.Functions.Runtime`, `.NET 10`): `SinchVoiceController`/`SinchConversationController`/`SinchController`/`ElevenLabsController`, `Instructions.* → Action.* → Build()` builder chain, `ISinchFunctionInit` DI, and `[Authorize]` protection. Ships with reference files for context services, SVAML builders, and conversation webhooks.

## 2026-07-13

### Added

- `sinch-sms` v1.0.0 — New skill for the SMS channel of the Conversation API (sender IDs, encoding, message parts, opt-out handling). Extracted from `sinch-conversation-api`; includes the `send_sms.cjs` script.
- `sinch-mms` v1.0.0 — New skill for the MMS channel of the Conversation API (media types, size limits, transcoding). Extracted from `sinch-conversation-api`.
- `sinch-rcs` v1.0.0 — New skill for the RCS channel of the Conversation API (rich cards, carousels, suggested actions, capability check, SMS fallback). Extracted from `sinch-conversation-api`; includes the RCS send scripts.
- `sinch-whatsapp` v1.0.0 — New skill for the WhatsApp channel of the Conversation API (24-hour window, templates, opt-in rules, media specs). Extracted from `sinch-conversation-api`.

### Changed

- `sinch-conversation-api` v2.0.0 — Restructured to cover the API layer only (apps, contacts, conversations, message types, webhooks, templates, batch sending). Channel-specific references and send scripts moved to the new `sinch-sms`, `sinch-mms`, `sinch-rcs`, and `sinch-whatsapp` skills.

## 2026-04-20

### Changed

- `sinch-10dlc` v1.1.1 — Added environment variable instructions; switched curl placeholders to shell variables; improved Key Concepts formatting
- `sinch-fax-api` v1.0.2 — Added environment variable instructions; switched curl placeholders to shell variables; improved Key Concepts formatting
- `sinch-in-app-calling` v1.0.2 — Clarified Phone-to-App/SIP-to-App backend reference; improved Key Concepts formatting
- `sinch-mailgun-validate` v1.0.2 — Added environment variable instructions; switched curl placeholders to shell variables
- `sinch-number-lookup-api` v1.0.3 — Added environment variable instructions; switched curl placeholders to shell variables
- `sinch-number-order-api` v1.0.2 — Added environment variable instructions; switched curl placeholders to shell variables
- `sinch-numbers-api` v1.1.1 — Improved Key Concepts formatting
- `sinch-porting-api` v1.0.1 — Added environment variable instructions; switched curl placeholders to shell variables
- `sinch-voice-api` v1.1.1 — Fixed doc links to use `.md` extensions for AI agent consumption

## 2026-04-17

### Added

- `sinch-porting-api` v1.0.0 — New skill for porting phone numbers from other carriers into Sinch
- `sinch-sdks` v1.0.0 — New skill for SDK installation and client initialization (Node.js, Python, Java, .NET)
- `.gitignore` file
- Java SDK examples for Voice API

### Changed

- `sinch-10dlc` v1.1.0 — Streamlined authentication instructions; updated description, tags, and metadata
- `sinch-authentication` v1.1.0 — Clarified auth methods; added metadata with category and tags
- `sinch-conversation-api` v1.1.0 — Streamlined SKILL.md; added metadata with category, tags, and usage references
- `sinch-elastic-sip-trunking` v1.0.1 — Added metadata; referenced sinch-sdks skill for SDK setup
- `sinch-fax-api` v1.0.1 — Fixed category from Messaging to Voice; added metadata
- `sinch-imported-numbers-hosting-orders` v1.0.1 — Added metadata; standardized credential placeholders
- `sinch-in-app-calling` v1.0.1 — Added Key Concepts section; referenced sinch-authentication for credential setup
- `sinch-mailgun` v1.0.1 — Enhanced documentation; added metadata with category and tags
- `sinch-mailgun-inspect` v1.0.2 — Added metadata; standardized credential placeholders
- `sinch-mailgun-optimize` v1.0.1 — Enhanced documentation; added metadata with category and tags
- `sinch-mailgun-validate` v1.0.1 — Added metadata; improved security guidance for URL handling; standardized credential placeholders
- `sinch-number-lookup-api` v1.0.2 — Simplified SKILL.md; added `sinch-sdks` usage reference; added metadata
- `sinch-number-order-api` v1.0.1 — Enhanced documentation; added metadata with category and tags
- `sinch-numbers-api` v1.1.0 — Updated Python and Java reference examples; added metadata with category and tags
- `sinch-provisioning-api` v1.0.1 — Added metadata with category, tags, and skill references
- `sinch-verification-api` v1.0.1 — Added metadata; consolidated SDK references to sinch-sdks skill
- `sinch-voice-api` v1.1.0 — Updated Java reference examples; enhanced documentation; added metadata
- `README.md` — Removed duplicate `sinch-authentication` row; added `sinch-porting-api`; updated descriptions
- Updated SDK init references across Node.js, Python, Java, and .NET for latest SDK versions
- Enhanced metadata (category, tags, uses) across all skills

### Fixed

- Addressed Snyk security scan warnings across all skills (credential placeholder standardization, URL trust boundaries)
- Removed redundant SDK installation tables from skills that now reference sinch-sdks

## 2026-04-01

### Changed

- Added Sinch usage disclaimer to README
- Synced skills from internal GitLab repository

## 2026-03-30

### Fixed

- Fixed Node.js SDK init reference

## 2026-03-27

### Added

- Skills 1.0.0 public release with initial set of skills

### Changed

- Updated license from MIT to Apache 2.0
- Enhanced README with installation instructions
- Fixed conversation region usage in SDK init references

## 2026-02-06

### Changed

- Updated RCS channel skills

## 2026-02-05

### Changed

- Updated RCS skills content

## 2026-01-30

### Fixed

- Updated SKILL.md formatting

## 2026-01-29

### Added

- Initial commit — first version of Sinch skills repository
- Added best practices guide and skill links
- Added OpenAPI links, fixed Overview headers, removed duplicates

### Fixed

- Corrected technical inaccuracies and link formatting across 7 skills
- Added `.md` extensions to doc links, fixed broken URLs
