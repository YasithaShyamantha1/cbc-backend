import Student from "../Models/Student.js"

export function getStudent(req,res){
Student.find().then(
    (studentList)=>([
        res.json({
            list : studentList
        })
    ])
   )
}

export function  createStudent(req,res){
const student = new Student(req.body)
    student.save().then(()=>{
        res.json({
            message:"Student Created"
        })
    }).catch(()=>{
        res.json({
            message:"Student not Created"
        })
    })
    
}
export function deleteStudent(req,res){
    Student.deleteOne({name: req.body.name}).then(()=>{
        res.json(
            {
            message: "Student Deleted successfully"
            })
    })
}