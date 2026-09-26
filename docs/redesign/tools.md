# Tools Samples Redesign Notes

Owned samples: `converse-chat`, `tempo-music`, `board-tasks`.

## Research Sources

- Slack Help, sidebar preferences: https://slack.com/help/articles/212596808-Adjust-your-sidebar-preferences
- Slack Help, search: https://slack.com/intl/en-gb/help/articles/202528808-Search-in-Slack
- Discord Help, search filters: https://support.discord.com/hc/en-us/articles/115000468588-How-to-Use-Search-on-Discord
- Discord Help, threads: https://support.discord.com/hc/en-us/articles/4403205878423-Threads-FAQ
- Bandcamp Help, page design and album art importance: https://bandcamp.com/zendesk/help/design_how_to
- Bandcamp Help, embedded album player: https://get.bandcamp.help/hc/de/articles/23020711574423-How-do-I-create-a-Bandcamp-embedded-player
- Trello Support, card filtering: https://support.atlassian.com/trello/docs/filtering-for-cards-on-a-board/
- Trello Support, moving cards/lists: https://support.atlassian.com/trello/docs/moving-cards-or-lists/
- Trello Guide, board views and filters: https://trello.com/guide/activate-views

## Asset Sources

Local Tempo media was downloaded into `public/media/tempo-music/` so the sample does not depend on remote image availability.

- `vinyl-store.jpg` from Wikimedia Commons `File:Vinyl Store.jpg`: https://commons.wikimedia.org/wiki/File:Vinyl_Store.jpg
- `turntable-close.jpg` from Wikimedia Commons `File:Close-up of phonograph turntable.jpg`: https://commons.wikimedia.org/wiki/File:Close-up_of_phonograph_turntable.jpg
- `ocean-waves.jpg` from Wikimedia Commons `File:Drone view of ocean waves (Unsplash).jpg`: https://commons.wikimedia.org/wiki/File:Drone_view_of_ocean_waves_(Unsplash).jpg
- `vintage-record-store.jpg` from Wikimedia Commons `File:Vintage record store (Unsplash).jpg`: https://commons.wikimedia.org/wiki/File:Vintage_record_store_(Unsplash).jpg

## ImageGen Concept

Representative concept generated before implementation:

- `C:\Users\admin\.codex\generated_images\01a0df4a-ad5b-7561-b9b8-3140565a07bd\call_dCNpWNZDrtqX0rLGtX5Em4aV.png`

Concept directions applied:

- Converse: compact white and muted-blue work messaging shell, searchable sidebar, channel/thread selection, real team conversation content, restrained right-side context panel.
- Tempo: independent record library and preview player, rust/red accents over neutral charcoal, local photographic album/editorial art, clear simulated preview copy instead of implying real audio playback.
- Board: paper-white/black practical task board with mustard status cues, dense controls, working add/filter/move/detail flows.

## Per-Sample Decisions

### converse-chat

- Replaced generic personal DMs with Korean team channels, support thread, and direct messages.
- Search now matches conversation names, roles, and message text, reflecting Slack/Discord search behavior.
- Reworked CSS into a white/muted-blue product shell with compact channel rows, squared avatars, bounded message bubbles, and a practical info panel.
- Preserved send, conversation selection, unread clearing, mobile list/thread switching, typing indicator, and reduced-motion fallbacks.

### tempo-music

- Replaced generated gradient album SVGs with local bitmap media and real `<img>` rendering.
- Added search state across title, artist, album, and mood.
- Changed visible player language to `미리듣기` and `미리듣기 시뮬레이션` because no audio source exists.
- Reworked the surface into a record-library layout with charcoal shell, rust controls, editorial playlist cards, and a bottom preview player.

### board-tasks

- Added working task search, assignee filter, label filter, quick add, per-card next/previous movement, and detail-panel status movement.
- Converted mock names, dates, labels, and user copy to Korean while preserving data shape.
- Reworked CSS into a paper-white operational board with black text, mustard active/status treatment, compact controls, and no marketing/stat hero treatment.

## Registry Recommendations

- `converse-chat`: description should emphasize "팀 채널과 스레드 검색이 있는 업무용 메신저"; style label could be "muted productivity".
- `tempo-music`: description should emphasize "독립 음반 라이브러리와 미리듣기 플레이어"; style label could be "charcoal editorial".
- `board-tasks`: description should emphasize "검색, 필터, 이동, 상세 편집이 가능한 실무형 칸반"; style label could be "paper operations".
