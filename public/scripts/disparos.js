
function anexoViewer(){
  
  let anexo = document.getElementById('anexo').value

  if(anexo.length === 0){
    document.getElementById('status_anexo').innerHTML = 'Sem anexo'
  }else{
    document.getElementById('type').value = anexo.slice(anexo.length -3, anexo.length)

  }
}

function calculate(){
  const totParcelas = document.getElementById('parcelas').value
  const restParcelas = document.getElementById('prazo').value
  

  if(Number(totParcelas) && Number(restParcelas)){

    document.getElementById('qtd_pagas').value = Number(totParcelas) - Number(restParcelas)
  }
}





window.onload = anexoViewer()