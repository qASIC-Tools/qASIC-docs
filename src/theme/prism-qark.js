Prism.languages['qark'] = {
    'comment': {
		pattern: /(^|\n)#.*/,
		lookbehind: true,
		greedy: true
	},
    'class-name': {
        pattern: /(\-).*/,
        lookbehind: false,
        greedy: true
    },
    'number': {
        pattern: /(\.)(@|_)/,
        lookbehind: true,
        greedy: false
    },
    'keyword': {
        pattern: /(^|\n)[^\s][^#-][^=@\|\n]*(\.|=|\|)/,
        lookbehind: false,
        greedy: false
    }
}

