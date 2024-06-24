import { LightningElement } from 'lwc';

export default class ToDoManager extends LightningElement {
    refreshToDo(){
        this.refs.pendingToDo.refreshList();
        this.refs.completedToDo.refreshList();
    }
}