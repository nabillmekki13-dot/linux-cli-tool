# Custom Node.js Linux Filesystem CLI Tool

## Section 1 — Command Description
This project re-implements core Linux filesystem utilities as a consolidated Node.js command-line tool. It relies entirely on synchronous `fs` APIs, `process.argv`, and basic JavaScript array/string primitives. 

### Supported Base Commands
* `cat <file>` - Displays file contents.
* `wc <file>` - Counts newlines in a file.
* `ls [dir]` - Lists immediate directory contents.
* `head <file>` - Shows the first 10 lines of a file.
* `tail <file>` - Shows the last 10 lines of a file.
* `grep <pattern> <file>` - Searches lines matching a simple string pattern.
* `tee <file>` - Reads standard input, piping it to both the console and a file.

### The "Fancy Command": fancyLs
* **Combined Functionality:** It combines the structural traversal of `ls` with the initial content peek of `head`.
* **What it does:** Instead of only listing entry names, `fancyLs` iterates through the directory items, identifies text documents, and directly injects a clean, 2-line preview block beneath each filename. 
* **How to run it:** Run the following command in your terminal:
  ```bash
  node tool.js fancyLs
  ```

---

## Section 2 — AI‑Assisted Programming

### 1. What I Asked the AI
* I asked for a structural breakdown and individual logic designs for implementing basic versions of the 7 core filesystem commands in JavaScript.
* I requested a creative strategy for an advanced command that combines or extends standard utilities.
* I asked for debugging workflows when encountering platform terminal discrepancies and missing software dependencies on macOS.

### 2. Where the AI Helped
* **Architecture:** The AI mapped out the `switch (command)` routing architecture and provided a functional blueprint template for the combined `fancyLs` utility.
* **Troubleshooting Environment Errors:** It successfully diagnosed a `zsh: command not found: node` environment block, directing me to download the macOS Node.js package manager, reset my interactive terminal shell, and correct formatting differences between Bash (`echo -e`) and Zsh (`printf`).

### 3. Where I Had to Think Independently
* **Writing Logic Blocks:** I had to take the logic blueprints provided by the AI and manually write out the string splits, slice indices, and string formatting inside the `handleFancyLs` function to generate the exact layout constraints required.
* **Local Workspace Setup:** I manually configured my workspace environment on my local Mac machine, creating the physical script files, formatting test text structures, and running execution loops via the interactive Terminal application to generate screenshots.

### 4. What the AI Got Wrong or Missed
* **Terminal Shell Assumptions:** The AI initially assumed my Mac Terminal used standard Bash syntax when generating automated mock test files via `echo -e`. This syntax failed on newer macOS setups because the default interactive engine is Zsh. It skipped over the fact that `echo -e` prints literal formatting characters in Zsh instead of processing line breaks, which forced me to follow up and ask for a fix. I resolved this by utilizing `printf` commands instead.
