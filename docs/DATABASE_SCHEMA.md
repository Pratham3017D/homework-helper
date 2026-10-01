# Homework Helper — Database Schema

## MVP Principle

The first generation flow should work without requiring a user account if practical. Database persistence is primarily for analytics, caching metadata, and future saved sessions.

Do not store unnecessary child information.

## Tables

### content_cache

Stores validated reusable generated content.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| cache_key | text | unique |
| schema_version | text | required |
| prompt_version | text | required |
| topic | text | normalized |
| grade | smallint | 1–8 |
| subject | text | |
| curriculum | text nullable | |
| content_json | jsonb | validated content |
| verification_status | text | verified/partial/unverified |
| created_at | timestamptz | |
| expires_at | timestamptz | optional |

Indexes:
- unique(cache_key)
- index(grade, subject)
- index(expires_at)

### users

Only required when authentication is introduced.

| Column | Type |
|---|---|
| id | uuid PK |
| email | text unique |
| created_at | timestamptz |

### learning_sessions

Optional saved sessions.

| Column | Type |
|---|---|
| id | uuid PK |
| user_id | uuid FK nullable |
| topic | text |
| grade | smallint |
| subject | text |
| curriculum | text nullable |
| content_cache_id | uuid nullable |
| created_at | timestamptz |

### feedback

Stores product feedback, not sensitive child records.

| Column | Type |
|---|---|
| id | uuid PK |
| user_id | uuid nullable |
| session_id | uuid nullable |
| rating | smallint nullable |
| comment | text nullable |
| created_at | timestamptz |

## Future child profile table

Do not implement in MVP.

If later added, prefer:
- nickname rather than legal name;
- grade or age range rather than exact DOB;
- explicit parent ownership;
- deletion support;
- minimal retention.

## Row Level Security

For Supabase:
- Users can read/write only their own saved sessions.
- Public content cache should not expose internal metadata unnecessarily.
- Service-role access stays server-side.
- Never rely solely on client-side RLS assumptions.

## Migration Strategy

Use versioned migrations. Do not edit production schema manually without a migration.
