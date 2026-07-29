import sqlite3
import json

DB = r"C:\Users\Aiman Shahid\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Look at the hero section session in detail
sid = "ses_0b02617b2ffe03JiP1WUpA4wRM"
print(f"=== SESSION {sid} - Hero section ka design improve karna ===")
c.execute("""SELECT m.id, m.agent_id, json_extract(m.data, '$.role') as role, 
             substr(m.data, 1, 300) as preview
             FROM message m WHERE m.session_id = ?
             ORDER BY m.time_created""", (sid,))
for r in c.fetchall():
    print(f"\n  msg={r[0]} | agent={r[1]} | role={r[2]}")
    print(f"  preview: {r[3][:200]}")

# Look at parts for tool calls/results
print(f"\n=== PARTS for {sid} ===")
c.execute("""SELECT p.id, p.message_id, 
             json_extract(p.data, '$.type') as part_type,
             json_extract(p.data, '$.tool') as tool,
             substr(p.data, 1, 400) as preview
             FROM part p WHERE p.session_id = ?
             ORDER BY p.time_created""", (sid,))
for r in c.fetchall():
    print(f"  part={r[0]} | msg={r[1]} | type={r[2]} | tool={r[3]}")
    if r[4]:
        print(f"    preview: {r[4][:300]}")

# Also check sessions in the global project that are about portfolio
print("\n=== GLOBAL PROJECT SESSIONS (recent 10, non-checkpoint) ===")
c.execute("""SELECT id, title, time_created 
             FROM session 
             WHERE project_id = 'global'
               AND title NOT LIKE '%checkpoint-writer%'
             ORDER BY time_created DESC LIMIT 10""")
for r in c.fetchall():
    print(f"  {r[0]} | {r[1][:80] if r[1] else 'N/A'}")

# Check portfolio-related sessions in global project
print("\n=== GLOBAL PROJECT - PORTFOLIO SESSIONS ===")
c.execute("""SELECT id, title, time_created 
             FROM session 
             WHERE project_id = 'global'
               AND (title LIKE '%ortfolio%' OR title LIKE '%eroh%' OR title LIKE '%section%' OR directory LIKE '%Portfolio%')
             ORDER BY time_created DESC""")
for r in c.fetchall():
    print(f"  {r[0]} | {r[1][:80] if r[1] else 'N/A'} | dir in session")

conn.close()
