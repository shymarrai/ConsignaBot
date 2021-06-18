
function anexoViewer(){
  let anexo = document.getElementById('anexo').value
  if(anexo.length === 0){
    document.getElementById('status_anexo').innerHTML = 'Sem anexo'
  }else if(anexo.length >= 1){
    for(let i; i<= anexo.length; i++){
      document.getElementById('status_anexo').innerHTML = anexo[i]
  }
}

}
