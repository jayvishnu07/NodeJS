//5.0.1
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/kkk',{ useNewUrlParser: true  , useUnifiedTopology: true  })
.then(() => {
    console.log("connected");
}).catch((err) => {
    console.log('Error : ',err);
});


const AuthorSchema = new mongoose.Schema({
    name : String,
    age: Number
});

const Author = mongoose.model('Author' , AuthorSchema);

const Course = mongoose.model('Course' , new mongoose.Schema({
    name : String,
    authors : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Author'
    }
}));

async function createAuthor(name , age){
    const author = new Author({
        name,
        age
    })

    const result = await author.save();
    console.log(result);

};
async function createCourse(name , authors){
    const course = new Course({
        name,
        authors,
    })
    
    const result = await course.save();
    console.log("result : ",result);
}

async function getCourse(){
    const courses = await Course
    .find()
    .populate('authors')
    .select('name authors');
  console.log(courses);
}

async function updateCourse(courseId , authorName){
    const course = await Course.update({_id : courseId},{
        $set : {
            'author.name' : authorName
        }
    });
    console.log(course);
}

async function addAuthor(courseId , authorName){
    const course = await Course.findById(courseId)
       course.authors.push(authorName);
       course.save()
}

async function deleteAuthor(courseId , authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save()
}




// createAuthor("Jvs",19);

// createCourse('react','63b9871ff6d8ad6470d88d79')
    
// deleteAuthor('63b8539a66c0d94d7c8cc8d6', "63b8539a66c0d94d7c8cc8d5"  );


getCourse();

// updateCourse('63b82e9a2db9ec69c8f5a6d0','Jaivishnu07')
































// // async function updateCourse(id){
// //     const result = await Course.update({_id : id},{
// //         $set : {
// //             name : 'NodeJS - updated version',
// //             tag : ['node','backend']
// //         }
// //     });
// //     console.log('Result : ',result);
// // }

// async function updateCourse(id){
//     const course = await Course.findByIdAndUpdate(id,{
//         $set : {
//             name : 'NodeJS - updated version - findByIdAndUpdate',
//             tag : ['node','backend','with new']
//         }
//     },{new : true});
    
//     console.log('Result : ',course);
// }
