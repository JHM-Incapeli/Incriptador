const d = document;

// ******* Al cargar la pagina se formatea lo que hay el el input ********
d.addEventListener('DOMContentLoaded', e => {
    $input.value = '';
})

let text = '';
const cambios = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
}


///      elementos de la pagina
const $input = d.getElementById('input-text'),
    $output = d.getElementById('output-text'),
    $btnEncriptar = d.getElementById('encriptar'),
    $btnDesencriptar = d.getElementById('desencriptar'),
    $btnCopy = d.getElementById('copy-text');

$input.addEventListener('keyup', e => { // keyup tecla arriva
    text = e.target.value;
    text = text.toLowerCase() // cambia las mayus a minus
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') //separa las letras con simbolos como las tildes (quedan 2 caracteres: á = a ´) y elimina la tilde
    e.target.value = text //ingreso esos cambios al textarea
    text = e.target.value;
   
    
    if(/^[a-z\s]+$/g.test(text.trim())) {
        $btnEncriptar.disabled = false;
        $btnDesencriptar.disabled = false;


        d.getElementById('alerta').classList.remove('error');
        $btnEncriptar.classList.remove('btn-encriptar-no-texto');
        $btnDesencriptar.classList.remove('btn-desencriptar-no-texto');
        // d.getElementById('alerta').classList.toggle('error');
    
    }else{
        // si entra un caracter distinto de las letra blokea los botones
        // y damos un estilo distinto
        $btnEncriptar.disabled = true;
        $btnDesencriptar.disabled = true;
        // cambiar el estilo de una etiqueta con js, 
        // el estilo se encuetra en el archivo .css
        d.getElementById('alerta').classList.add('error');
        $btnEncriptar.classList.add('btn-encriptar-no-texto');
        $btnDesencriptar.classList.add('btn-desencriptar-no-texto');
    }

    // Esto hace que al dar enter se encripte
    if(e.key == 'Enter'){
        $btnEncriptar.click()
    }
})

function encriptar(text){
    let textFinal = '';
    for(let i=0; i<text.length; i++){
        let letra = text[i]
        if(letra in cambios){
            textFinal += cambios[letra]
        }else{
            textFinal += letra
        }
    }
    return textFinal;
}



function desencriptar(text){
    Object.values(cambios).forEach(el=>{
        while(text.includes(el)){
            let i = Object.values(cambios).indexOf(el)
            text = text.replace(el, Object.keys(cambios)[i])
        }
    })
    return text;
}

d.addEventListener('click',e=>{
    if(e.target == $btnEncriptar){
        if(text){
           
            $output.textContent = encriptar(text)
            
        }
    }
    if(e.target == $btnDesencriptar){
        $output.textContent = desencriptar(text)
    }

    if(e.target == $btnCopy){
        text = $output.textContent;
        navigator.clipboard.writeText(text)
        $input.value = text;
    }
})




// function valorLetra(letra){
//     let aux='';
//     switch(letra){
//         case 'a': aux ='ai'
//         break;
//         case 'e': aux= 'enter'
//         break;
//         case 'i': aux = 'imes'
//         break; 
//         case 'o': aux = 'ober'
//         break;
//         case 'u': aux = 'ufat'
//         break; 
//     }
//     return aux;
// }
// function verificar(letra){
//     let aux = false;
//     switch(letra){
//         case 'a': aux = true
//        break;
//         case 'e': aux = true
//        break;
//         case 'i': aux = true
//        break;
//         case 'o': aux = true
//        break;
//         case 'u': aux =  true
//         break;
//     }
//     return aux;
// }


// function encriptar(text) {
//     let textFinal = '';
//     for(let i=0; i<text.length; i++){
//         let letra = text[i]
//         //alert('en encriptar '+verificar(letra)+ '   text.length'+ text.length );
//         if(verificar(letra)){
//             textFinal += valorLetra(letra)
//         }else{
//             textFinal += letra
//         }
//     }
//     return textFinal
// }

// function desencriptar(text) {

// }

// d.addEventListener('click', e => { //keyupdown tecla abajo 
//     // console.log(encriptar('javier'));
//     // console.log(text);
    
//     if(e.target == $btnEncriptar){
//         console.log('hola');
//         console.log(e.target+'    '+$btnEncriptar+'   '+text+'\n'+
//         encriptar(text));
//         //$output.textContent = encriptar(text);
        
//     }
// })