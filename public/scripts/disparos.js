
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

function changeOperation(){
  var margem = document.getElementById('div_margem')
  var banco = document.getElementById('div_banco_original')
  var quitacao = document.getElementById('div_quitacao')
  var v_parcela = document.getElementById('div_v_parcela')
  var tot_parcelas = document.getElementById('div_total_parcelas')
  var qtd_parcelas = document.getElementById('div_qtd_parcelas')
  var res_parcelas = document.getElementById('div_parcelas_restantes')
  var parcela_desejada = document.getElementById('div_parcela_desejada')
  var n_contrato = document.getElementById('div_n_contrato')
  var taxa = document.getElementById('div_taxa')
  var parcela_nova = document.getElementById('div_parcela_nova')
  var valor_saque = document.getElementById('div_valor_saque')



  let value = document.getElementById('tipo_operacao').value
  if(value == 'PORTABILIDADE' || value == 'PORT + REFIN' || value == 'PORT + REDUÇÃO'){
    
    /* MOSTRAR */
    banco.classList.add('show')
    quitacao.classList.add('show')
    v_parcela.classList.add('show')
    tot_parcelas.classList.add('show')
    qtd_parcelas.classList.add('show')
    res_parcelas.classList.add('show')
    parcela_desejada.classList.add('show')
    n_contrato.classList.add('show')
    taxa.classList.add('show')

    banco.classList.remove('hide')
    quitacao.classList.remove('hide')
    v_parcela.classList.remove('hide')
    tot_parcelas.classList.remove('hide')
    qtd_parcelas.classList.remove('hide')
    res_parcelas.classList.remove('hide')
    parcela_desejada.classList.remove('hide')
    n_contrato.classList.remove('hide')
    taxa.classList.remove('hide')



    /* ESCONDER */
    margem.classList.add('hide')
    parcela_nova.classList.add('hide')
    valor_saque.classList.add('hide')

    margem.classList.remove('show')
    parcela_nova.classList.remove('show')
    valor_saque.classList.remove('show')

  }else if(value == 'MARGEM' || value == 'CARTÃO' || value == 'FGTS' || value == 'CREDITO CONTA'){
    /* MOSTRAR */
    banco.classList.add('show')
    v_parcela.classList.add('show')
    taxa.classList.add('show')
    tot_parcelas.classList.add('show')

    banco.classList.remove('hide')
    v_parcela.classList.remove('hide')
    taxa.classList.remove('hide')
    tot_parcelas.classList.remove('hide')


    /* ESCONDER */
    quitacao.classList.remove('show') 
    qtd_parcelas.classList.remove('show')  
    res_parcelas.classList.remove('show')  
    parcela_desejada.classList.remove('show') 
    n_contrato.classList.remove('show') 
    parcela_nova.classList.remove('show') 
    valor_saque.classList.remove('show') 
    margem.classList.remove('show') 

    quitacao.classList.add('hide') 
    qtd_parcelas.classList.add('hide')  
    res_parcelas.classList.add('hide')  
    parcela_desejada.classList.add('hide') 
    n_contrato.classList.add('hide') 
    parcela_nova.classList.add('hide') 
    valor_saque.classList.add('hide') 
    margem.classList.add('hide') 


  }else if(value == 'REFIN' || value == 'REFIN + MARGEM' || value == 'REFIN UNIF'){

    /* MOSTRAR */
    banco.classList.add('show')
    v_parcela.classList.add('show')
    taxa.classList.add('show')
    margem.classList.add('show')
    parcela_nova.classList.add('show')

    banco.classList.remove('hide')
    v_parcela.classList.remove('hide')
    taxa.classList.remove('hide')
    margem.classList.remove('hide')
    parcela_nova.classList.remove('hide')


    /* ESCONDER */
    quitacao.classList.remove('show') 
    tot_parcelas.classList.remove('show') 
    qtd_parcelas.classList.remove('show') 
    res_parcelas.classList.remove('show') 
    parcela_desejada.classList.remove('show') 
    n_contrato.classList.remove('show') 
    valor_saque.classList.remove('show')

    quitacao.classList.add('hide') 
    tot_parcelas.classList.add('hide') 
    qtd_parcelas.classList.add('hide') 
    res_parcelas.classList.add('hide') 
    parcela_desejada.classList.add('hide') 
    n_contrato.classList.add('hide') 
    valor_saque.classList.add('hide') 





  }else if(value == 'CARTÃO + SAQUE' || value == 'SAQUE COMPLEMENTAR'){
    /* MOSTRAR */
    banco.classList.add('show')
    v_parcela.classList.add('show')
    valor_saque.classList.add('show')

    banco.classList.remove('hide')
    v_parcela.classList.remove('hide')
    valor_saque.classList.remove('hide')


    /* ESCONDER */
    quitacao.classList.add('hide')
    quitacao.classList.remove('show')
    tot_parcelas.classList.add('hide')
    tot_parcelas.classList.remove('show')
    qtd_parcelas.classList.add('hide')
    qtd_parcelas.classList.remove('show')
    res_parcelas.classList.add('hide')
    res_parcelas.classList.remove('show')
    parcela_desejada.classList.add('hide')
    parcela_desejada.classList.remove('show')
    n_contrato.classList.add('hide')
    n_contrato.classList.remove('show')
    taxa.classList.add('hide')
    taxa.classList.remove('show')
    parcela_nova.classList.add('hide')
    parcela_nova.classList.remove('show')
    margem.classList.add('hide')
    margem.classList.remove('show')

  }


    // ---------------REFIN
  // ---------------MARGEM
  // rever---------------REFIN UNIF 
  // ---------------REFIN + MARGEM
  // ---------------PORTABILIDADE 
  // ---------------PORT + REFIN
  // ---------------PORT + REDUÇÃO
  // rever---------------SAQUE COMPLEMENTAR
  // rever---------------CARTÃO 
  // ---------------CARTÃO + SAQUE
  // ---------------FGTS
  // rever---------------CREDITO CONTA

}



window.onload = changeOperation()
window.onload = anexoViewer()

