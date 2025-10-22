This is the component between the header and the stats component. It contains the textarea element, the checkboxes and approximate reading time. The text will have to be known to the stats component, so the text has to be part of the parent's state.

So there's the textarea, the checkbox for excluding spaces, and the one for setting a character limit. The state for the text area has to live in the parent so other components can make use of it. The state for the spaces checkbox has to live in the parent as well, as the stats component needs to know that. The character limit state doesn't need to be in the parent, it could, but it would make things a bit more complicated since there's a warning in the text area component, so making the character limit state part of the parent would tie the warning to the parent as well.

I think I can define a `v-model` on the `<TextArea />` component to handle text. I could also do that with the exclude spaces state, but it may be better to use an event in this case.

When do we know if the text is above character limit? we can just do

```ts
function count_chars(text: string, excludeSpaces: boolean) {
  if (excludeSpaces === false) return text.length;

  let count = 0;

  for (let char of text) if (char != " ") count++;

  return count;
}
```

I'll need the character count in the parent to pass it down to the stats component, and in the text area component to check if if the character count exceeds the maximum number of characters, so the char count has to be a prop of text area as well.

---

The text area is almost done, but now I need to find a way to resize the number input. The number input in the design file has a fixed width that only fits three characters, so at most the user can limit the number of characters to 999 without part of this value being hidden. I'm already keeping track of the value of this input with javascript, I think I can use that to set the width of the input.

A simple demo like

```html
<style>
  input {
    font-size: 1rem;
  }
</style>
<input />
<script>
  const input = document.querySelector("input");
  let value = 0;

  input.addEventListener(
    "input",
    () => (input.style = `width: ${value.toString().padStart(3, "0").length}rem`),
  );
</script>
```

shows that this doesn't work. It works if the font is monospace, and the width is set in `ch`, but that's not the case in the design file.

I found [this](https://css-tricks.com/auto-growing-inputs-textareas/) article, and made a simple demo

```html
<style>
  label {
    display: inline-grid;
    vertical-align: top;
    align-items: center;
    position: relative;

    input {
      appearance: textfield;
      font-size: 1rem;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &::after,
    input {
      width: auto;
      min-width: 1rem;
      grid-area: 1 / 2;
      font: inherit;
      padding: 0.25rem;
      margin: 0;
    }

    &::after {
      content: attr(data-value) " ";
      visibility: hidden;
      white-space: pre-wrap;
    }
  }
</style>
<label>
  <span>Limit:</span>
  <input type="number" oninput="this.parentNode.dataset.value = this.value" size="3" />
</label>
```

and then tried implementing it in here, but it didn't work; the demo was working on firefox, and I was testing this project in brave, but looks like chromium based browsers don't work the same; the initial width of the input element is too long, it does resize to fit more characters, but it doesn't downsize.

It does actually work for text inputs, but not for number inputs, and I don't want to set this input to text because it's bad for accessibility.

---

It looks like I can use a text input and make it look like a number input with some attributes, but the CSS to make it resize is a bit long, so I'll have to make its own component.

---

I'm almost done with the text area, I just need to calculate how long it takes to read a piece of text. It will be a very rough estimate. The average person reads at about 250 words per minute, so I just get the total number of words and divide them by this rate

r = w / t
t = w / r
