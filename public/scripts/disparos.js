
function anexoViewer(){
  
  let anexo = document.getElementById('anexo').value

  if(anexo.length === 0){
    document.getElementById('status_anexo').innerHTML = 'Sem anexo'
  }else{
    document.getElementById('type').value = anexo.slice(anexo.length -3, anexo.length)

  }
}







window.onload = anexoViewer()