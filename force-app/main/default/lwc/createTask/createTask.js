import { LightningElement, api } from 'lwc';
import{ShowToastEvent} from 'lightning/platformShowToastEvent'
import saveToDo from "@salesforce/apex/ToDoController.saveToDo";

export default class CreateTask extends LightningElement {
    @api targetParent;
    taskTitle;
    dueDate;
    showDueDate = false;
    showSave = false;

    connectedCallback(){
        console.log("this.targetParent ", this.targetParent);
    }

    handleOnChange(event){
        const fieldName = event.target.name;
        if(fieldName === "taskTitle"){
            this.taskTitle = event.target.value;
            if(this.taskTitle != " "){
                this.showDueDate = true;   
            }else{
                this.showDueDate = false;
            }
            console.log("this.taskTitle: ",this.taskTitle);
        }
        else if(fieldName === "dueDate"){
            this.dueDate = event.target.value;
            if(this.dueDate != "" &&  this.targetParent != true){
                this.showSave = true;
            }else{
                this.showSave = false;
            }    
            console.log("this.dueDate: ",this.dueDate);
        }  
    }
    handleClick(){
        console.log("## Button click on child");
        saveToDo({title:this.taskTitle, dueDate:this.dueDate})
         .then((result) =>{
            if(result === "Success"){
                this.taskTitle = "";
                this.dueDate = "";

                const evnt = new ShowToastEvent({
                    title: "Success",
                    message: "A new item has been added in your todo list",
                    variant: "success"
                });
                this.dispatchEvent(evnt);

                this.dispatchEvent(new CustomEvent("refreshtodo"));
                 
            }
         })
         .catch((error) => {
            console.log("error: ",error);
            const evnt = new ShowToastEvent({
                title: "Error",
                message: error.body.message,
                variant: "error"
            });
            this.dispatchEvent(evnt);
         });
    }
    @api
    handleParentClick(){
        this.handleClick();
    }
}