#! /usr/bin/env node

import inquirer from "inquirer";

class Student{
    static counter =  10000;
    id:number;
    name:string;
    courses: string [];
    balance:number

    constructor (name:string){
        this.id =Student.counter++;
        this.name= name;
        this.courses= []; //iniliaze an empty array
        this.balance= 100;
    }
        //Method To Enroll A Student In Courses

        enroll_course(course: string){
        this.courses.push(course);

       }

        //Method To veiw balance

        veiw_balance(){
            console.log(`Balance For ${this.name} : $${this.balance}`);
        }
    
        //Method To Pay Fees

        pay_fees(amount:number){
            this.balance -= amount;
            console.log(`$ ${amount} Fees Paid Sucessfully ${this.name}`);   
        }

        //Method TO Display Student status\
    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    } 
}

//Defing A Student Manager CLass to mange student

class Student_manager {
    students: Student[]

    constructor() {
        this.students = [];
        
    }

    //Method TO A Add A NEw Student
    add_student(name: string){
      let student =  new Student (name);
      this.students.push(student)
      console.log(`Student: ${name} Added SuccesFully. STUDENT ID: ${student.id}`);
      
    }
    //METHOD TO ENROLL A STUDENT IN A COURSE

    enroll_student(student_id:number, course:string){
      let student =  this.find_student(student_id);
      if (student) {
        student.enroll_course(course);
    console.log(`${student.name} Enrolled in ${course} SucessFully`);
        
      } 
    }

    //method to veiw student balance

    veiw_student_balance(student_id:number){
        let student =  this.find_student(student_id);
        if(student){
            student.veiw_balance();
        }else{
            console.log("Student Not Found. Please Enter A Correct Student ID ");
            
        }

    }

    //Method To Pay Student fees

    pay_student_fees(student_id:number,amount:number){
        let student =  this.find_student(student_id);
     if(student){
        student.pay_fees(amount)
     }else{
        console.log("Student Not Found. Please Enter A Correct Student ID ");
     }
    }

    //METHOD TO DISPALY STUDENT STATUS

    show_student_status(student_id:number){
        let student =  this.find_student(student_id);
        if(student){
            student.show_status();
        }
    }

    //find a student by student id

    find_student(student_id:number){
        return this.students.find(std => std.id ===student_id);
    }

}

//Message to run main function

async function main() {
    console.log("Welcome To 'Ahmed' Student Management System");
    console.log("-".repeat(50));
    
   let student_manager= new Student_manager();
//while loop to keep running the program
   while(true){
    let choice = await inquirer.prompt([
        {
            name:"choice",
            type:"list",
            message:"Select An Option",
            choices:[
                "Add Student",
                "Enroll Student",
                "View Student Balance",
                "Pay Fees",
                "Show Status",
                "Exit"
            ]
        }
    ]);

    //Using Switch Case to handle  For USer Choice

  switch(choice.choice){
    case "Add Student":
        let name_input = await inquirer.prompt([
            {
                name:"name",
                type:"input",
                message:"Enter A student Name"
            }
        ]);
        student_manager.add_student(name_input.name);
    
        break;
    

    case "Enroll Student":
        let course_input= await inquirer.prompt([
            {
                name:"student_id",
                type:"number",
                message:"Enter A Student ID"
            },{
                name:"course",
                type:"input",
                message:"Enter A Course Name"
            }
        ]);
        student_manager.enroll_student(course_input.student_id, course_input.course);
        break;

        case "View Student Balance":
        let balance_input = await inquirer.prompt([
            {
                name:"student_id",
                type:"number",
                message:"Enter A Student ID"
            }
        ]);
        student_manager.veiw_student_balance(balance_input.student_id);
        break;

        case"Pay Fees":
        let fees_input = await inquirer.prompt([
            {
                name:"student_id",
                type:"number",
                message:"Enter A Student ID"
            },
            {
                name:"amount",
                type:"number",
                message:"Enter The Amount To Pay"
            }
        ]);
        student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
        break;

        case "Show Status":

        let status_input= await inquirer.prompt([
            {
                name:"student_id",
                type:"number",
                message:"Enter Your Student ID"
            }
        ]);
       student_manager.show_student_status(status_input.student_id);

        break;

        case "Exit":
        console.log("Exiting...");
        process.exit();
        
  }

    }

}

//Calling A main Function

main();