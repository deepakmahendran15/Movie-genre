// In No SQL , there is no relationship between these two documents

// Trade of between query performance vs consistency

// Using References (Normalization) // for consistency
let author = {
    name: 'Dwarak'
}

let course = {
    author: 'id',
    // authors: [
    //     'id1',
    //     'id2'
    // ]
}

//Using Embedded Documents (Denormalization) // for query performance
let course = {
    author: {
        name: 'Dwarak' 
    }
}

// third approach is hybrid approach
// Hybrid

let author = {
    name: 'Dwarak'
    // 50 other properties
}

let course = {
    author: {
        id: 'ref',
        name: 'Dwarak'
    }
}