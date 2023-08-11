import { saveTask, getTasks,onGetTasks,deleteTasks,getTask , updateTask} from "./firebase.js";

const taskform = document.getElementById('task-form');
const taskcontainer = document.getElementById("task-container")

let edit_status = false
let id='';

window.addEventListener('DOMContentLoaded',  async () => {
    //const querySnapshot = await getTasks()

    onGetTasks((querySnapshot) => {

        let html = ''
        querySnapshot.forEach(doc => {
            console.log(doc.data())
            const userLocation  = doc.data()
            html += `
            <div class="card card-body mt-2 border-primary">
                <h3 class="h5">${userLocation.latitude}</h3>
                <p >${userLocation.longitude}</p>
                <div>
                <button class="btn-delete btn btn-success" type="button" data-id="${doc.id}">Delete</button>
                <button class="btn-update btn btn-info" type="button" data-id="${doc.id}">Update</button>
                </div>
            </div>        
            `
    
        });
        taskcontainer.innerHTML = html


        //Comandos para eliminar un documento de la coleccion de firebase y firestore
        const btnsDelete = taskcontainer.querySelectorAll('.btn-delete')
        //console.log(btnsDelete)
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({target : { dataset}}) => {
               // console.log("Eliminando")
               //console.log(dataset.id)
               deleteTasks(dataset.id);
            })
        })

        //Comandos para editar un docmuento de la coleccion de firebase y firestore
        const btnsUpdate = taskcontainer.querySelectorAll('.btn-update')
        btnsUpdate.forEach(btn => {
            //console.log(btn)
            btn.addEventListener('click', async ({target: {dataset}}) => {

                const doc = await getTask(dataset.id)
                //console.log(doc.data())
                const userLocation = doc.data()

                taskform['task-title'].value = userLocation.latitude
                taskform['task-description'].value = userLocation.longitude
                edit_status = true
                id=doc.id;
                taskform['btn-task-save'].innerHTML = "update"

            })
        })
    })

   console.clear
})

taskform.addEventListener('submit', (e) => {
    e.preventDefault()
    //console.log('submitted');

    const latitude = taskform['task-title'];
    const longitude = taskform['task-description'];

    //console.log(title.value,description.value);
    if (edit_status){
        //console.log('Actualizando')
        updateTask(id,{
            latitude:latitude.value,
            longitude: longitude.value
        });
        edit_status = false;
        taskform['btn-task-save'].innerHTML = "Guardar" 

    }else{
        console.log('Guardando')
        saveTask(latitude.value,longitude.value)
    }
    
    taskform.reset();

})
