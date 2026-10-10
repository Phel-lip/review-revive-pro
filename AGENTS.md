<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Preserve the imported salon page as the baseline and scope presentation changes to the requested sections, so unrelated booking and content remain unchanged.
- Keep service identities, categories, images and descriptions in the shared salon catalog, so filtering and WhatsApp booking use the same services.
- Keep services presentation in its dedicated component and section-scoped CSS, so catalog updates do not restyle surrounding sections.
- Import uploaded and downloaded media through this project's Lovable Assets pointers; import image edits directly, so photos remain available after publishing.
- Keep public review data separate from section presentation and only display verified ratings, quotes and Google listing links, so source updates never introduce invented testimonials.
