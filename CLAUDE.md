@AGENTS.md

## Agency hub (map, wiki, task board for every Harlo repo)

The shared project map, wiki and task board for all Harlo repos live in
`E:\Harlo Stack\.agency` (the `agency` MCP server here points at it via
AGENCY_ROOT). Before non-trivial work call `agency_context`; track real work
with `agency_task` (todo → doing → done, or blocked with the reason). Files in
this repo are named `web:<path>` on the map. The owner watches it with
`agency serve` from E:\Harlo Stack.
