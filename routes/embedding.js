// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/playground')
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const authorSchema = new mongoose.Schema ({
//     name: String,
//     bio: String,
//     website: String
// });

// const Author = mongoose.model('Author', authorSchema);

// // const Course = mongoose.model('Course', new mongoose.Schema ({
// //     name: String,
// //     author: authorSchema
// // }));

// const Course = mongoose.model('Course', new mongoose.Schema ({
//     name: String,
//     author: {
//         type: authorSchema,
//         required: true
//     }
// }));

// async function createCourse(name, author) {
//     const course = new Course({
//         name,
//         author
//     });

//     const result = await course.save();
//     console.log(result);
// }

// async function listCourses() {
//     const courses = await Course.find();
//     console.log(courses);
// }

// // async function updateAuthor(courseId) {
// //     const course = await Course.findById(courseId);
// //     course.author.name = 'Dwaraknath';
// //     course.save();   
// // }

// // async function updateAuthor(courseId) {
// //     const course = await Course.update({ _id: courseId }, {
// //         $set: {
// //             'author.name': 'Benchmark'
// //         }
// //     });
// // }

// async function updateAuthor(courseId) {
//     const course = await Course.update({ _id: courseId }, {
//         $unset: {
//             // removing the wholse set of author
//             'author': ''
//         }
//     });
// }

// updateAuthor('615eaf89fe73f9855e1f5b4f')

// // createCourse('Node Course', new Author({ name: 'Dwarak'}));

// // listCourses();


// 2ND
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const authorSchema = new mongoose.Schema ({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema ({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

createCourse('Node Course', [
    new Author({ name: 'Dwarak' }),
    new Author({ name: 'Benchmark' })
]);

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

removeAuthor('615eb7d47eb29064a0aed726', '6163b71e3026f5fba4311793')

// addAuthor('615eb7d47eb29064a0aed726', new Author({ name: 'Any'}))

// listCourses();