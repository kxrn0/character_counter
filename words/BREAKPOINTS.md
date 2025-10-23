The elements in the letter density component need to have fixed widths for things to aligh properly, so they can't resize themselves because the string in the percentage part can vary in length, so there will be some variation of length in here, and the font is not monospace.

As a result the list items containing the bars have a fixed size which overflows at a relatively large screen size, so having the usual two breakpoints; tablet and mobile. It's an issue on the previous challenge where the mobile view appears too early, which makes it look too small on certain tablets.

I think I can make do with another breakpoint; tablet-small. Like the name suggests it's a range between mobile and tablet. It doesn't appear in the design file; I'll have to come up with the sizes myself, but likely only for a couple of elements.
