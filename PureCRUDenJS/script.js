// Ce qui m' a fatigué ici c'est ('selectedRow == null', j avais mis 'selectedRow = null' or il fallait ==)  
//et aussi le lien (<a href="#"> alors qu il a mit <a> qd je fais chez moi cela ne passe dc j ai mis (href="") qui me donnait maintenant un lien 
// mais qd je clique sur les liens il me redirige sur la meme page mais il fait partir les donnes de ma Table et de memes Inputs c-t-d il faisait une redirection ds le vide
// dc qd j ai vu cela j'ai mis le # entre les "" pour faire maintenant la redirection vers la page Elle ce qui me permet de garder mes DONNEEs sur la meme page 
//MAIS On peut laisser le lien avec <a> simple et allez faire des modification ds ntre fichier CSS en question et cela va fonctionner de la meme facon comme si on definissait le lien <a href="#"> )

var selectedRow = null

function onFormSubmit() {
    var formData = readFormData();
    if (validate()) {
        if (selectedRow == null) {
            insertNewRecord(formData);
        } 
        else {
            updateRecord(formData);
        }
        
        resetForm();
    }

        
}

// Cette fonction recupere les valeurs saisir les valeurs au clavier
function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    // formData["fullName"] = document.getElementById("fullName").value;
    // console.log(formData)
    return formData;
    
}

//Cette fction insere les valeurs dans la table qui permet d'afficher ls valeurs
function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
        // table.length Prend le nbre de ligne actuel enregistre et increment de 1 afin que soit inerer dans la table 
    var newRow = table.insertRow(table.length);
        // On re
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onclick="onEdit(this)">Edit</a>
                       <a onclick="onDelete(this)">Delete</a>`;
                    //    `<a onclick="onEdit(this)" href="#">Edit</a>
                    //    <a onclick="onDelete(this)" href="#">Delete</a>`;
                       
}

//Cette fction renitialise les input en ayant une valeur vide (document.getElementById("fullName").value = ""), apres avoir finr d'inerer ou modifier nos Donnees ds ntre Tables
function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("empCode").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

//Permet d'Editer les donnees enregistre dans la table et il va intervenir lors du clic du Lien "Editer"
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}

//Modifier les elements a Editer  ds l'afiche du champ quand on clic sur 'Editer'
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

//Pour supprimer l'element de ntre table
function onDelete(td) {
    
    if (swal({
        title: "Are you sure?",
        text: "Est sur de vouloir supprimer l'élement en question!",
        icon: "warning",
        buttons: ["annuller", true],
        dangerMode: true,
    })

    .then((willDelete) => {
        if (willDelete) {
            swal("L'element a été Supprimer avec succes!", {
            icon: "success",
            });
            row = td.parentElement.parentElement;
            document.getElementById("employeeList").deleteRow(row.rowIndex);
            // resetForm();
        } 
        else {
            swal("Cette operation a été annuler!",{icon: "warning",});
        }
    })) {
        // confirm('Are you sure to delete this record ?')
        // row = td.parentElement.parentElement;
        // document.getElementById("employeeList").deleteRow(row.rowIndex);
        // resetForm();
    }
}
   
//Verifie si le Champ est Vide ou Non

function validate() {
    isvalid = true;
        //Si l'INPUT est vide. On met le 'isvalid = true;' en 'isvalid = false;' et on affiche le message d'Erreur en Rouge(la couleur Rouge sera donne ds CSS grace a la Classe 'validation-error' qui es doné ds 'index.html') 
    if(document.getElementById("fullName").value ==""){
        isvalid = false;
        // "classList.remove("hide")" permet de supprimer la 'classe hide' qui ne faire pas voir le 'label' lors de la premiere fois sur la page
        //Ce 'label' va donc s'afficher pour ns dire que le champ est necessai vu que l' Input est vide
        document.getElementById("fullNameValidationError").classList.remove("hide");
    }
    else{
        //Si l' INPUT contient des donnes alors On ajoute la classe "hide" a ntre label qui á 'id' en question ce qui ns permet de ne pas avoir l affichage du label de Message d'Erreur 
        isvalid = true;
        if(!document.getElementById("fullNameValidationError").classList.contains("hide"))
        document.getElementById("fullNameValidationError").classList.add("hide");
    }

    if(document.getElementById("empCode").value ==""){
        isvalid = false;
        // document.getElementById("empCodeValidationError").classList.remove("hide");
        if (isvalid == false) {
            swal({
                    title: "Verifier les Champs!",
                    text: "Il y a des champs qui sont vide ou mal remplits!",
                    icon: "error",
                    });
            document.getElementById("empCodeValidationError").classList.remove("hide");
        }
    }
    else{ 
        isvalid = true;
        if(!document.getElementById("empCodeValidationError").classList.contains("hide")){
        // document.getElementById("empCodeValidationError").classList.add("hide");
            if (isvalid == true) {
                swal("Good job!", "You clicked the button!", "success", {
                         button: "valider !",
                    });
                document.getElementById("empCodeValidationError").classList.add("hide");
            }
        }
    }

    return isvalid;
}