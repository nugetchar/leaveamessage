export function parseEmphasis(str) {
    return str
            .replace(/(\*\*)([^\*\*]*)(\*\*)/gi, '<b>$2</b>')
            .replace(/(__)([^__]*)(__)/gi, '<b>$2</b>')
            .replace(/(\*)([^\*]*)(\*)/gi, '<i>$2</i>')
            .replace(/(_)([^_]*)(_)/gi, '<i>$2</i>')
            .replace(/(~~)([^~~]*)(~~)/gi, '<s>$2</s>')
}