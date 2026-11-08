# News stories

One file per story. The file name is the story's web address: `raising-the-roof.md` becomes `/news/raising-the-roof/`.

```
---
title: Raising the roof
date: 2024-03
image: news-roof
alt: Council officers and staff outside the centre
---

The story, in plain paragraphs separated by a blank line.
Links look like [this](https://example.com).
```

- `date`: `2024-03` (shown as "March 2024"), `2024-03-14` (shown as "14 March 2024"), or a year on its own. Stories are listed newest first.
- `image`: a photo in `public/shared/images/site/` (the name without `.jpg`). Optional.
- `alt`: a short description of the photo, for screen readers.
- `summary`: optional. The line shown on the News page; otherwise the first sentence of the story.

The site rebuilds the News page and the story pages from these files (`scripts/gen-pages.mjs`).
