function mask(o, f) {
  setTimeout(function() {
    var v = f(o.value);
    if (v != o.value) {
      o.value = v;
    }
  }, 1);
}

// MASCARA DO TELEFONE FIXO
function mphone(v) {
  var r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{4})(\d{5}).*/, "($1) $2-$3");
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    r = r.replace(/^(\d*)/, "($1");
  }
  return r;
}





// MASCARA PARA O CELULAR
function mphoneC(v) {
  var r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,5}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    r = r.replace(/^(\d*)/, "($1");
  }
  return r;
}


// MASCARA PARA O CPF
function mCPF(cpf){
  cpf=cpf.replace(/\D/g,"")
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")


//INPUTS OCULTOS PARA O FRONT COM A INTENÇÃO DE ENVIAR OS DADOS 
// DO FORM POIS O FORM ESTÁ OCULTO E O BOTÃO ESTÁ DE FORA
  let cpf_oculto = document.getElementById('search').value 
  document.getElementById('cpf_oculto').value = cpf_oculto

  let cpf_search = document.getElementById('search').value
  document.getElementById('cpf_search').value = cpf_search


  return cpf
}

