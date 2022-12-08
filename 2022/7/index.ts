import { readFileSync } from 'fs';

const f = readFileSync('./input.txt', 'utf8');
const lines = f.split(/\n/);

interface File {
    name: string;
    size: number;
}

interface Directory {
    name: string;
    parent: Directory;
    directories: Directory[];
    files: File[]
    totalFilesize: number;
}

enum Command {
    Cd, Ls, Dir, File,
}

const getLineType = (input: string): Command => {
    if (input.indexOf('$ cd') === 0) {
        return Command.Cd;
    }
    if (input.indexOf('$ ls') === 0) {
        return Command.Ls;
    }
    if (input.indexOf('dir') === 0) {
        return Command.Dir;
    }
    return Command.File;
};

const findChildDir = (directory: Directory, dirName: string): Directory | undefined => directory
    .directories.find((dir: Directory) => dir.name === dirName);

const findChildFile = (directory: Directory, fileName: string): File | undefined => directory
    .files.find((file: File) => file.name === fileName);

const addDirectory = (directory: Directory, dirName: string): Directory => {
    let newDirectory = findChildDir(directory, dirName);
    if (!newDirectory) {
        newDirectory = {
            name: dirName,
            parent: directory,
            directories: [],
            files: [],
            totalFilesize: 0,
        };
        directory.directories.push(newDirectory);
    }
    return newDirectory;
};

const handleCd = (input: string, directory: Directory): Directory => {
    const dirName = input.split(' ')[2];
    if (dirName === '..') {
        return directory.parent;
    }
    return addDirectory(directory, dirName);
};

const handleDir = (input: string, directory: Directory): void => {
    const dirName = input.split(' ')[1];
    addDirectory(directory, dirName);
};

const handleFile = (input: string, directory: Directory): void => {
    const [sizeString, fileName] = input.split(' ');
    const size = parseInt(sizeString, 10);
    let newFile = findChildFile(directory, fileName);
    if (!newFile) {
        newFile = {
            name: fileName,
            size,
        };
        directory.files.push(newFile);
    } else {
        throw new Error('dasdsadsa');
    }
};

const handleInput = (input: string, directory: Directory): Directory => {
    switch (getLineType(input)) {
        case Command.Cd:
            return handleCd(input, directory);
        case Command.Ls:
            break;
        case Command.Dir:
            handleDir(input, directory);
            break;
        case Command.File:
            handleFile(input, directory);
            break;
        default:
            throw new Error('INVALIDDDDD');
    }
    return directory;
};

let dir: Directory = {
    name: '/',
    parent: null as unknown as Directory,
    directories: [],
    files: [],
    totalFilesize: 0,
};
const root = dir;
lines.shift();

lines.forEach((line) => { dir = handleInput(line, dir); });

const getTotalSize = (directory: Directory): number => {
    const fileSize = directory.files.reduce((acc, curr) => curr.size + acc, 0);
    // eslint-disable-next-line no-param-reassign
    directory.totalFilesize = fileSize
    + directory.directories.reduce((acc, curr) => acc + getTotalSize(curr), 0);
    return directory.totalFilesize;
};
getTotalSize(root);

const getSmallerThan100k = (directory: Directory): number => {
    const thisDir = directory.totalFilesize > 100000 ? 0 : directory.totalFilesize;
    // eslint-disable-next-line no-param-reassign
    return thisDir + directory.directories.reduce((acc, curr) => acc + getSmallerThan100k(curr), 0);
};

// Part 1
console.log(getSmallerThan100k(root));

const spaceNeeded = root.totalFilesize - 40000000;

const getSmallestNeeded = (directory: Directory, required: number): number => {
    if (directory.totalFilesize < required) {
        return Number.MAX_SAFE_INTEGER;
    }
    // eslint-disable-next-line no-param-reassign
    return Math.min(
        directory.totalFilesize,
        ...directory.directories.map((d) => getSmallestNeeded(d, required)),
    );
};
console.log(spaceNeeded);
console.log(getSmallestNeeded(root, spaceNeeded));
