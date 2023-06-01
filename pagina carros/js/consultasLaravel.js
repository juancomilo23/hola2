function traerInfo(){
    $.ajax({
        url:"http://127.0.0.1:5501/contenido/laravel_prueba.html",
        type:"GET",
        datatype:"json",
        success:function(respuesta){
            console.log(respuesta);
            /*for (i=0;i<respuesta.length;i++){
                $("#resultado").append(respuesta[i].title+"<br>");
            }*/
            generarTabla(respuesta)
        }
    });
}

function generarTabla(items){
    let myTabla="<table class='table'>";
    myTabla+="<tr>";
    myTabla+="<th scope='col'>ID</th>";
    myTabla+="<th scope='col'>Nombre</th>";
    myTabla+="<th scope='col'>Apellidos</th>";
    myTabla+="<th scope='col'>Edad</th>";
    myTabla+="<th scope='col'>Tcarro</th>";
    myTabla+="<th scope='col'>Mcarro</th>";
    myTabla+="<th scope='col'>Opciones</th>"
    myTabla+="</tr>";
    for (i=0;i<items.length;i++){
        myTabla+="<tr>";
        myTabla+="<td scope='row'>"+items[i].id+"</td>";
        myTabla+="<td scope='row'>"+items[i].nombre+"</td>";
        myTabla+="<td scope='row'>"+items[i].apellidos+"</td>";
        myTabla+="<td scope='row'>"+items[i].edad+"</td>";
        myTabla+="<td scope='row'>"+items[i].tcarro+"</td>";
        myTabla+="<td scope='row'>"+items[i].mcarro+"</td>";
        myTabla+="<td scope='row'><button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
        myTabla+="<td scope='row'><button onclick='buscarPorId("+items[i].id+")' type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#myModal2'>Editar</button>";
        myTabla+="</tr>";
    }
    myTabla+="</table>";
    $("#resultado").append(myTabla);
}

function buscarPorId(idElemento){
    $.ajax({
        url:"http://127.0.0.1:8000/api/consultapersonas/"+idElemento,
        type:"GET",
        datatype:"json",
        success:function(respuesta){
            console.log(respuesta);
            $("#modal-footer").empty();

            $("#nombre_editar").val(respuesta.nombre);
            $("#apellidos_editar").val(respuesta.apellidos);
            $("#edad_editar").val(respuesta.edad);
            $("#tcarro_editar").val(respuesta.tipo_carro);
            $("#mcarro_editar").val(respuesta.marca_carro);

            let modal_footer="<button onclick='actualizarInformacion("+respuesta.id+")' type='button' class='btn btn-primary'>Actualizar Información</button>";
            $("#modal-footer").append(modal_footer);
        }
    });
}

function guardarInformacio(){

    let objeto={
        nombre:$("#nombre").val(),
        apellidos:$("#apellidos").val(),
        edad:$("#edad").val(),
        tipocarro:$("#tcarro").val(),
        marcacarro:$("#mcarro").val(),
    };

    //let enviar=JSON.stringify(objeto);
    $.ajax({
        url:"http://127.0.0.1:8000/api/consultapersonas",
        type:"POST",
        data:objeto,
        datatype:"json",
        success:function(respuesta){
            $("#resultado").empty();
            $("#nombre").val("");
            $("#apellidos").val("");
            $("#edad").val("");
            $("#tcarro").val("");
            $("#mcarro").val("");
            traerInfo();
            alert("Se ha guardado")
        }
    });
}

function actualizarInformacion(idElemento){

    console.log ("nombre:"+$("#nombre_editar").val())
    console.log ("apellidos:"+$("#apellidos_editar").val())
    console.log ("edad:"+$("#edad_editar").val())
    console.log ("tcarro:"+$("#tcarro_editar").val())
    console.log ("mcarro:"+$("#marro_editar").val())
    
    let objeto={
        nombre:$("#nombre_editar").val(),
        apellidos:$("#apellidos_editar").val(),
        edad:$("#edad_editar").val(),
        tipocarro:$("#tarro_editar").val(),
        marcacarro:$("#mcarro_editar").val(),
    };

    //let enviar=JSON.stringify(objeto);
    $.ajax({
        url:"http://127.0.0.1:8000/api/consultapersonas"+idElemento,
        type:"PUT",
        data:objeto,
        datatype:"json",
        success:function(respuesta){
            $("#resultado").empty();
            $("#nombre").val("");
            $("#apellidos").val("");
            $("#edad").val("");
            $("#tcarro").val("");
            $("#mcarro").val("");
            traerInfo();
            alert("Se ha actualizado")
        }
    });
}

function borrarElemento(idElemento){
    
    let enviar=JSON.stringify(idElemento);
    $.ajax({
        url:"http://127.0.0.1:8000/api/consultapersonas"+idElemento,
        type:"DELETE",
        data:enviar,
        contentType:"application/json",
        datatype:"json",
        success:function(respuesta){
            borrarTabla();
            traerInfo();
            alert("Se ha eliminado")
        }
    });
}

function borrarTabla(){
    $("#resultado").empty();
}