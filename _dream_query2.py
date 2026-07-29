import sqlite3
import json
import time

DB = r"C:\Users\Aiman Shahid\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Find portfolio project sessions (5eac76fb)
print("=== PORTFOLIO PROJECT (5eac76fb) - ALL SESSIONS ===")
c.execute("""SELECT id, title, time_created, time_updated 
             FROM session 
             WHERE project_id = '5eac76fb-c978-4568-9b2f-761e4e0d02d2' 
             ORDER BY time_created DESC""")
sessions = c.fetchall()
for r in sessions:
    age_days = (1783751109417 - r[2]) / (1000*86400)
    print(f"  {r[0]} | {r[1][:80] if r[1] else 'N/A'} | age={age_days:.1f}d")

# Find the most recent non-checkpoint-writer session with real content
print("\n=== NON-CHECKPOINT-WRITER PORTFOLIO SESSIONS ===")
c.execute("""SELECT id, title, time_created 
             FROM session 
             WHERE project_id = '5eac76fb-c978-4568-9b2f-761e4e0d02d2'
               AND title NOT LIKE '%checkpoint-writer%'
             ORDER BY time_created DESC""")
sessions = c.fetchall()
for r in sessions:
    age_days = (1783751109417 - r[2]) / (1000*86400)
    print(f"  {r[0]} | {r[1][:80] if r[1] else 'N/A'} | age={age_days:.1f}d")

# Count messages in recent sessions
print("\n=== MESSAGE COUNTS ===")
for r in sessions:
    sid = r[0]
    c.execute("SELECT COUNT(*) FROM message WHERE session_id = ?", (sid,))
    cnt = c.fetchone()[0]
    c.execute("SELECT COUNT(*) FROM part WHERE session_id = ?", (sid,))
    pcnt = c.fetchone()[0]
    print(f"  {sid} | messages={cnt} | parts={pcnt}")

conn.close()
