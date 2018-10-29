const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to mongoDB...'))
.catch(err => console.error('could not connect to mongoDB...',err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date,default:Date.now},
    inPublished:Boolean,
});

const Course = mongoose.model('Course',courseSchema);

// Insert data start

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Subin Rabin',
        tags: ['node','frontend'],
        inPublished:true,
    });
    const  result = await course.save();
    console.log(result);
}
// createCourse();

// Insert data end
// Fetch data start

async function getCourse() {
    const course = await Course.find({author:'Subin Rabin',inPublished:true})
    .limit(10)
    .sort({name:1})
    .select({name:1,tags:1});
    console.log(course);
}
getCourse();

// Fetch data end
// Update data start
// async function updateCourse(id) {
//     const course = await Course.findById(id);
//     if(!course) return;
//     course.inPublished = true;
//     course.author = 'Another Author';
//     const  result = await course.save();
//     console.log(result);
// }
// Update document start
async function updateCourse(id) {
    const result = await Course.update({_id:id}, {
        $set:{
            author:'Subin Rabin',
            inPublished:false
        }
    });
    console.log(result);
}

// Update document end

// updateCourse('5bd6d4b57772360e6c5c3063');

// Update data end

// Remove document start

async function removeCourse(id) {
    const result = await Course.deleteOne({_id:id});
    console.log(result);
}

removeCourse('5bd6d4b57772360e6c5c3063');
// Remove document end