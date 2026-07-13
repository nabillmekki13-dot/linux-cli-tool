const fs = require('fs');
const process = require('process');

// Grab command line arguments
const [,, command, ...args] = process.argv;

// Helper function to read file safely
function readFileHelper(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error: Cannot read file '${filePath}'`);
        process.exit(1);
    }
}

// Command dispatcher
switch (command) {
    case 'cat':
        handleCat(args[0]);
        break;
    case 'wc':
        handleWc(args[0]);
        break;
    case 'ls':
        handleLs(args[0]);
        break;
    case 'head':
        handleHead(args[0]);
        break;
    case 'tail':
        handleTail(args[0]);
        break;
    case 'grep':
        handleGrep(args);
        break;
    case 'tee':
        handleTee(args[0]);
        break;
    case 'fancyLs':
        handleFancyLs(args[0]);
        break;
    default:
        console.log("Usage: node tool.js [cat|wc|ls|head|tail|grep|tee|fancyLs] [arguments]");
}

// 1. CAT: Displays file contents
function handleCat(filePath) {
    if (!filePath) return console.error("Error: Missing file path");
    const content = readFileHelper(filePath);
    process.stdout.write(content);
}

// 2. WC: Counts lines in a file
function handleWc(filePath) {
    if (!filePath) return console.error("Error: Missing file path");
    const content = readFileHelper(filePath);
    const lines = content.split('\n');
    if (lines[lines.length - 1] === '') lines.pop();
    console.log(`${lines.length} ${filePath}`);
}

// 3. LS: Lists directory contents
function handleLs(dirPath) {
    const targetPath = dirPath || '.';
    try {
        const files = fs.readdirSync(targetPath);
        files.forEach(file => console.log(file));
    } catch (error) {
        console.error(`Error: Cannot read directory '${targetPath}'`);
    }
}

// 4. HEAD: Shows first N lines (default 10)
function handleHead(filePath) {
    if (!filePath) return console.error("Error: Missing file path");
    const content = readFileHelper(filePath);
    const lines = content.split('\n');
    const firstTen = lines.slice(0, 10);
    console.log(firstTen.join('\n'));
}

// 5. TAIL: Shows last N lines (default 10)
function handleTail(filePath) {
    if (!filePath) return console.error("Error: Missing file path");
    const content = readFileHelper(filePath);
    const lines = content.split('\n');
    if (lines[lines.length - 1] === '') lines.pop();
    const lastTen = lines.slice(-10);
    console.log(lastTen.join('\n'));
}

// 6. GREP: Searches for a string pattern in a file
function handleGrep(args) {
    if (args.length < 2) return console.error("Usage: node tool.js grep <pattern> <file>");
    const pattern = args[0];
    const filePath = args[1];
    const content = readFileHelper(filePath);
    const lines = content.split('\n');
    
    lines.forEach(line => {
        if (line.includes(pattern)) {
            console.log(line);
        }
    });
}

// 7. TEE: Reads from standard input, writes to console and a file
function handleTee(filePath) {
    if (!filePath) return console.error("Error: Missing output file path");
    try {
        const buffer = fs.readFileSync(0); // 0 is the file descriptor for stdin
        const data = buffer.toString();
        process.stdout.write(data);
        fs.writeFileSync(filePath, data, 'utf8');
    } catch (error) {
        console.error("Error handling standard input or writing file");
    }
}

// 8. FANCYLS: Custom implementation linking LS and HEAD with safety checks
function handleFancyLs(dirPath) {
    const targetPath = dirPath || '.';
    try {
        const items = fs.readdirSync(targetPath);
        
        items.forEach(item => {
            console.log(`\n📄 [FILE/DIR]: ${item}`);
            
            try {
                // Read the contents of each file safely
                const content = fs.readFileSync(item, 'utf8'); 
                const lines = content.split('\n');
                const preview = lines.slice(0, 2).join('\n');
                
                console.log(`   Preview:\n   ---\n${preview}\n   ---`);
            } catch (err) {
                // If it's a directory or binary file, handle it safely without crashing
                console.log(`   (No preview available or item is a folder)`);
            }
        });
    } catch (error) {
        console.error(`Error: Cannot read directory '${targetPath}'`);
    }
}
