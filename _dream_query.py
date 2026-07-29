import sqlite3
import json

DB = r"C:\Users\Aiman Shahid\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# 1. List tables
c.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = [r[0] for r in c.fetchall()]
print("=== TABLES ===")
print(tables)

# 2. Show schema for key tables
for t in ['session', 'message', 'part', 'task', 'task_event']:
    if t in tables:
        c.execute(f"PRAGMA table_info({t})")
        cols = [(r[1], r[2]) for r in c.fetchall()]
        print(f"\n=== SCHEMA: {t} ===")
        print(cols)

# 3. List sessions (newest first)
print("\n=== SESSIONS (newest 20) ===")
c.execute("SELECT id, project_id, directory, title, time_created FROM session ORDER BY time_created DESC LIMIT 20")
for r in c.fetchall():
    print(f"  {r[0]} | proj={r[1]} | dir={r[2]} | title={r[3][:60] if r[3] else 'N/A'} | {r[4]}")

# 4. Current project sessions
print("\n=== CURRENT PROJECT (78d53b2e) SESSIONS ===")
c.execute("SELECT id, title, time_created FROM session WHERE project_id LIKE '78d53b2e%' ORDER BY time_created DESC")
for r in c.fetchall():
    print(f"  {r[0]} | title={r[1][:80] if r[1] else 'N/A'} | {r[2]}")

conn.close()
