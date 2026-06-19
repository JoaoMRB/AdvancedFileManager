# Advanced File Manager

<p>
  <a href="./README.pt-PT.md"><strong>Português de Portugal</strong></a>
  &nbsp;|&nbsp;
  <a href="./README.md"><strong>English</strong></a>
</p>

A browser-based app for bulk-renaming files, focused on the cases Windows and generic tools do not handle elegantly: combined rules, clear previews, conflict warnings and local processing. Works with ZIP files or multiple files of any type.

## What Makes It Different

The point is not simply to rename files. The goal is to make large renaming jobs safer, faster and easier to understand, especially for downloaded files, music libraries, exported images, course material, work archives or folders with inconsistent naming patterns.

## Features

- Process ZIP files directly, or import multiple files of any type (Office documents, images, PDFs, etc.).
- Automatically create a ZIP archive from selected files.
- Remove or replace text in file names.
- Use optional regex for advanced rules.
- Add text at the start or end of a name.
- Convert names to lowercase, uppercase, title case or sentence case.
- Replace separators such as `_`, `-` and `.` with spaces.
- Clean duplicate spaces automatically.
- Remove accents when compatibility with older systems matters.
- Rename batches with patterns such as `File_{n}`.
- Choose the starting number and sequence padding.
- Keep file extensions intact.
- Preview changes before processing.
- Detect duplicate output names before creating the ZIP.
- Process everything locally in the browser, with no server.
- Support files up to 500 MB total size.

## Access Online

You can access the app directly via GitHub Pages:

🌐 **[Advanced File Manager](https://joaomrb.github.io/AdvancedFileManager/)**

Or download and run locally by opening `index.html` in your browser.

## How To Use

1. Open `index.html` in your browser or access via the link above.
2. Drag files into the drop zone or click to select one or more files (any type).
3. If you select multiple files, they'll be automatically packed into a ZIP.
4. Choose the renaming mode.
5. Adjust the options and review the preview.
6. Click **Process and download** to get the final ZIP.

## Examples

Removing unwanted text:

- Before: `website.com - Top Song.mp3`
- After: `Top Song.mp3`

Sequential batch rename with `Song_{n}`:

- Before: `website.com - song1.mp3`
- After: `Song_001.mp3`

## Technologies

- HTML5
- CSS3
- JavaScript
- JSZip
