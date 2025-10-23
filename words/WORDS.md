I'm almost done with this, appart from reviewing the logic and finding a more sensible way of counting sentences and words there are three things I'd like to do next:

- Show a more appropriate reading time. Currently if something would take 70 minutes to read, it will show as such; 70 minutes. Because of space I can't show "1 hour 10 minutes" because it wouldn't fit on some screens, so I'll compromise by going from minutes to hours, so "1 hour 30 minutes" becomes "1.5 hours".
- Deal with the "no spaces" thing.
- Handle theme state better; have a default one, for instance.

---

Do I even need to inject the theme? almost all components use the theme, so it would be easier to pass it down as a prop.

---

I changed the code to use props instead of inject/provide. I'm assuming that if something goes wrong when setting the theme an error will be thrown and the theme won't be saved to the database, but I'm OK with that. The theme should stay consistent on memory for the runtime of the app.
