const fs = require('fs');
const yargs = require("yargs");
const chalk = require("chalk");
let i=2
function loadData() {
    try {
        const buffer = fs.readFileSync('data.json'); //path to the file we want to read
        const dataString = buffer.toString(); // a string
        const javaScriptObject = JSON.parse(dataString)  // convert string to js object
        javaScriptObject.push({'ID':i})
        javaScriptObject.push({'complete':false})
        
        return javaScriptObject
    }
    catch (err) {
        console.log("ERROR", err)
        return []
    }  // expect to be a js array
}

function saveData(data) {
    // write a string or buffer to data.json
    fs.writeFileSync("data.json", JSON.stringify(data))
};

if (process.argv[2] && process.argv[2] === "list") {
    todos=loadData()
    for(const todo of todos) {
        console.log("========================")
        console.log("|| ID:",todo.ID );
        console.log(chalk.green("||","TODO",todo.todo))
        console.log(chalk.black("||","complete:",todo.complete))
      }
} else if (process.argv[2] && process.argv[2] === "add") {
    yargs.command({
        command: "add",
        describe: "Add a new todo",
        builder: {
          todo: {
            describe: "Todo content",
            demandOption: true,
            type: "string"
          },
          complete: {
            describe: "Todo status",
            demandOption: false,
            type: "boolean",
            default: false
          },
          ID:{
            demandOption: false,
            type: "number",
            default: i
          }
        },
        handler: function(argv) {
          console.log(argv.todo, argv.complete);
        }
      });
      
    if (process.argv[3]) {
        i++
        const todos = loadData();
        todos.push(process.argv[3]);
        saveData(todos)
    }
}else if (process.argv[2] && process.argv[2] === "delete") {
    yargs.command({
        command: "delete",
        describe: "Delete ID:  "+process.argv[3],
        builder: {
          todo: {
            describe: "Todo content",
            demandOption: true,
            type: "string"
          },
          complete: {
            describe: "Todo status",
            demandOption: false,
            type: "boolean",
            default: false
          },
          ID:{
            demandOption: false,
            type: "number",
            default:process.argv[3]
          }
        },
        handler: function(argv) {
          console.log(argv.todo, argv.complete);
        }
      });
      let temp=loadData()
      temp.splice(process.argv[3]-1,1)
      saveData(temp)
    console.log("Dasdsadsadasdsads")

}
yargs.parse();
