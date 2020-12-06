let u = require('./util.js'),

r=u.i(6).split('\n\n').reduce((a,g) => {
    a[0]+=new Set(g.split(/\n|/)).size
    let z=new Map()
    for(b of g.split(/\n|/))z.set(b,(z.get(b)+1)||1)
    return [a[0],a[1]+[...z].reduce((a,[,v])=>a+(v==g.split('\n').length),0)]}
,[0,0])

console.log(`Part 1: ${r[0]}\nPart 2: ${r[1]}`)
